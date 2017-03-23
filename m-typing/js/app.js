var glitch = false;
var delay = 3;
var ticks = 0;

var colors = [

"#518197",
"#c27376",
"#9192b2",
"#c9982c",
"#d1c12a",
  "#6d7f36"]; // darker shades



$(document).ready(function(){
  loop();

  $(".logo-wrapper").on("click",function(){
    $(".words").text("m");
    timeout = 100;
    $("body").removeClass("done");
    done = false;
  });

});



var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function reset(){
  $("body").removeClass("")
  $(".letter").removeAttr("style");
}

timeout = 100;

function loop(){

  ticks++;
  timeout--;

  var chance = getRandom(0,10);
  if(chance > 6 && timeout < 0) {
    if(mistake) {
      correct();
      timeout = 8;
    } else {
      type();
      timeout = 8;
    }
  }

  window.requestAnimationFrame(loop);
}

var word = "moz://a";
var typedAlready = 1;
var done = false;
var mistake = false;

var mistakes = {
  "o" : ["i","p","k","l","0","9"],
  "z" : ["a","x","c","s"],
  "i" : ["o","u","8","9","k"],
  "/" : ["l","'",".","?"],
  ":" : ["i",";","'","l"],
  "a" : ["q","z","x","s"]
}

function correct(){
  var currentText = $(".words").text();
  currentText = currentText.slice(0, -1);
  $(".words").text(currentText);
  mistake = false;
  playSound("key2");
}

var lastColor = false;
var nextColor = false;

function type(){
  if(done) { return }

  var currentText = $(".words").text();

  var nextChar = word.charAt(currentText.length);

  var chance = getRandom(0,10);
  if(chance > 8) {
    var mistakeOptions = mistakes[nextChar];
    nextChar = mistakeOptions[getRandom(0, mistakeOptions.length - 1)];
    mistake = true;
  }

  $(".words").text(currentText + nextChar);

  nextColor = colors[getRandom(0,colors.length -1)]

  while(nextColor == lastColor) {
    nextColor = colors[getRandom(0,colors.length -1)]
  }

  lastColor = nextColor;

  $(".cursor").hide();
  $(".cursor").show();

  var currentText = $(".words").text();

  $(".page-wrapper").removeClass("pop");
  $(".page-wrapper").width($(".page-wrapper").width());
  $(".page-wrapper").addClass("pop");


  playSound("key1");

  if(currentText == word) {
    finish();
  }

}


function finish(){
  done = true;
  $("body").addClass("done");
  playSound("coin");
}

function getRandom(min, max){
  return Math.round(min + Math.random() * (max-min));
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index + 1, this.length);
}