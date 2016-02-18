/**
 * @author Mike Dolbow
 * Script for geojson.html
 */

var map;
var mapOptions = {
		center: [42.363,-83.093],
		zoom:10,
		maxBounds:[
			[42.1,-83,40],
			[43.0,-82.93]
			]
	};
var geojsonQueryURL = 'https://services2.arcgis.com/HsXtOCMp1Nis1Ogr/arcgis/rest/services/MyMapService/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&geohash=&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Meter&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson'

function initgeojsonmap() {
		map = L.map('map', mapOptions);

		var MapQuestOpen_OSM = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
			attribution: 'Tiles Courtesy of <a href="http://polymaps.org">PolyMaps<a>, <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
			subdomains: '1234'
		});
		map.addLayer(MapQuestOpen_OSM);
		
		var geojsonLayer = new L.GeoJSON.AJAX(geojsonQueryURL, {onEachFeature:popUp});
		geojsonLayer.addTo(map);
}

  function popUp(feature, layer) {
    layer.bindPopup(feature.properties.NAME);
  }