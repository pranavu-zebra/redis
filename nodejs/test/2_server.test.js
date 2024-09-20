const request = require('supertest');
const fs = require('fs').promises;
const redisClient = require('../1_client');
const app = require('../2_server');

jest.mock('../1_client'); // Mock the Redis client
jest.mock('fs').promises; // Mock the 'fs.promises' module

describe('GET /', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks between tests
  });

  test('should return cached data if available', async () => {
    const cachedData = JSON.stringify([
      {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      }
    ]);

    redisClient.get.mockResolvedValue(cachedData); // Simulate cache hit

    const response = await request(app).get('/');

    expect(redisClient.get).toHaveBeenCalledWith('todos');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(JSON.parse(cachedData));
  });

  test('should read file and store data in Redis if not cached', async () => {
    const fileData = JSON.stringify([
      {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      }
    ]);

    redisClient.get.mockResolvedValue(null); // Simulate cache miss

    // Mock fs.readFile to return file data
    jest.spyOn(fs, 'readFile').mockResolvedValue(fileData);

    redisClient.setex.mockResolvedValue(null); // Simulate successful cache set

    const response = await request(app).get('/');

    expect(redisClient.get).toHaveBeenCalledWith('todos');
    expect(fs.readFile).toHaveBeenCalledWith('./dummyData-0.json', 'utf8');
    expect(redisClient.setex).toHaveBeenCalledWith('todos', 30, JSON.stringify(JSON.parse(fileData)));
    expect(response.status).toBe(200);
    expect(response.body).toEqual(JSON.parse(fileData));
  });
});
