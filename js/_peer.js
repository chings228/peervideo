
import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"


export default class peerobj{



    option = {}


    pid 

    peer 

    sendConn
    receiveConn

    callback

    cachemsg = {}

    constructor(pid){


        this.pid = pid 

        this.option.host = 'video.1328.hk';
        this.option.port = 3030;
        this.option.path = '/';


        this.init()

    }



    init(){

        let peerid = `host_${this.pid}`
        let oppid = `guest_${this.pid}`

        if (!global.isHost){

            oppid = `host_${global.guestid}`
            peerid = `guest_${global.guestid}`
        }


        // if (global.isHost){

        //     const link = `https://video.1328.hk/?guestid=${randomid}`

        //     $("#info").html(`${randomid} <a target=_new href='${link}'>Guest link</a>`)
        // }



        console.log(peerid,this.option)

        this.peer = new Peer(peerid,this.option)

        console.log(this.peer)



        this.peer.on("open",e=>{

            console.log("peer open ",e)


            this.connectOpp(oppid)


        })


    }


    connectOpp(oppid){

        console.log("connectopp",oppid)

        this.sendConn = this.peer.connect(oppid)

        this.sendConn.on('error',e=>{

           

            this.connectOpp(oppid)


            console.log(e)
        })


        this.sendConn.on('open',e=>{

            console.log("connection open ")

            // this.sendConn.send('hi')

            if (this.cachemsg && this.cachemsg.text != ''){
                this.sendConn.send(this.cachemsg)
                this.cachemsg = ''
            }
        })


        this.peer.on('connection',conn=>{

    

            console.log("be connected ",this.pid)

            this.receiveConn = conn


            this.receiveConn.off('data')

    
            this.receiveConn.on('data',data=>{

                console.log(data)

                const html = `<div class=chat_guest>${data.text}</div>`


                $("#content").prepend(html)

            })

       


        })

        this.peer.on('close',e=>{
            console.log('close')
        })

        this.peer.on('disconnected',e=>{
            console.log('disconnected')
        })





    }

    send(param,callback){

        console.log("msg")

        param.uid = global.guestid

        this.cachemsg = param

        this.callback = callback

        this.sendConn.send(param)

    }


}