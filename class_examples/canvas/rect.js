function rectFun() {
// retrieve the <canvas> element by id
  var canvas = document.getElementById("target");
  if(!canvas){
    console.log("Could not retrieve the <canvas> element");

    return false;
  }

// get the rendering context for 2DCG
var ctx = canvas.getContext("2d");

// blue rectangle
ctx.fillStyle = 'rgba(21, 88, 210, 1.0)';
ctx.fillRect(120, 20, 150, 150);

// yellow rectangle
ctx.fillStyle = 'rgba(230, 218, 82, 1.0)';
ctx.fillRect(120, 20, 50, 50);
}
