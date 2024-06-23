/* WORKS
const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//New imports
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});

app.post("/api", (req, res) => {
    const { name, message } = req.body;
    socketIO.emit('notification', { name, message });
    console.log(name, message);

    res.status(200).json({ name, message });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
*/


/* doesnt run on server

const express = require("express");
const app = express();
const PORT = 8080;

console.log(`tim`);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//New imports
const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());

const socketIO = require('socket.io')(http, {

    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
    ,
 // cors: {
   //    origin: ["*","http://localhost:3000/","https://white-field-099b39e10.5.azurestaticapps.net/"]
    //}
   
   cors: {
        origin:  ["http://localhost:3000/","https://white-field-099b39e10.5.azurestaticapps.net/","https://mango-sky-000567500.5.azurestaticapps.net/"],
        methods: ["GET", "POST"],
        withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "*"
    }
      }
    
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
  //  const name=socket.id;
   // const message='just connected';
   // socketIO.emit('notification', { name,message });
    socket.on('disconnect', () => {
       console.log('🔥: A user disconnected');
    });
});

let corsOptions = {
   origin:['*','http://localhost:3000','https://white-field-099b39e10.5.azurestaticapps.net/','https://mango-sky-000567500.5.azurestaticapps.net']//[ 'https://white-field-099b39e10.5.azurestaticapps.net', 'http://localhost:3000','*' ]
};
app.get('/', cors(corsOptions),
    (req, res) => {res.json('Hello from server');
        console.log(`Hello from server`);}
    ); 

app.post("/api",cors(corsOptions),
(req, res) => {
    const { name, message } = req.body;
    socketIO.emit('notification', { name, message });
    console.log(name, message);

    res.status(200).json({ name, message });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

*/