import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

const server=http.createServer(function(request:any,response:any){
console.log(new Date()+"Recieved details from"+request.url);
response.end("Hii There");

});

const wss=new WebSocketServer({server});
let userCount=0;

wss.on("connection",function connection(ws){
    userCount++;
    ws.on("error",(err)=>console.error(err));
    ws.on("message",function(data,isBinary){
        wss.clients.forEach(function each(client){
            // if(client.room==="MyRoomCode"){}
            if(client.readyState===WebSocket.OPEN){
                client.send(data,{binary:isBinary});
            }
        })
    })
    console.log("Total Connected User",userCount);
    
    ws.send("Hello! Message from the Server")
})

server.listen(8000,()=>{
    console.log(new Date()+"Server is Running at 8000");
    
})