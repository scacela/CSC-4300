var FS_Source;
var VS_Source;
//var bp = bp;

function canvasDemo(){
    bp.loadShaderFiles(); // loads files asynchronously
}

// After successful asynchronous loading, call run()
function run(){
  var gl = bp.getWebGLContext("target");

  bp.initShaderProgram(gl, VS_Source, FS_Source);

  // Retrieve the storage location of a_Position
  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if(a_Position < 0){
    console.log("Failed to get the storage location of a_Position");
    return;
  }

  var xCoord = 1.0;
  var milliseconds = 250;
  var velocity = 0.05;

  setInterval(function() {
    if(xCoord > -1){
      gl.vertexAttrib3f(a_Position, xCoord, 0.0, 0.0); // set vertex position
      gl.clearColor(0.35, 0.30, 0.9, 1.0); // choose canvas color
      gl.clear(gl.COLOR_BUFFER_BIT); // clear canvas to that color
      gl.drawArrays(gl.POINTS, 0, 1); // draw a vertex
      xCoord = xCoord - velocity;
    }
    else{
      xCoord = 1.0;
    }
  }, milliseconds);
}
