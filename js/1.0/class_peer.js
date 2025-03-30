
import turnserver from "./turnserver.js"
import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"

import Notification from "./notification.js"
import ClassChat from "./class_chat.js"
import ClassVideo from "./class_video.js"

export default class PeerConnect extends Notification{



    turnserver


 
    peer_hostid 
    peer_guestid
    param

    response

    callback

    peervideo
    peerchat



    constructor(param,callback){

        super()

        this.param = param
        this.callback = callback

        

   


    
        this.response = {}


        this.generateHostId()



        if (param.isHost){
            
            this.response.guestlink = `${window.location.origin}/?guestid=${this.hostid}`
            this.response.peerid = this.hostid

        }


        this.init()
        

    }

    generateHostId(){

        if (this.param.hasOwnProperty('hostid')){

            this.hostid = this.param.hostid
        }
        else{
            this.hostid = Common.makeid(10);
        }



    }



    init(){


        const turn = new turnserver()

       turn.getTurn(e=>{

             console.log("get turn server")


            console.log(e)

            if (e.isSuccess){

                const turnserver = e.config


                this.connect(turnserver)

            }
        })

    }






    connect(turnserver){

        console.log(`isHost ${global.isHost}`)

        const option = {};
        option.host = 'video.1328.hk';
        option.port = 3030;
        option.path = '/';
        option.config = turnserver
        
        const hostname = window.location.host.replaceAll(".",'')

        this.peer_hostid = `host_${hostname}_${this.hostid}`
        this.peer_guestid = `guest_${hostname}_${this.hostid}`

        if (!this.param.isHost){

             const tempid = this.peer_hostid
             this.peer_hostid = this.peer_guestid
             this.peer_guestid = tempid
        }

        console.log(this.peer_hostid,this.peer_guestid)

        window.peer = new Peer(this.peer_hostid,option)


        peer.on("error",e=>{
            console.log(e.type)

            this.response.errmsg = e.type

            this.response.success = false
            this.callback(this.response)
        })
        
        peer.on("open",e=>{


            console.log("peer open ",e)

            this.response.success = true
            

            this.callback(this.response)
     

 
            const param = {}
            param.peer_guestid = this.peer_guestid
            param.peer_hostid = this.peer_hostid

            param.guestvideoid  = this.param.guestvideoid
            param.hostvideoid = this.param.hostvideoid

           this.peervideo = new ClassVideo(param)
          


           this.peerchat = new ClassChat(param)


            this.peerchat.on("msgreceive",data=>{

                this.fire('incomingtext',data)
            })

     

        })

    }


        
    sendMsg(content){

        console.log(content)
        this.peerchat.sendMsg(content)


    }


    changeStream(type){

        this.peervideo.changeStream(type)


    }








    











}