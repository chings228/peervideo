
import turnserver from "./turnserver"

import peerobj from "./peer"



export default class classTalk{



    turnserver
    sendConn
    receiveConn

    peer

    cachemsg = ''


    constructor(){

        



        console.log("talk constr")



        if (global.isHost){
            // const pids = ['a','b','c','d','e','f','g','h'];

            const pids = ['a','b']


            pids.forEach(pid => {
                
    
    
    
                this.peer = new peerobj(pid)
    
            });

        }
        else{
            this.peer = new peerobj(global.guestid)
        }





        this.chatEvent()

        return


        const turn = new turnserver()

       turn.getTurn(e=>{


            console.log(e)

            this.turnserver = e


            this.connect()


           

        })

    }


    connect(){

        console.log(`isHost ${global.isHost}`)

        const option = {};
        option.host = 'video.1328.hk';
        option.port = 3030;
        option.path = '/';
        option.config = this.turnserver;


        // const randomid = Common.makeid(10);


        const randomid = "a"

        let peerid = `host_${randomid}`
        let oppid = `guest_${randomid}`

        if (!global.isHost){

            oppid = `host_${global.guestid}`
            peerid = `guest_${global.guestid}`
        }

        if (global.isHost){

            const link = `https://video.1328.hk/?guestid=${randomid}`

            $("#info").html(`${randomid} <a target=_new href='${link}'>Guest link</a>`)
        }


        this.peer = new Peer(peerid,option)

        console.log(this.peer)



        this.peer.on("open",e=>{

            console.log("peer open ",e)


            this.connectOpp(oppid)


        })





    }




    chatEvent(){

        console.log("chat event")


        $("#submit").click(()=>{

            console.log("click")

            const msgtxt = $("#msgtxt").val().trim()

            const param={}
            param.text = msgtxt

            console.log(param)

            if (msgtxt != ''){

                


                const html = `<div class=chat_host>${global.guestid} ${param.text}</div>`


                $("#content").prepend(html)


                $("#msgtxt").val('') 

                console.log(this.sendConn)


                //this.sendConn.send(param)


                this.peer.send(param,e=>{



                })




            }




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

    

            console.log("be connected")

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





}