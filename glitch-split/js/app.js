var glitch = false;
var delay = 3;
var ticks = 0;

var colors = [
"#ffffff",
"#bb76b1",
"#009e9d",
"#689e41",
"#b0d236",
"#f58c8f",
"#83cff4",
"#9192b2",
"#f8ba16",
"#a23625"];

$(document).ready(function(){
  loop();

  $(".logo-wrapper").on("mouseenter",function(){
    glitch = true;
  });

  $(".logo-wrapper").on("mouseleave",function(){
    glitch = false;
  });

  $(".logo-wrapper").on("click", function(){
    click();
  });

});

var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function reset(){
  $(".top, .bottom").removeAttr("style");
  $(".words").text("moz://a");
}


function loop(){

  ticks++;

  if(ticks > 2) {
    reset();
  }

  var chance = getRandom(0,10);
  if(chance > 6 && glitch) {
    shift();
    ticks = 0;
  }

  var chance = getRandom(0,10);
  if(chance > 8 && glitch) {
    color();
    ticks = 0;
  }


  var chance = getRandom(0,10);
  if(chance > 9 && glitch) {
    letter();
    ticks = 0;
  }

  window.requestAnimationFrame(loop);
}

function letter(){

  var string = "moz://a";
  var place = getRandom(0, string.length);
  var randomChar = possible[getRandom(0, possible.length-1)];
  string = string.replaceAt(place,randomChar);


  var random = getRandom(0,1) % 2;

  if(random == 1) {
    $(".top .words").text(string);
  } else {
    $(".bottom .words").text(string);
  }

  // $(".bottom").css("background",colors[getRandom(0,colors.length-1)]);
  // $(".top").css("background",colors[getRandom(0,colors.length-1)]);

}

function color(){
  $(".bottom").css("background",colors[getRandom(0,colors.length-1)]);
  $(".top").css("background",colors[getRandom(0,colors.length-1)]);

}

function shift(){


  var breakAt = getRandom(30,70);

  $(".top").css("height", breakAt + "%");
  $(".bottom").css("height", (100 -breakAt) + "%");

  var shift = getRandom(-15,15);
  $(".bottom").css("transform","translateX("+shift+"px)");

  var shift = getRandom(-15,15);
  $(".top").css("transform","translateX("+shift+"px)");
}

function getRandom(min, max){
  return Math.round(min + Math.random() * (max-min));
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index + 1, this.length);
}