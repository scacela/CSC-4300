var bp = {
runningAnimationId: -1, // ID used for cancelling the animation

// @param canvasId The ID of the canvas in index.html

getWebGLContext: function(canvasId){

  // retrieve the <canvas> element by ID from index.html
    var canvas = document.getElementById(canvasId);
    if(!canvas)
      console.log("Could not retrieve the <canvas> element");

  // get the rendering context for 2D computer graphics
  // from the canvas object in WebGL, assign to gl
  var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if(!gl){
    console.log("Unable to retrieve the rendering context for WebGl.");
    }
    return gl;
  },

/**
  * NOTE: This block of comments is from Professor Cloutier's boilerplate.js.
  *
  * Load a file asynchronously, this is done using the "old school" XMLHttpRequest
  * object. This is the way AJAX calls where originally written, the reason I am using
  * this here as opposed to something like jQuery.ajax is for simplicity. There is
  * no need to include a third-party library for this lesson.
  *
  * @param lessonId The ID representing the id of the lesson loading content (only pertinent when running within IDE, otherwise not used)
  * @param url A relative url for the resource to load
  * @param callback A function to be executed upon completion. The signature is as follows:
  *       @param responseText - The text retrieved from the server
  *       @param params - any parameters passed-through the function
  *       @param xhttp - the actual xmlhttp request object (check this for errors, etc.)
  */

asyncLoad: function(url, callback){
  var xhttp;
  if(window.XMLHttpRequest){
    xhttp = new XMLHttpRequest(); // initiates an AJAX request
  }

  //Code for IE6 and IE5
  else{
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // call callback within onreadystatechange function
  xhttp.onreadystatechange = function(){
    if(xhttp.readyState == 4){ // Check if the request went thru
      if(xhttp.status != 200){  // Check if the request is valid
        console.log("loadFileAsync Error: " + xhttp.statusText);
      }
      // This will only get called if the state == 4 and the status is "OK" (200)
      callback(xhttp.responseText);
    }
  };

  // get the AJAX (aka XHR) request for the url and send it
  xhttp.open("GET", url, true);
  xhttp.send();
},


loadShaderFiles: function(){
  // stop any animation that is running
  if(this.runningAnimationId > 0){
    cancelAnimationFrame(this.runningAnimationId);
  }
  // load file containing Vertex Shader Source asynchronously
  bp.asyncLoad("../../boilerplate/shader.vert", function(data){
    VS_Source = data;
    // ditto for Fragment Shader Source file
    bp.asyncLoad("../../boilerplate/shader.frag", function(data){
      FS_Source = data;
      if(run)
        run(); // run method from index.js
    });
  });
},


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
initShaderProgram: function(gl, VS_Source, FS_Source) {

  // Initialize the shader program
  var shaderProgram = gl.createProgram();

  // Store the compiled WebGL VS and FS into their respective variables
  var VS_compiled = bp.compileFromSource(gl, gl.VERTEX_SHADER, VS_Source);
  var FS_compiled = bp.compileFromSource(gl, gl.FRAGMENT_SHADER, FS_Source);

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
  else {
    // otherwise use it and return it
    gl.useProgram(shaderProgram);
    gl.program = shaderProgram;
  }

  return shaderProgram;
},

/*
@param gl: our rendering context
@param shaderType: VS or FS
@param shaderSource: our source variables, VS_Source or FS_Source
*/
compileFromSource: function(gl, shaderType, shaderSource) {

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

}
