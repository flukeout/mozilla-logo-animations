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
    makeSnake();
  });

  $(".logo-wrapper").on("mouseleave",function(){
    resetSnake();
  });


});

var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function reset(){
  $(".letter").removeAttr("style");
}


function loop(){

  ticks++;

  if(ticks > 2) {
    // reset();
  }

  var chance = getRandom(0,10);
  if(chance > 6 && glitch) {
    // shift();
    ticks = 0;
  }

  window.requestAnimationFrame(loop);
}

function resetSnake() {
  $(".letter").each(function(){
    $(this).removeAttr("style")
    $(this).removeClass("boom");
  });

  $("body").removeAttr("style")
}


function makeSnake() {

  var delay = 0;
  var delayIncrement = .1;

  $("body").css("background",colors[getRandom(0,colors.length - 1)]);

  var padding = getRandom(5,20) + "px " + getRandom(5,20) + "px";

  $(".letter").each(function(){


    $(this).css("padding",padding);
    $(this).css("background",colors[getRandom(0,colors.length - 1)]);
    $(this).addClass("boom").css("animation-delay",delay + "s");
    delay = delay + delayIncrement;
  });

}


function shift(){

  var index = getRandom(1,6);
  var shiftY = getRandom(-6,6);

  $(".letter:nth-child("+index+")").css("transform","translateY("+shiftY+"px)");

  // var shift = getRandom(-15,15);
  // $(".red").css("transform","translateX("+shift+"px)");
}

function getRandom(min, max){
  return Math.round(min + Math.random() * (max-min));
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index + 1, this.length);
}