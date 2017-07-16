function getName(){
  getName.staticProperty = document.getElementById('player_name').value;
}

function displayName(){
  document.getElementById('player_name').innerHTML = getName.staticProperty;
}
 
