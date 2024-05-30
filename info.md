# Redis

- more kind of NoSQL db
- diff than SQL db


- Best for storing JSON data. (Key, Value) pairs


- Stores data on RAM | not persistence
- therefore, more oftenly used for caching

- Seats on top of tradinal db that means one can cache more often data to increase the speed.

## Install

- EASY on mac and linux
- have to use WSL (windows subsystem for linux) for windows

### cmds to install wsl:

```bash
$wsl --install

$wsl --list --online

$wsl --install -d <DistroName>
```
### Install Redis

```bash

sudo apt-get update

sudo apt-get install redis

redis-server

redis-cli  #(in the next tab)
```
## Commands

1. set key value
2. get key // values are always stored as a string in redis
3. del key
4. exists key
5. keys * // cmd to find all the keys in db
6. flushall // clears everything from the db
- Handling Expirations
7. ttl name // outputs the time to live value of that particular key
    - op: -1 leaves forever
8. expire key 10 // 10 is the time in seconds to live
    - op: -2 it is deleted | gone
9. setex key time value

## Lists(Array)

1. Add an item (lpush - left/start push)
- lpush key value
2. Add an item (rpush - right/end push)
- rpush key value
3. Print the values of list/array
- lrange key start_pos end_pos
4. pop out elements
- lpop key/rpop key

## Sets(Unique Array)

1 Add an item in a set
- SADD KEY VALUE

2.Remove an item
- SREM KEY VALUE

3.Print all values
- SMEMBERS KEY

## Hashes
- Kind of like JSON Object obj{ {key-val},{key-va} }

1. Add
- HSET key field value
2. Remove
- HDEL key field
3. Exists
- HEXISTS KEY FIELD
4. Print
- HGETALL key