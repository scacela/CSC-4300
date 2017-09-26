//var vol = 0.01;
var numTracks = 8;
//var count;
/*
function lowVolume() {
  for(count = 1; count <= numTracks; count++) {
    document.getElementById(count).volume = vol;
  }
}
*/
function countTracks() {
  document.getElementById(0).innerHTML = numTracks;
}
