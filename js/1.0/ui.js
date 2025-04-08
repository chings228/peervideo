
import PeerConnect from "./class_peer"

import Controls from "./control"


export default class UI{


    param
    control

    peerConnect

    streamtype 

    constructor(param){

        this.streamtype = 'camera'

        this.param = param

        console.log("ui")

        this.init()

    }




    init(){

        

        this.peerConnect = new PeerConnect(this.param,e=>{

            console.log(e)

            if (!e.success){
                return
            }

            this.control = new Controls()

            this.control.on("changeStrem",()=>{

                this.changeStream()
            })



            if (global.isHost){

                window.history.pushState({},null,`${window.location.origin}/?hostid=${e.peerid}`)
                $("#guestlink").val(e.guestlink)

            }
        
        })


        this.peerConnect.on("incomingtext",e=>{

            console.log(e)

            const html = `<div class='chat_dialogue chat_guest'>${Common.he(e)}</div>`

            $("#chat_content").append(html.replaceAll('\n','<br>'))

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

         $("#chathide").text(title)


    }


        sendtext(){

            const content = $("#chatinput").val().trim()


            if (content != ''){


                const html = `<div class='chat_dialogue chat_host'>${Common.he(content)}</div>`

                $("#chat_content").append(html.replaceAll('\n','<br>'))


                this.peerConnect.sendMsg(content)

                this.scrollToBottom()

                $("#chatinput").val('')
            }


        




    }


    scrollToBottom(){

        const objDiv = document.getElementById("chat_content");
    
        objDiv.scrollTop = objDiv.scrollHeight;
    }



    changeStream(){

        console.log("change stream")
        const btn = $("#btn_sharedesktop")

    

        if (this.streamtype == 'camera'){

            this.streamtype = 'desktop'
        }
        else{
            this.streamtype = 'camera'
           
        }


        //btn.html(title)

        this.peerConnect.changeStream(this.streamtype)


    }




}