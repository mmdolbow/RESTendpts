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

		var basemapTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
				maxZoom: 17,
				type: 'map',
				ext: 'jpg',
				subdomains: '1234',
				attribution: 'Esri, HERE, DeLorme, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), swisstopo, MapmyIndia, © OpenStreetMap contributors, and the GIS User Community'
			});
		map.addLayer(basemapTileLayer);
		
		var geojsonLayer = new L.GeoJSON.AJAX(geojsonQueryURL, {onEachFeature:popUp});
		geojsonLayer.addTo(map);
}

  function popUp(feature, layer) {
    layer.bindPopup(feature.properties.NAME);
  }
