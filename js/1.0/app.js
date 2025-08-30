



import Common from "./common"
// import classTalk from "./class_talk"

import UI from "./ui"



$(function(){


    console.log("jq")


   window.Common = Common
   window.global = {}




    init()

})




function init(){

    global.isHost = true

    console.log(window.location)

    if (!window.location.host.toLowerCase().includes('dev')){

        console.log = function(){}
    }



    if (Common.getUrlParameter("guestid")){

        global.peerid = Common.getUrlParameter("guestid")
        global.isHost = false
    }
    
    
    if (Common.getUrlParameter("hostid")){

        global.peerid = Common.getUrlParameter("hostid");


    }
    else{
        global.hostid = 'a'
    }


    if (global.isHost){


        $("#guestlink").css("display","block")
    }


    const param = {}

    param.hostvideoid = 'hostvideo'
    param.guestvideoid = 'guestvideo'
    param.avatarvideoid = 'avatarvideo'
    param.isHost = global.isHost 
    // param.peerserverdomain = "video.1328.hk"
    // param.peerserverport = 3030

    param.sharebtn = 'btn_share'

    param.mutebtn = 'btn_mute'
    param.silentbtn = 'btn_silent'


    


    if (global.hasOwnProperty('peerid')){

        param.hostid = global.peerid
        
    }






    

    new UI(param)



}



