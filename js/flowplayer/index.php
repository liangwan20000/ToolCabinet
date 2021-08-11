<!doctype html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <!-- player skin -->
   <link rel="stylesheet" type="text/css" href="<?php echo MOD_PATH;?>/skin.css" />
   <link href="<?php echo MOD_PATH;?>/video-js.css" rel="stylesheet" type="text/css">
   
   <style>
   /* site specific styling */
   html ,body{width:100%;height:100%;overflow:hidden;margin:0;padding:0;}
   body {
      font: 12px "Myriad Pro", "Lucida Grande", "Helvetica Neue", sans-serif;
      text-align: center;
      padding-top: 0;
      color: #999;
      background-color: #333333;
	  
   }
   /* custom player skin */
   /*.flowplayer .fp-controls { background-color: rgba(17, 17, 17, 1)}*/
   .flowplayer .fp-timeline { background-color: rgba(204, 204, 204, 1)}
   .flowplayer .fp-progress { background-color: rgba(0, 167, 200, 1)}
   .flowplayer .fp-buffer { background-color: rgba(249, 249, 249, 1)}
   .flowplayer { background:#000}
   .fp-header{display:none}
   </style>
   <script type="text/javascript" src="static/jquery/jquery.min.js"></script>
   <!-- flowplayer javascript component -->
   <!-- <script src="<?php echo MOD_PATH;?>/flowplayer.min.js"></script> -->
   <script src="<?php echo MOD_PATH;?>/video-js.js"></script>
</head>
<body><?php 
global $_G;
$path=dzzdecode($_GET['path']);
$patharr=explode(':',$path);
 if($patharr[0]=='ftp'){
 	$src=$_G['siteurl'].DZZSCRIPT.'?mod=io&op=getStream&path='.rawurldecode($_GET['path']).'&n=play.'.$_GET['ext'];
 }else{
 	$src=IO::getFileUri($path);
 	$src=str_replace('-internal.aliyuncs.com','.aliyuncs.com',$src);
 }
if($_GET['ext']=='mp4'){
	$type='video/mp4';
}elseif($_GET['ext']=='flv' || $_GET['ext']=='m4v'){
	$type='video/flash';
}elseif($_GET['ext']=='mp3'){
	$type='audio/mp3';
}elseif($_GET['ext']=='wav' || $_GET['ext']=='flac' ){
	$type='audio/x-wav';
}elseif($_GET['ext']=='webm'){
	$type='video/webm';
}elseif($_GET['ext']=='ogv' || $_GET['ext']=='ogg'){
	$type='video/ogg';
}elseif($_GET['ext']=='m3u8' || $_GET['ext']=='HLS'){
	$type='application/x-mpegurl';
}
?><div class="flowplayer play-button fp-slim fp-outlined fp-mute" data-ratio="0.5625" style="height:100%;width:100%;postion:absolute;left:0;top:0;overflow:hidden">
  <div id="watermark" style="position: fixed; left: 17px; top: 470px; font-weight: 700; color: #FFF; font-size: 20px; z-index: 100;"><?php echo $_G['username'] . $_G['realname']?></div>

  <!-- <video autoplay class="video">
     <source  type="<?php echo $type ?>" src="<?php echo $src;?>">
  </video> -->

  <video-js
    style="width: 100%; height: 100%;"
    controls
    preload="auto"
    id="vid1"
    autoplay>
    <source src="<?php echo $src;?>" type="<?php echo $type ?>">
    <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
  </video-js>
</div>
<script>
  var fl = document.getElementById('watermark');

  var chroX = document.documentElement.clientWidth;//yemian整个的高宽
  var chroY = document.documentElement.clientHeight;

  var offsetLeft = fl.offsetLeft;//盒子的位置
  var offsetTop = fl.offsetTop;

  var timer = 0;

  var x = 1;
  var y = 1;

  window.onresize = function(){
      chroX = document.documentElement.clientWidth;//yemian整个的高宽
      chroY = document.documentElement.clientHeight;
  }

  function move(){
      offsetLeft += x;
      offsetTop += y;
      fl.style.left = offsetLeft  + 'px';
      fl.style.top = offsetTop  + 'px';
      console.log(chroY)
  }
  timer = setInterval(function(){
      move();
      if(offsetTop + 100 > chroY || offsetTop < 0){
          y = -y;
      }
      if(offsetLeft + 100 > chroX || offsetLeft < 0){
          x = -x;
      }
  }, 10)
  let vid = document.getElementById('vid1');
  let player = videojs(vid, {}, function onPlayerReady() {
    videojs.log('Your player is ready!');

    // In this context, `this` is the player that was created by Video.js.
    this.play();

    // How about an event listener?
    this.on('ended', function() {
      videojs.log('Awww...over so soon?!');
    });
  });
</script>
</body>
</html>