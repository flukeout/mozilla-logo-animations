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


  $("svg").on("mouseenter",function(){
    hovered = true;
  });

  $("svg").on("mouseleave",function(){
    hovered = false;
  });

  originalPath = $("svg path").attr("d");
  loop();
  // parseSvg();



});

var originalPath;
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var squirm = 0;
var squirmAdjustor = .01;
var hovered = false;

function parseSvg(){

  var array = originalPath.split(" ");
  var lastType = false;

  for(var i = 0; i < array.length; i++) {
    var isLetter = array[i].match(/[a-z]/i);
    if(isLetter) {
      lastType = array[i];
    } else {
      var float = parseFloat(array[i]);
      if(float == 0) {
        array[i] = getRandom(-squirm, squirm);
      } else {
        array[i] = float + getRandom(-squirm, squirm);
      }

      array[i] = array[i].toFixed(1);
    }
  }



  return array.join(" ");


}

function reset(){
  $(".top, .bottom").removeAttr("style");
  $(".words").text("moz://a");
}


function loop(){



  if(hovered) {
    squirm = squirm + squirmAdjustor;
  } else {
    squirm = squirm - (squirmAdjustor * 4);
    if(squirm < 0) {
      squirm = 0;
    }
  }

  run();

  window.requestAnimationFrame(loop);
}


function run(){

  var newPath = parseSvg();

  // var jam = getRandom(60,70);

  $("svg path").attr("d", newPath);

}

function getRandom(min, max){
  return min + Math.random() * (max-min);
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index + 1, this.length);
}