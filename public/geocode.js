function continuousGeocode(){
  setTimeout(
    function(){
     document.getElementById('loc').textContent = 'hi! ';
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log('position', position);
           document.getElementById('loc').textContent = 'hi! ' + position.coords.latitude + ' ' + position.coords.longitude;
           continuousGeocode();
      }, function(err){
          document.getElementById('loc').textContent = 'err: ' + err;
          continuousGeocode();
      });
    }, 1000)
}

if (navigator && navigator.geolocation) {
  /* geolocation is available */
   continuousGeocode();
} else {
  /* geolocation IS NOT available */
           document.getElementById('loc').textContent = "NOOOOOOOOOO!";
}