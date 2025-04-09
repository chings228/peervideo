
import turnserver from "./turnserver"

import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"

export default class createtPeer{


    callback

    peers = {}

    isFinishVideo = false
    isFinishDesktop = false

    turnserver

    name 



    constructor(name,callback){


        this.callback = callback
        this.name = name

        const turn = new turnserver()


        turn.getTurn(e=>{


            if (e.isSuccess){

                this.turnserver = e.config
                this.connectPeer("desktop")
                this.connectPeer("video")

            }




        })





    }


    connectPeer(type){


        console.log(`isHost ${global.isHost}`)

        const option = {};
        option.host = 'video.1328.hk';
        option.port = 3030;
        option.path = '/';
        option.config = this.turnserver


        const pname = `${this.name}_${type}`

        console.log(pname)

        const peer  = new Peer(pname,option)


        this.peers[type] = peer


        peer.on("open",e=>{

            console.log("open",peer)

            if (type == 'desktop'){

                this.isFinishDesktop = true
            }
            else if (type == 'video'){

                this.isFinishVideo = true
            }


            if (this.isFinishDesktop && this.isFinishVideo){

                this.callback(this.peers)
            }


        })




    }



}