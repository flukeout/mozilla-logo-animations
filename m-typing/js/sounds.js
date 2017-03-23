var context = new AudioContext();
var url = window.location;
var path = url.pathname;
var path = "./";

var sounds = {
  "key1" : {
    buffer : null,
    url : path + "sounds/key1.mp3"
  },
  "key2" : {
    buffer : null,
    url : path + "sounds/key2.mp3"
  },
  "coin" : {
    buffer : null,
    url : path + "sounds/coin.mp3"
  }
};


$(document).ready(function(){
  for(var key in sounds) {
    loadSound(key);
  }

})

function loadSound(name){
  var url = sounds[name].url;
  var buffer = sounds[name].buffer;
  var soundVolume = sounds[name].volume || 1;

  var request = new XMLHttpRequest();

  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(newBuffer) {
      sounds[name].buffer = newBuffer;

    });
  }
  request.send();
}

function playSound(name, options){


  var buffer = sounds[name].buffer;
  var soundVolume = sounds[name].volume || 1;

  if(buffer){
    var source = context.createBufferSource(); // creates a sound source
    source.buffer = buffer;                    // tell the source which sound to play

    var volume = context.createGain();

    if(options) {
      if(options.volume) {
        volume.gain.value = soundVolume * options.volume;
      }
    } else {
      volume.gain.value = soundVolume;
    }




    volume.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.connect(volume);       // connect the source to the context's destination (the speakers)
    source.start(0);
  }
}