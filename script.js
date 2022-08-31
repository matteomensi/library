var cc=0;
src="http://www.openlayers.org/api/OpenLayers.js";
let url = 'https://www.dati.lombardia.it/resource/3syc-54zf.json';

//var Mappa = new OpenLayers.Map("DivMappa");
map = new OpenLayers.Map("basicMap");
function Displaymap(){
  var counter=1;
 // Mappa.addLayer(new OpenLayers.Layer.OSM());
cc++;
let request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'text';
request.send();
// we can attach the event with passive option
window.addEventListener('wheelListener', function (event) {
    event.preventDefault();
}, {
    passive: false
});
// Usa i risultati del mio detect. 
// passivo applicato se supportato, la cattura sarà falsa in entrambi i casi. 
var checkBox=new Array(12);

request.onload = function() {

console.log(cc);
//checkbox get elements  
   checkBox[0] = document.getElementById("BG");
   checkBox[1] = document.getElementById("LC");
   checkBox[2] = document.getElementById("MN");
   checkBox[3] = document.getElementById("MB");
   checkBox[4] = document.getElementById("MI");
   checkBox[5] = document.getElementById("LO");
   checkBox[6] = document.getElementById("BS");
   checkBox[7] = document.getElementById("CO");
   checkBox[8] = document.getElementById("CR");
   checkBox[9] = document.getElementById("PV");
   checkBox[10] = document.getElementById("VA");
   checkBox[11] = document.getElementById("SO");

   var x;
   var y;



      var z=new Array(count);
      var w=new Array(count);
      console.log(count);
      //convert it to an object
      var supportsPassive = false;
      x = request.response;
      y = JSON.parse(x);            
    var count = Object.keys(y).length;
    var zoom=14;
 for(j=0;j<count;j++)
  {  
    for(i=0;i<12;i++)
    {
    if(checkBox[i].checked)
    {
      var h=checkBox[i].value;
      
      if(y[j].provincia_sede==checkBox[i].value)
      {
        w[j]=y[j].wgs84_x;
        z[j]=y[j].wgs84_y;
        let myString2 = JSON.stringify(w[j]);
        let myString = JSON.stringify(z[j]);
        console.log("ok");
if(w[j]<13)
{   
 var vectorLayer = new OpenLayers.Layer.Vector("Overlay");  

  var mapnik         = new OpenLayers.Layer.OSM();
  var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
  var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
  var position       = new OpenLayers.LonLat(w[j],z[j]).transform( fromProjection, toProjection);
  var zoom           = 15; 
  /*
  var layermarkers = new OpenLayers.Layer.Markers( "Markers" );
  map.addLayer(vectorLayer);
  layermarkers.addMarker(new OpenLayers.Marker(position));
*/

    if(cc>0)
    {    
      
      //map.removeLayer(markers);
      

      if(counter>0)
      {
        document.getElementById("basicMap").innerHTML=""; 
        map = new OpenLayers.Map("basicMap");
        counter = 0;
        console.log(counter);    
        var vectorLayer = new OpenLayers.Layer.Vector("Overlay");  
        var mapnik = new OpenLayers.Layer.OSM();
        var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var position = new OpenLayers.LonLat(w[j],z[j]).transform( fromProjection, toProjection);
        var zoom = 15; 
      }

      //var Mappa = new OpenLayers.Map("DivMappa");
      //Mappa.addLayer(new OpenLayers.Layer.OSM());
    }
    epsg4326 =  new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
    projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)  
    //var lonLat = new OpenLayers.LonLat( w[j] ,z[j] ).transform(epsg4326, projectTo); 
/*
var lonLat = new OpenLayers.LonLat( w[i] ,z[i] )
          .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            Mappa.getProjectionObject() // to Spherical Mercator Projection
          );*/
        
        
        //  Mappa.setCenter (lonLat, zoom);
          var markers = new OpenLayers.Layer.Markers( "Markers" );
          map.addLayer(markers);
      
      // Aggiungo al layer dei marker un marker (utilizzando l'oggetto lonLat per le coordinate)
          markers.addMarker(new OpenLayers.Marker(position)); 

      //vectorLayer.addFeatures(feature);
      map.addLayer(mapnik);
      map.setCenter(position, zoom );


      // Imposto le coordinate di lonLat come centro della mappa di partenza
     // Mappa.setCenter (lonLat, zoom); 
    }    
//  }
}
      }
    }
  }
//if(i==2){
  }
}
