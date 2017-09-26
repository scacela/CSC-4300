var  VS_Source =
  `attribute vec4 a_Position;
   void main(){
     gl_Position = a_Position;
     gl_PointSize = 10.0;
   }`;

// lime-green vertex
 var FS_Source =
   `void main(){
    gl_FragColor = vec4(0.5, 0.9, 0, 1.0);
    }`;

function init() {
  //retrieve the canvas element
  var canvas = document.getElementById("target");
  if(!canvas){
    console.log("Failed to retrieve the <canvas> element");
    return false;
  }

var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
if(!gl){
    console.log("Failed to get the rendering contect for WebGL");
    return;
  }

//Initiliaze the shaders
 if(!initShaders(gl, VS_Source, FS_Source)){
   console.log('Failed to initialize shaders.');
   return;
 }

// Get the storage location of a_Position
var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
if (a_Position < 0) {
  console.log('Failed to get the storage location of a_Position');
  return;
}


// primary code involved in making the dot move
var xPlane = 1.0;
var milliseconds = 250;
var velocity = .05;

// a function within a function
setInterval(function(){
  if(xPlane > -1){
    gl.vertexAttrib3f(a_Position, xPlane, 0.0, 0.0); //set the vertex location
    gl.clearColor(0, 0, 0.35, 1.0); // dark blue canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
    xPlane = xPlane - velocity;
  }
  else {
    xPlane = 1.0;
  }
}, milliseconds);
}

/**
 * Create a program object and make current
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return true, if the program object was created and successfully made current
 */
function initShaders(gl, vshader, fshader) {
  var program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log('Failed to create program');
    return false;
  }

  gl.useProgram(program);
  gl.program = program;

  return true;
}

/**
 * Create the linked program object
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return created program object, or null if the creation has failed
 */
function createProgram(gl, vshader, fshader) {
  // Create shader object
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // Create a program object
  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  // Attach the shader objects
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // Link the program object
  gl.linkProgram(program);

  // Check the result of linking
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log('Failed to link program: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

/**
 * Create a shader object
 * @param gl GL context
 * @param type the type of the shader object to be created
 * @param source shader program (string)
 * @return created shader object, or null if the creation has failed.
 */
function loadShader(gl, type, source) {
  // Create shader object
  var shader = gl.createShader(type);
  if (shader == null) {
    console.log('unable to create shader');
    return null;
  }

  // Set the shader program
  gl.shaderSource(shader, source);

  // Compile the shader
  gl.compileShader(shader);

  // Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
