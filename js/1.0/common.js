export default class Common{





     
  
    static convertSimpleDate(unixtimestamp, isYear) {
        var months_arr = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

        var date = new Date(unixtimestamp * 1000);

        var year = date.getFullYear();

        var month = months_arr[date.getMonth()];
        var day = date.getDate();

        var hours = date.getHours();

        var minutes = '0' + date.getMinutes();

        var seconds = '0' + date.getSeconds();

        var convdateTime = '';

        if (isYear) {
        convdateTime = year + '-';
        }
        convdateTime += month + '-' + day + ' ' + hours + ':' + minutes.substr(-2);

        return convdateTime;
    }



    static convertSimpleDateWithoutTime(unixtimestamp, isYear) {
      var months_arr = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

      var date = new Date(unixtimestamp * 1000);

      var year = date.getFullYear();

      var month = months_arr[date.getMonth()];
      var day = date.getDate();

      var convdateTime = '';

      if (isYear) {
      convdateTime = year + '-';
      }
      convdateTime += month + '-' + day 

      return convdateTime;
  }



    static he(str){
        return this.htmlspecialencode(str)
      }

     static  hd(str){

          return this.htmlspecialdecode(str)
      }

     static htmlspecialencode(str){

        console.log(str)
        return str.toString().replaceAll(/&/g, "&amp;").replaceAll(/>/g, "&gt;").replaceAll(/</g, "&lt;").replaceAll(/"/g, "&quot;");
  
      }
  
  
    static  htmlspecialdecode(str){
  
  
        return str.replaceAll(/&amp;/g,"&" ).replaceAll(/&gt;/g,">").replaceAll(/&lt;/g, "<").replaceAll(/&quot;/g, "\"");
  
      }


      
  static  getUrlParameter(sParam) {

      console.log("geturl",sParam)
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
  
        for (var i = 0; i < sURLVariables.length; i++) {
          var sParameterName = sURLVariables[i].split('=');
  
          var key = sParameterName[0];
  
          if (key == sParam) {
            return sParameterName[1];
          }
        }
      }


   static   api(param) {
        var url = '';
        var baseurl = '';
    
    
        baseurl = window.location.origin+'/'
    
    
        var result;
    
        url = `${baseurl}fapi/${param.method}`;

        delete param.method


        console.log(param)
        return new Promise((resolve, reject) => {
        $.post(url, param, (data) => {


    
          result = JSON.parse(data);
    
          resolve(result);
        }).fail((error) => {
          console.log(error)
          reject(error);
        });
        });
        }
    
    
    static    getCookie(cname) {
          var name = cname + '=';
          var decodedCookie = decodeURIComponent(document.cookie);
          var ca = decodedCookie.split(';');
          for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
          }
          return '';
        }
    
     static   setCookie(cname, cvalue, exdays) {

          console.log(global.isLogCookie)

          if (global.isLogCookie){
            var d = new Date();
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
            var expires = 'expires=' + d.toUTCString();
            document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';

          }


        }
    


          
    static   makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }



}