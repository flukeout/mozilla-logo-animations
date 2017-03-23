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
  $(".red, .blue, .white").removeAttr("style");
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

  window.requestAnimationFrame(loop);
}


function shift(){

  var shiftX = getRandom(-6,6);
  var shiftY = getRandom(-6,6);


  $(".blue").css("transform","translateX("+shiftX+"px) translateY("+shiftY+"px)");
  $(".red").css("transform","translateX("+ -shiftX +"px) translateY("+ -shiftY+"px)");
  $(".white").css("opacity",.5);
  // var shift = getRandom(-15,15);
  // $(".red").css("transform","translateX("+shift+"px)");
}

function getRandom(min, max){
  return Math.round(min + Math.random() * (max-min));
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index + 1, this.length);
}