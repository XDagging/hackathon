require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");

const { v4: uuidv4 } = require('uuid');
const session = require("express-session");


const cors = require('cors');
const StudentVue = require('studentvue.js');
const app = express();
const secret = process.env.SECRET
const WebSocket = require("ws");


const districtUrl = "https://md-mcps-psv.edupoint.com/"


app.use(bodyParser.json())

app.use(cors());
// mongoose.connect("mongodb://127.0.0.1:27017/hackathon")


let clients = []
let waitingList = []
let connectedClients = new Map()

const generateRandomUser = (ws) => {
    if (clients.length <= 1) {
        ws.send("not enough people online to connect")
    } else {
        const availableUsers = clients.filter((user) => user == ws)

    }
}



const connectUsers = (ws) => {
    setTimeout(() => {
        console.log(waitingList.length)
        console.log(connectedClients.size)
        if (waitingList.length >= 2) {
            console.log(waitingList.length)
            
            connectedClients.set(waitingList[0], waitingList[1])
            connectedClients.set(waitingList[1], waitingList[0])
            waitingList.splice(waitingList[0], 1)
            waitingList.splice(waitingList[1], 1)
            console.log(waitingList)
            ws.send("ce")
            connectedClients.get(ws).send("ce")
            console.log(connectedClients.size)
            return true
            
            // console.log(connectedClients)
            // waitingList.splice(waitingList[0], 1)
            // waitingList.splice(waitingList[1], 1)
            
        } else {
            console.log("not enough users online to connect")
            connectUsers(ws)
            return false
        }
    },1000)
    
}

function startConnection(ws) {
    // the issue is that startConnection is only happening once when a user disconnects
    waitingList.push(ws)
    connectUsers(ws)
}

function closingFunction(ws) {
    console.log("this ran because the client disconnected")
                waitingList.splice(waitingList.indexOf(ws),1)
                const otherClient = connectedClients.get(ws)
                

                console.log("other client is " + otherClient)
                try {
                    otherClient.send("*/disconnected*/")
                    // waitingList.splice(waitingList.indexOf(otherClient),1)
                } catch(e) {
                    console.log("the other client had already disconnected!", e)
                }


                
                connectedClients.delete(ws)
                connectedClients.delete(otherClient)
}


const wss = new WebSocket.Server({port: 2999})



        wss.on('connection', async function (ws) {
            clients.push(ws)
            startConnection(ws)
            

            




            


            // ws.send('Client connected');



          
            // Assign a unique ID to the client



            ws.on("close", () => {
                clients.splice(clients.indexOf(ws),1)
                closingFunction(ws)
                


        
            })


            ws.on('message', (message, isBinary) => {
                if (message == "*/closing*/") {
                    waitingList.push(connectedClients.get(ws))
                    closingFunction(ws)
                    startConnection(ws)
                    

                
                } else {
                    let messageConvert = message
                    messageConvert = isBinary ? message : message.toString();
                    if (connectedClients.get(ws) != undefined) {

                        console.log("we")
                        connectedClients.get(ws).send(JSON.parse(messageConvert).message)

                    } else {
                        console.log("connected clients is undefined")
                    }
                    console.log('Received message from client:', messageConvert);
                }   
                    
                    
                
                    
                



                
                // ws.send("your message has been received")
            });
    });





// server.on("message", (message) => {
//     console.log(message)
// })

// server.on("connection", socket => {
//     socket.on("message", message => {
//         socket.send("this was sent")
//     })
// })











app.post("/check", (req, res) => {
    console.log("this happened")
    if ((typeof(req.body.studentID) == "undefined") || (typeof(req.body.password) == "undefined")) {
        console.log("invalid")
        res.status(404).send(JSON.stringify({message: "invalid"}))
    } else {
        StudentVue.login(districtUrl, req.body.studentID, req.body.password)
    .then(client => client.getStudentInfo())
    .then(d => {
        console.log(JSON.parse(d)["StudentInfo"])
        if (typeof(JSON.parse(d)["StudentInfo"]) == "undefined") {
            console.log("incorrect")
            res.status(404).send(JSON.stringify({message:"incorrect credentials"}))
        } else {
            console.log("correct")
            console.log(JSON.parse(d)["StudentInfo"])
            res.status(200).send(JSON.stringify({message: "success"}))
        }
        
    });
    }

    
})

// const clients = []
// app.get("/messages/:userId", (req, res) => {
//     console.log("this was called")
//     console.log(req.params.userId)
//     const currentUser = req.params.userId;
//     if ((currentUser == "") || (currentUser == undefined)) {
//         res.status(404).send("invalid")
//     } else {
//         wss.on('connection', function (ws) {
//             clients.push(ws)
//             console.log('Client connected');
          
//             // Assign a unique ID to the client
          
//             ws.on('message', (message) => {
//               console.log('Received message from client:', message);
//               ws.send("your message has been received")
//             });
//     });


//     }

    
    
// })



app.get("/", (req,res) => {
    console.log("")
    res.send("this is working?")
})



app.listen(process.env.PORT, (req, res) => {
    console.log("Server started on port " + process.env.PORT)
})
