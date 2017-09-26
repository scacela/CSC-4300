function rectFun() {
// retrieve the <canvas> element by id
  var canvas = document.getElementById("target");
  if(!canvas){
    console.log("Could not retrieve the <canvas> element");

    return false;
  }

// get the rendering context for 2DCG
var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
if(!gl){
  console.log("Failed to get the rendering context for WebGl");
  return;
}

// let's clear the canvas with our "green/blue"!
// Remember, RGB values are in decimal.
// Use this converter: http://www.corecoding.com/utilities/rgb-or-hex-to-float.php
gl.clearColor(0, .466667, .607843, 1.0);

// clear the canvas
gl.clear(gl.COLOR_BUFFER_BIT);
}
