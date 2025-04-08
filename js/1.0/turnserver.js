export default class turnserver{




    constructor(){

    
    }




    getTurn(callback){

        const config =  {'iceServers': [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun.l.google.com:5349" },
            { urls: "stun:stun1.l.google.com:3478" },
            { urls: "stun:stun1.l.google.com:5349" },
            { urls: "stun:stun2.l.google.com:19302" },
            { urls: "stun:stun2.l.google.com:5349" },
            { urls: "stun:stun3.l.google.com:3478" },
            { urls: "stun:stun3.l.google.com:5349" },
            { urls: "stun:stun4.l.google.com:19302" },
            { urls: "stun:stun4.l.google.com:5349" }
          ]}

        callback({isSuccess : true,config:config})

        // const path = 'https://videodev.1328.hk/controller/getTURN.php'


        // $.ajax({
        //     url: path,
        //     type: "POST",
        //     crossDomain: true,
 
        //     success: (response) => {
        //         callback(JSON.parse(response))
        //     },
        //     error: (xhr, status) => {
        //         console.log("error",status);
        //     }
        // });
    

    }



}