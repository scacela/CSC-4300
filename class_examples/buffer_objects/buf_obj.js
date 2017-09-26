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

  gl.clearColor(0.35, 0.30, 0.9, 1.0); // choose canvas color
  gl.clear(gl.COLOR_BUFFER_BIT); // clear canvas to that color

  var n = initVertexBuffers(gl);
  gl.drawArrays(gl.TRIANGLES, 0, n); //n is the number of vertices to be drawn
  }

  function initVertexBuffers(gl){
    //Create a Typed array of vertices
    var vertices = new Float32Array([
        0.0, 0.5,   //Vertex 1
        -0.5, -0.5, //Vertex 2
        0.5, -0.5   //Vertex 3
    ]);

  //create the buffer object
  var buffer = gl.createBuffer();
  if(!buffer){
    console.log('Failed to create the buffer object');

    return -1;
  }

  //bind the buffer object to target. The keyword ARRAY_BUFFER
  //specifies that the buffer contains vertex data
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  //Now that we have the buffer, let's write some data into it. This writes the
  //data in the second parameter (vertices) into the ARRAY_BUFFER. The third
  //parameter can be STATIC_DRAW, STREAM_DRAW, or DYNAMIC_DRAW. STATIC_DRAW is
  //used if the buffer object data will be specified once and used many times
  //to draw shapes.
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Get the storage location of a_Position
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

  // Tell WebGL how to interpret the data
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  //Enable the assignment to a_Position
  gl.enableVertexAttribArray(a_Position);

  var numberOfVertices = Math.floor(vertices.length / 2);
  return numberOfVertices;
}
