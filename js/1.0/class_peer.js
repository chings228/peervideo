


import Notification from "./notification.js"
import ClassChat from "./class_chat.js"
import ClassVideo from "./class_video.js"
import createtPeer from "./createPeer.js"

export default class PeerConnect extends Notification{



    turnserver


 
    peer_hostid 
    peer_guestid
    param

    response

    callback

    peervideo
    peerchat


    peers



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


           this.connect()

    }






    connect(){

            
            const hostname = window.location.host.replaceAll(".",'')

            this.peer_hostid = `host_${hostname}_${this.hostid}`
            this.peer_guestid = `guest_${hostname}_${this.hostid}`

            if (!this.param.isHost){

                const tempid = this.peer_hostid
                this.peer_hostid = this.peer_guestid
                this.peer_guestid = tempid
            }

            console.log(this.peer_hostid,this.peer_guestid)


        
            new createtPeer(this.peer_hostid,peers=>{

                console.log("open",peers)

                this.peers = peers
   

            this.response.success = true
            

            this.callback(this.response)
     

 
            const param = {}
            param.peer_guestid = this.peer_guestid
            param.peer_hostid = this.peer_hostid

            param.guestvideoid  = this.param.guestvideoid
            param.hostvideoid = this.param.hostvideoid
            param.avatarvideoid = this.param.avatarvideoid



           this.peervideo = new ClassVideo(peers,param)


           this.peervideo.on("command",e=>{

                console.log(e)

                const data = {}
                data.type = 'command'
                data.content = e

                this.peerchat.sendMsg(data)



           })
          


           this.peerchat = new ClassChat(peers.video,param)


           this.peerchat.on("incomingvideo",()=>{

                console.log("incoming video")

                this.fire("incomingvideo","")
           })


            this.peerchat.on("msgreceive",data=>{


                
                if (data.type == 'text' || data.type == 'image'){

                    this.fire('incomingtext',data.content)
                }
                else if (data.type == 'command'){

                    // command

                    if (data.content == 'stopsharing'){


                        this.peervideo.stopGuestDesktopSharing()
                    }


                }

                this.fire('incomingtext',data)
            })

     

        })

    }


        
    sendMsg(data){


        this.peerchat.sendMsg(data)


    }


    changeStream(type){

        this.peervideo.changeStream(type)


    }


    changeMute(mute){

        this.peervideo.changeMute(mute)

    }








    











}