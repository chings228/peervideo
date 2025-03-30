
import turnserver from "./turnserver"
import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"

import Notification from "./notification"
import ClassChat from "./class_chat"
import ClassVideo from "./class_video"

export default class PeerConnect extends Notification{



    turnserver

    guestvideo 

    hostvideo

 
    peer_hostid 
    peer_guestid
    param

    response

    callback

    conn


    constructor(param,callback){

        super()

        this.param = param
        this.callback = callback

        

   
        this.hostvideo = $(`#${param.hostvideoid}`).get(0)
        this.guestvideo = $(`#${param.guestvideoid}`).get(0)

    
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


    sendMsg(content){

        console.log(content)
        this.conn.send(content)


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

        this.peer = new Peer(this.peer_hostid,option)

        console.log(this.peer)
        console.log(this.peer.id)

        this.peer.on("error",e=>{
            console.log(e.type)

            this.response.errmsg = e.type

            this.response.success = false
            this.callback(this.response)
        })
        
        this.peer.on("open",e=>{


            console.log("peer open ",e)

            this.response.success = true
            

            this.callback(this.response)
     

            this.getStream().then(stream=>{


                console.log("get stream ")
    
                this.addVideoStream(this.hostvideo,stream)
    
    
                this.call = this.peer.call(this.peer_guestid,stream);

                this.call.on('stream',remotestream=>{



                        console.log("call stream")
                        this.addVideoStream(this.guestvideo,remotestream)
                    




                })

                this.peer.on('call',call=>{


                        console.log("peer call")
                        call.answer(stream)
    
                        call.on('stream',remotestream=>{
                            this.addVideoStream(this.guestvideo,remotestream)
                        })
                    


                })


    

    
    
    
            })



            this.msgconnection()

        })








    }




    msgconnection(){


        console.log("connect to ",this.peer_guestid)
        this.conn = this.peer.connect(this.peer_guestid)

        console.log(this.conn)



        this.conn.on('open',e=>{

            console.log("conn open")
   
        })


        this.conn.on('error',e=>{
            console.log("error",e)
        })

        this.peer.on('connection',conn=>{

            console.log("connection")

            this.conn = this.peer.connect(this.peer_guestid)
            //conn.off('data')

            conn.on('data',data=>{

                console.log(data)
                this.fire('incomingtext',data)

            })



        })


    }


    addVideoStream(video, stream) {

        //console.log(video)
        console.log("add video strem",video)

        video.srcObject = stream;
        
        console.log(stream)

		video.addEventListener('loadedmetadata', () => {
			console.log('start play');
            video.play();
            
		});
	}


    getStream() {
		return new Promise((resolve, reject) => {
			navigator.mediaDevices
				.getUserMedia({
					video : { width: 800, height: 600 },
					audio : true
				})
				.then((stream) => {
					resolve(stream);
                }).catch(e=>{
                    console.log(e)
                    reject(e);
                })
		});
  }





}