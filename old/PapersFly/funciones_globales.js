
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if(UI.context) UI.context.resizeCanvas(windowWidth, windowHeight);
  UMI.setup();
  
}

  



function update_all(){

}




function draw_all(){

}

function destroy_all(){

}


function infinityCheck(value){
  return value == Infinity || value == -Infinity;
}