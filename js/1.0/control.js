


import Notification from "./notification";

export default class Controls extends Notification{


    isMute

    param

    constructor(param){

        super()
        // init

        this.param = param

        this.isMute = false

        this.init()
    }


    init(){


        $("#btn_sharedesktop").click(()=>{

        
            this.fire("changeStrem",'')
        })



        $("#btn_shutup").click(()=>{




            const gv = $(`#${this.param.guestvideoid}`)

            const av = $(`#${this.param.avatarvideoid}`)

            console.log(gv.get(0).muted )

            gv.get(0).muted =  !gv.get(0).muted 
            av.get(0).muted =  !av.get(0).muted 

            let title = 'Slient'

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