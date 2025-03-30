export default class turnserver{




    constructor(){

    
    }




    getTurn(callback){

        const path = 'https://videodev.1328.hk/controller/getTURN.php'


        $.ajax({
            url: path,
            type: "POST",
            crossDomain: true,
 
            success: (response) => {
                callback(JSON.parse(response))
            },
            error: (xhr, status) => {
                console.log("error",status);
            }
        });
    

    }



}