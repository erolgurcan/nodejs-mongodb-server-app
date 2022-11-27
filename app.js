const express = require('express');
const app = express();
const router = require('./routes/routers');

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.port || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.use( "/api", router)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    }
);

