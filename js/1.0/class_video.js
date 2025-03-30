


import Notification from "./notification.js"


export default class ClassVideo extends Notification{


    param 
    peer 
    streamtype
    stream

    constructor(param){
        super()

        this.param = param

        console.log(param)

        console.log("video")

        this.streamtype = 'camera'

        this.init()
    }


    init(){


        this.hostvideo = $(`#${this.param.hostvideoid}`).get(0)
        this.guestvideo = $(`#${this.param.guestvideoid}`).get(0)


        this.setup()


    }



    setup(){

        this.getStream().then(stream=>{

            this.stream = stream

            console.log("get stream ")

            this.addVideoStream(this.hostvideo,this.stream)


            this.call = peer.call(this.param.peer_guestid,this.stream);

            this.call.on('stream',remotestream=>{



                    console.log("call stream")
                    this.addVideoStream(this.guestvideo,remotestream)
                


            })

            peer.on('call',call=>{


                    console.log("peer call")
                    call.answer(stream)

                    call.on('stream',remotestream=>{
                        this.addVideoStream(this.guestvideo,remotestream)
                    })
                


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




    changeStream(type){

        console.log("change stream ",type)

        this.streamtype = type

        this.setup()



    }


    getStream() {

        //if (!global.isHost){

        if (this.streamtype == 'camera'){  

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

        else if (this.streamtype == 'desktop'){
            const displayMediaOptions = {
                video: {
                  displaySurface: "browser",
                },
                audio: {
                  suppressLocalAudioPlayback: false,
                },
                preferCurrentTab: false,
                selfBrowserSurface: "exclude",
                systemAudio: "include",
                surfaceSwitching: "include",
                monitorTypeSurfaces: "include",
              };
            return new Promise((resolve, reject) => {
                navigator.mediaDevices
                .getDisplayMedia(displayMediaOptions)
                    
    
                    .then((stream) => {
                        resolve(stream);
                    }).catch(e=>{
                        console.log(e)

                        console.log("cancel")
                        reject(e);
                    })
            });



        }



  }






}