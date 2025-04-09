


import Notification from "./notification";

export default class Controls extends Notification{


    constructor(){

        super()
        // init

        this.init()
    }


    init(){


        $("#btn_sharedesktop").click(()=>{

        
            this.fire("changeStrem",'')
        })



        $("#btn_mute").click(()=>{




            const gv = $("#guestvideo")

            const av = $("#avatarvideo")

            console.log(gv.get(0).muted )

            gv.get(0).muted =  !gv.get(0).muted 
            av.get(0).muted =  !av.get(0).muted 

            let title = 'Mute'

            if (gv.get(0).muted){
                title = 'UnMute'

            }

            $("#btn_mute").html(title)

        })





    }




}