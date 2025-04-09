


import Notification from "./notification.js"


export default class ClassVideo extends Notification{


    param 

    camerastream
    desktopstream
    peers

    remoteCameraStream

    constructor(peers,param){
        super()

        this.peers = peers

        this.param = param

        console.log(param)

        console.log("video")



        this.addAvatarVideoDiv()

        this.init()
    }


    addAvatarVideoDiv(){



            const html = `
            
                <style>

            
#avatarvideo{

    position:absolute;
    z-index : 9999;
    top: 20px;
    right : 20px;
    width : 40vw;
    height : 30vw;
    max-width : 300px;
    max-height : 200px;
    background-color: blue;
    display:none;

}
            
    </style>     
    <video id=avatarvideo autoplay playsinline></video>    
            `

            $(".videodiv").append(html)
    }


    init(){




        this.hostvideo = $(`#${this.param.hostvideoid}`).get(0)
        this.guestvideo = $(`#${this.param.guestvideoid}`).get(0)
        this.avatarvideo = $('#avatarvideo').get(0)

        this.desktopmode = false;


        // if (!global.isHost){

        //     $("#avatarvideo").css("display","block")
        // }


        this.setupCamera()

        this.listenDesktopCall()

        
        
    }


    listenDesktopEnd(){


        

            this.desktopstream.getVideoTracks()[0].onended = ()=>{
                // doWhatYouNeedToDo();

                    if (this.desktopmode){
        
                        console.log("stop sharing")

                        this.stopSharing()

                    

                    }
              }


        



    }


    listenDesktopCall(){

        this.peers.desktop.on('call',call=>{


         

            console.log('peeroncall')
            call.answer()

            call.on('stream',remotestream=>{


                $("#btn_sharedesktop").css("display","none")

                this.addVideoStream(this.guestvideo,remotestream)


                $("#avatarvideo").css("display","block")

                this.addVideoStream(this.avatarvideo,this.remoteCameraStream)
            })



        })

        this.peers.desktop.on('disconnected',e=>{

            console.log("disconnected")


        })
    }


    setupCamera(){

        this.getStream('camera').then(stream=>{

            this.camerastream = stream

            console.log("get stream ")

            this.addVideoStream(this.hostvideo,this.camerastream)


            this.call = this.peers.video.call(`${this.param.peer_guestid}_video`,this.camerastream);

            this.call.on('stream',remotestream=>{

                this.remoteCameraStream = remotestream

                    console.log("call stream")
                    this.addVideoStream(this.guestvideo,remotestream)
                


            })

            this.peers.video.on('call',call=>{


                    console.log("peer call")
                    call.answer(this.camerastream)

                    call.on('stream',remotestream=>{

                        this.remoteCameraStream = remotestream
                        this.addVideoStream(this.guestvideo,remotestream)
                    })
                


            })



        })
    }






    handleDesktop(){


        // stream handle

 


        if (!this.desktopmode){


                this.getStream('desktop').then(stream=>{

                
                    this.desktopstream  = stream
                    this.listenDesktopEnd()
                
                    this.call = this.peers.desktop.call(`${this.param.peer_guestid}_desktop`,this.desktopstream)


                    this.desktopmode = true
                    $("#btn_sharedesktop").text("Stop Sharing")

                    this.call.on('stream',remotestream=>{

                        console.log('callon')
                        this.addVideoStream(this.guestvideo,remotestream)



                    })


                })
        }




    }


    stopSharing(){

        
        console.log("stop sharing")

        this.desktopmode = false
        this.desktopstream.getTracks().forEach(track => track.stop())

        $("#btn_sharedesktop").html("Share Desktop");


        this.fire("command","stopsharing")
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


    stopGuestDesktopSharing(){


        console.log("stop guest sharing ui")

        $("#avatarvideo").css("display","none")

        this.addVideoStream(this.guestvideo,this.remoteCameraStream)

        $("#btn_sharedesktop").css("display","block")



    }


    changeStream(){

        if (!this.desktopmode){

            this.handleDesktop()
        }
        else{
            this.stopSharing()
        }

        



    }


    getStream(type) {

        //if (!global.isHost){

        const multiplier = 1;

        const width = 600 * multiplier;
        const height = 400 * multiplier

        console.log(multiplier)





        if (type == 'camera'){  

            return new Promise((resolve, reject) => {

                if (navigator.mediaDevices.getSupportedConstraints().zoom){
                    console.log("suppot zoom")
                }
                else{
                    console.log("not support zoom")
                }
                navigator.mediaDevices
                    .getUserMedia({
                        video : { width: width, height: height },
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

        else if (type == 'desktop'){
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