var glitch = false;
var delay = 3;
var ticks = 0;

var colors = [
"#000",
"#bb76b1",
"#009e9d",
"#689e41",
"#b0d236",
"#f58c8f",
"#83cff4",
"#9192b2",
"#f8ba16",
"#518197",
"#a23625"];


$(document).ready(function(){
  loop();

  $("h1").on("mouseenter",function(){
    glitch = true;
  });

  $("h1").on("mouseleave",function(){
    glitch = false;
    reset();
  });

  $("h1").on("click", function(){
    click();
  });

});

var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function reset(){


  $("h1").removeAttr("style");
  $("h1").text("moz://a");
}


function loop(){

  ticks++;
  if(ticks > delay) {
    if(glitch) {
      bam();
    }
    ticks = 0;
  }
  window.requestAnimationFrame(loop);
}

function click(){
  var text = $("h1").text();
  var span = $("<span>" + text + "</span>")
  var color = $("h1").css("background-color");
  span.css("background",color);

  $(".words").append(span);

}


function bam(){

  var displayString = "moz:lla";
  var stringLength = $("h1").text().length;
  var place = getRandom(0, stringLength);
  var randomChar = possible[getRandom(0, possible.length-1)];
  displayString = displayString.replaceAt(place,randomChar);

  click();

  var rotate = getRandom(-2,2);
  var scale = getRandom(100,120) / 100;

  var X = getRandom(-3,3);
  var Y = getRandom(-3,3);

  $("h1").css("transform", "rotate("+rotate+"deg) scale("+scale+") translateX("+X+"px) translateY("+Y+"px)");
  $("h1").css("background", colors[getRandom(0, colors.length - 1)]);
  $("h1").css("padding", getRandom(0,10) + " " + getRandom(5,25));

  $("h1").text(displayString);
}

function getRandom(min, max){
  return Math.round(min + Math.random() * (max-min));
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index + 1, this.length);
}