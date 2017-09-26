function init(url, callback) {
       var xhttp;
        // check if this is old-school IE or not
       if (window.XMLHttpRequest) {
           xhttp = new XMLHttpRequest();
           /*
       } else {
         // code for IE6, IE5
         xhttp = new ActiveXObject("Microsoft.XMLHTTP");*/
       }
       // Add the event listener / callback
       xhttp.onreadystatechange = function() {
         if (xhttp.readyState == 4){ // Check if the request went thru
           if(xhttp.status != 200) { // Check if the request is valid
             // Whoa what happened?????
             console.log("loadFileAsync Error: " + xhttp.statusText);
           }
          // This will only get called if the state == 4 and the status is "OK" (200)
           callback(xhttp.responseText);
         }
       };

xhttp.open("GET", url, true);
xhttp.send();
}

function main(){
  //console.log("hi myaaaaaaaannnn :3");
  init("data.txt", function(data) {
    alert(data)
  });
}
