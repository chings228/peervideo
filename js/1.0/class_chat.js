

import Notification from "./notification.js"


export default class ClassChat extends Notification{


    param
    conn
    isConnected

    constructor(peer,param){
        super()

        console.log('chat')

        this.param = param

        this.isConnected = false;

        this.peer = peer 
        console.log(this.peer)

        this.init()
    }


    init(){

        console.log("connect to ",this.param.peer_guestid)
        
        this.conn = this.peer.connect(`${this.param.peer_guestid}_video`)

        console.log(this.conn)



        this.conn.on('open',e=>{

            console.log("conn open")

            this.isConnected = false
   
        })


        this.conn.on('error',e=>{
            console.log("error",e)
        })



        this.peer.on('connection',conn=>{



            console.log("peer connection")

            if (!this.isConnected){

                console.log("connect back")

                this.isConnected = true

               this.conn =  this.peer.connect(`${this.param.peer_guestid}_video`)

               console.log(this.conn)
            }

             

            conn.on('data',data=>{

                console.log(data)

    

                    this.fire('msgreceive',data)
   
                

            })



        })


    }

    sendCommand(command){

        let data = {}
        data.type = 'command'
        data.content = command

        this.conn.send(data)

    }


    sendMsg(content){

        let data = {}
        data.type = 'text'
        data.content = content

        this.conn.send(data)

    }


}