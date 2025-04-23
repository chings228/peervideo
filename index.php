<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1, user-scalable=no">
    <title>Video</title>


    <script src= "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></script>

    <script type=module src=./js/1.0/app.js></script>

    <link rel="stylesheet" href="style.css">


</head>




<body><input type=text id=guestlink>
<div class=videodiv>
<video id=hostvideo autoplay muted playsinline > </video>
<video id=guestvideo autoplay   playsinline ></video>



</div>


<div class=chat>

    <div id=chathide>Hide Message</div>
    <div id=btn_image>Image</div>

    <div id=chat_content>


    </div>

    <div class=chat_input>

    <textarea id=chatinput></textarea><button id=enter>Enter</button>
    </div>


</div>



<div class=buttons>

    <button id=btn_sharedesktop> Share Desktop</button>

    <button id=btn_shutup>Shut Up</button>

    <button id=btn_mute> Mute</button>


</div>
</body>

</html>