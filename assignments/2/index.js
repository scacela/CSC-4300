function canvasDemo() {
// retrieve the <canvas> element by id
  var canvas = document.getElementById("target");
  if(!canvas){
    console.log("Could not retrieve the <canvas> element");
    return false;
  }

// get the rendering context for 2D computer graphics
// from the canvas object in WebGL, assign to gl
var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

if(!gl){
  console.log("Unable to retrieve the rendering context for WebGl.");
  return;
}

// Initialize Vertex Shader source variable
var VS_Source = `
  attribute vec4 a_Position;
  void main(){
    gl_Position = a_Position;
    gl_PointSize = 35.0;
  }`;

// Initialize Fragment Shader source variable
// vec4(R, G, B, Alpha)
var FS_Source = `
  void main() {
    gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // blue
  }`;

// Pass the shader sources through the function that will
// initialize a shader program
var gl_shader_program = initShaderProgram(gl, VS_Source, FS_Source);
if(!gl_shader_program){
  console.log("Failed to initialize the shader program.");
  return;
}

// Retrieve the storage location of a_Position
var a_Position = gl.getAttribLocation(gl_shader_program, "a_Position");
// a_Position must be nonnegative
if (a_Position < 0) {
  console.log("Failed to retrieve the storage location of a_Position");
  return;
 }

/*
Pass vertex position to attribute variable
@param a_Position: storage location of a_Position
@param x: horizontal
@param y: vertical
@param z: depth. Won't change anything since we are in 2D
*/
gl.vertexAttrib3f(a_Position, 0.25, 0.5, 0);

// Color used for clearing the canvas
gl.clearColor(1.0, 0.25, 1.0, 1.0); // magenta

// Clear the canvas with color in clearColor
gl.clear(gl.COLOR_BUFFER_BIT);

/* Drawing instructions:
drawArrays(mode, first, count)
@param mode: what kind of primitives to render
@param first: starting index in enabled arrays
@param count: number of indices to be rendered
*/
gl.drawArrays(gl.POINTS, 0, 1);
} // closes canvasDemo

  /*
  initShaderProgram:
  1. Call compileFromSource for source variables
    a. Assign data from either source variable
       to a WebGL shader object of corresponding type
    b. Compile the VS or FS object
    c. return shader object
  2. Assign return values to variables
  3. Attach variables to shader program
  4. Link the variables together in program
  5. Return shader program
  */
  function initShaderProgram(gl, VS_Source, FS_Source) {

    // Store the compiled WebGL VS and FS into their respective variables
    var VS_compiled = compileFromSource(gl, gl.VERTEX_SHADER, VS_Source);
    var FS_compiled = compileFromSource(gl, gl.FRAGMENT_SHADER, FS_Source);

    // Initialize the shader program
    var shaderProgram = gl.createProgram();

    // Attach compiled WebGL VS and FS to the shader program
    gl.attachShader(shaderProgram, VS_compiled);
    gl.attachShader(shaderProgram, FS_compiled);

    /*
    linkProgram:
    Makes executables out of the attached compiled WebGL VS and FS,
    which are able to run on the programmable processors of the
    opposite shaders.
    (i.e. links the compiled WebGL VS to the compiled WebGL FS,
    which are attached to shaderProgram)
    */
    gl.linkProgram(shaderProgram);

    // Error message if could not link
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
      console.log("Failed to link the shaders.");
      // delete the program and return null
      gl.deleteProgram(shaderProgram);
      return null;
    }
      // otherwise use it and return it
      gl.useProgram(shaderProgram);
      return shaderProgram;
  }

  /*
  @param gl: our rendering context
  @param shaderType: VS or FS
  @param shaderSource: our source variables, VS_Source or FS_Source
  */
  function compileFromSource(gl, shaderType, shaderSource) {

    // Initialize a WebGL shader object to type VS or FS
    var WebGL_shader = gl.createShader(shaderType);

    // Pass VS_Source and FS_Source into WebGl by assigning their
    // data to WebGL shader objects
    gl.shaderSource(WebGL_shader, shaderSource);

    // Compile the WebGL shader object
    gl.compileShader(WebGL_shader);

    // Error message if could not compile
    if (!gl.getShaderParameter(WebGL_shader, gl.COMPILE_STATUS)) {
      console.log("Failed to compile a WebGL shader.");
      // delete WebGL shader object and return null
      gl.deleteShader(WebGL_shader);
      return null;
    }
      // otherwise return it
      return WebGL_shader;
  }
