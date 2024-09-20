const app = require('./2_server');

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});
