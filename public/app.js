/**
 * Moves the map to display over CurrentGps
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function moveMapToCurrentGps(map){
  map.setCenter({lat:52.5159, lng:13.3777});
  map.setZoom(14);
}
