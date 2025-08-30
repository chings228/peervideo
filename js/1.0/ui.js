
// import PeerConnect from "https://cdn.jsdelivr.net/gh/chings228/peervideo@master/js/1.0/class_peer.js"


// import PeerConnect from "https://peer.1328.hk/js/1.0/class_peer.js"

import PeerConnect from "https://peerdev.1328.hk/js/1.0/class_peer.js"


// import PeerConnect from "./class_peer.js"

import Controls from "./control"


export default class UI{


    param
    control

    peerConnect



    constructor(param){

    

        this.param = param

        console.log("ui")

        this.init()

    }


    init(){



        console.log(this.param)
        

        this.peerConnect = new PeerConnect(this.param,e=>{

            console.log(e)

            if (!e.success){
                return
            }

            this.control = new Controls(this.param)


            this.control.on("mute",e=>{

                console.log("mute",e)

                this.peerConnect.changeMute(e)
            })

            this.control.on("changeStrem",()=>{

                this.changeStream()
            })



            if (global.isHost){

                window.history.pushState({},null,`${window.location.origin}/?hostid=${e.peerid}`)
                $("#guestlink").val(e.guestlink)

            }
        
        })

        this.peerConnect.on("incomingvideo",()=>{

            console.log("incoming video")

        })


        this.peerConnect.on("incomingtext",e=>{

            console.log(e)

            if (e.type == 'text'){
                const html = `<div class='chat_dialogue chat_guest'>${Common.he(e.content)}</div>`

                $("#chat_content").append(html.replaceAll('\n','<br>'))


            }

            else if (e.type == 'image'){

                const html = `<div class='chat_dialogue chat_guest'><img  class=clickimage src=${e.content} width=80% ></div>`

                $("#chat_content").append(html)

                this.imagelistener()


            }



            this.scrollToBottom()

            this.switchChatWindow(false)

        })


        $("#enter").click(e=>{




            this.sendtext()

            
        })








        $("#chathide").click(()=>{

            this.isHideChat = !this.isHideChat

            this.switchChatWindow(this.isHideChat)


        })


        document.onkeypress = evt => {

                if (evt.keyCode == 13 && !evt.shiftKey) {
                    this.sendtext()
                }

        };



        $("#btn_image").click(()=>{


            this.sendImage()


        })


    }   





    switchChatWindow(isHide){

        

        let  display = 'none'
        let display_f = 'none'
        let  title = 'Show Message'

        if (!isHide){

            display = 'block'
            title = 'Hide Message'
            display_f = 'flex'

        }


         $(".chat_input").css("display",display_f)
         $("#chat_content").css("display",display)
         $("#btn_image").css("display",display)

         $("#chathide").text(title)


    }



    sendImage(){

        var input = document.createElement('input');

        input.type = 'file';
        input.id = "fileupload"
        input.accept = "image/png, image/gif, image/jpeg"
        input.click()

        console.log(input)

        console.log($("#fileupload"))

        input.onchange = e=>{


            const reader = new FileReader()
            console.log(e)

            const file = e.target.files[0]

            console.log(file)

            reader.readAsDataURL(file)


            reader.onload = ()=>{

                console.log(reader)



                const img = new Image()

                img.src = reader.result

                const html = `<div class='chat_dialogue chat_host'><img class=clickimage width=80% src=${reader.result}></div>`


                $("#chat_content").append(html)

                this.imagelistener()


                const data = {}

                data.type = 'image'
                data.content = reader.result

                this.peerConnect.sendMsg(data)


                this.scrollToBottom()


            }




        }


    }


        sendtext(){

            const content = $("#chatinput").val().trim()


            if (content != ''){


                const html = `<div class='chat_dialogue chat_host'>${Common.he(content)}</div>`

                $("#chat_content").append(html.replaceAll('\n','<br>'))


                const data = {}

                data.type='text'
                data.content = content
                this.peerConnect.sendMsg(data)

                this.scrollToBottom()

                $("#chatinput").val('')
            }


        




    }


    scrollToBottom(){

        const objDiv = document.getElementById("chat_content");
    
        objDiv.scrollTop = objDiv.scrollHeight;
    }



    changeStream(){




        //btn.html(title)

        this.peerConnect.changeStream()


    }



    imagelistener(){

        const clickimage = $(".clickimage")


        clickimage.off("click")
        clickimage.click(e=>{

            console.log("click",e.currentTarget.src)
            var win = window.open();
            win.document.write(`<img src=${e.currentTarget.src}>`)


        })
    }



}