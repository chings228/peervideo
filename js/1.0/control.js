


import Notification from "./notification";

export default class Controls extends Notification{


    isMute


    constructor(){

        super()
        // init

        this.isMute = false

        this.init()
    }


    init(){


        $("#btn_sharedesktop").click(()=>{

        
            this.fire("changeStrem",'')
        })



        $("#btn_shutup").click(()=>{




            const gv = $("#guestvideo")

            const av = $("#avatarvideo")

            console.log(gv.get(0).muted )

            gv.get(0).muted =  !gv.get(0).muted 
            av.get(0).muted =  !av.get(0).muted 

            let title = 'Shut Up'

            if (gv.get(0).muted){
                title = 'Listen Again'

            }

            $("#btn_shutup").html(title)

        })



        $("#btn_mute").click(()=>{

            console.log("click mute")

            let title = 'Mute'

             this.isMute = !this.isMute

            this.fire("mute",this.isMute)


            if (this.isMute){
                title = 'UnMute'
            }


            $("#btn_mute").html(title)





        })





    }




}