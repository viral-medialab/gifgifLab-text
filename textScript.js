var happinessMID = '54a309ae1c61be23aba0da5c';
var sadnessMID = '54a309ae1c61be23aba0da60';
var searchMIDs = [ happinessMID, sadnessMID ];

var submit = function() {
	

	qnt.init('gifgif','54a309ac1c61be23aba0da3f', function(){});
	var text = document.getElementById('textArea').value;
	var params = 'apikey=779ce4f8848ad13d247e3489adc194266a292f5e&outputMode=json&text='+text;
	var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://access.alchemyapi.com/calls/text/TextGetTextSentiment?'+params, false );
    xmlHttp.send();

    var response = xmlHttp.responseText;
	var doc = JSON.parse(response).docSentiment;
	
	var originalScore = parseFloat(doc.score)  // Between -1 and 1
	var scaledScore = (1 + parseFloat(originalScore)) / 2;  // Between 0 and 1
	var sentimentType = doc.type;

	if (sentimentType !== 'neutral') 
		var searchValues = [ scaledScore, 1 - scaledScore ]
    else
    	var searchValues = [ 0.5, 0.5 ]

    skip = Math.floor(Math.random() * 100)


	qnt.getSearchResults(searchMIDs, searchValues, skip, 1, function(data){
		var textToGIFResultIndex = data.results[0]['index']
		var textToGIFResult = data.results[0]['content_data']['embedLink']
		document.getElementById('wrapper').style.backgroundImage = "url("+textToGIFResult+")";
	});


}