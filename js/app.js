/**
 * @author Mike Dolbow
 * An application support script for demonstrating capabilities of Esri REST Endpoints.
 */

/**
 * On Click function for btnQueryRandDemo.
 * Picks a letter of the alphabet at random, and fires a query against the Detailed Counties
 * layer in order to get many results, and display some details from the first result. (Might need to exclude "X", but "Z" works)
 */

function getRandomCounty() {
	//pick a random letter to start a query with, excluding X
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWYZ';
	var randomChar = chars[Math.round(Math.random() * (chars.length - 1))];
	var url1 = "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/4/query?outFields=NAME%2C+POP2007&returnGeometry=false&f=json&text="+randomChar;
	
	//Make an AJAX request against the Esri service to acquire counties that begin with the random letter
    $.ajax({
	    url: url1,
	    dataType: "jsonp",
	    cache: "false"
	})
 	.done(function( data ) {
		$("#emQueryRandURL").html('<a target=\"_blank\" href=\"'+url1+'\">Detailed Counties Starting with '+randomChar+'<\/a>');
		$("#emQueryNoCounties").html(data.features.length);
		$("#emQueryFirstCounty").html(data.features[0].attributes.NAME);
		$("#emQueryPop").html(data.features[0].attributes.POP2007);
	});

}
