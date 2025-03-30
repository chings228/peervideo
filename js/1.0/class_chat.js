

import Notification from "./notification"


export default class ClassChat extends Notification{


    param
    conn
    isConnected

    constructor(param){
        super()

        console.log('chat')

        this.param = param

        this.isConnected = false;


        console.log(peer)

        this.init()
    }


    init(){

        console.log("connect to ",this.param.peer_guestid)
        
        this.conn = peer.connect(this.param.peer_guestid)

        console.log(this.conn)



        this.conn.on('open',e=>{

            console.log("conn open")

            this.isConnected = false
   
        })


        this.conn.on('error',e=>{
            console.log("error",e)
        })



        peer.on('connection',conn=>{



            console.log("peer connection")

            if (!this.isConnected){

                console.log("connect back")

                this.isConnected = true

               this.conn =  peer.connect(this.param.peer_guestid)

               console.log(this.conn)
            }

             

            conn.on('data',data=>{

                console.log(data)
                this.fire('msgreceive',data)

            })



        })


    }


    sendMsg(content){

        this.conn.send(content)

    }


}