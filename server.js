// https://www.valentinog.com/blog/socket-react/
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const index = require("./routes/index");
const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 4001;
let timer = 0;
let players = [];
let playersIdsAutoInc = 0;
const jobs = require('./assets/jobs.json');


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const getApiAndEmit = async socket => {
    try {
        timer+=1;
        socket.emit("Players", players);
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
};

io.on("connection", socket => {
    console.log("New client connected"); 
    let clientID = ++playersIdsAutoInc;
    let newPlayer = {id: clientID};
    if(players.length==0){
        newPlayer.admin = true;
    }
    players.push(newPlayer);
    socket.emit("ClientID", clientID);
    setInterval(() => getApiAndEmit(socket), 500);
    socket.on("Remove", (clientID) => {
        let playerIdx = players.findIndex(p=>p.id==clientID);
        if(playerIdx > -1){
            let removeAdmin = false;
            if(players[playerIdx].admin){
                removeAdmin = true;
            }
            players.splice(playerIdx, 1);
            if(removeAdmin && players.length > 0){
                players[0].admin = true;
            }
        }
        console.log(`Client ${clientID} disconnected`)
    });
    socket.on("disconnect", () => console.log("Client disconnected"));
    socket.on("PlayerName", (data) => {
        let playerIdx = players.findIndex(p=>p.id==data.clientID);
        if(playerIdx>-1){
            players[playerIdx].name = data.name;
        }
    });

    socket.on("PlayerAvatar", (data) => {
        let playerIdx = players.findIndex(p=>p.id==data.clientID);
        if(playerIdx>-1){
            players[playerIdx].avatar = data.avatar;
        }
    });
    

    socket.on("StartGame", () => {
        let randomJob = jobs[getRandomInt(jobs.length)];
        let spyPlayerIdx = getRandomInt(players.length);
        for(let i=0; i<players.length; i++){
            if(i==spyPlayerIdx){
                players[i]['job'] = 'מרגל';
            } else {
                players[i]['job'] = randomJob;
            }
        }
        console.log("StartGame");
    });
});


server.listen(port, () => console.log(`Listening on port ${port}`));
