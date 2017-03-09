
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');




    $wikiElem.text("");
    $nytElem.text("");;

    var street = $("#street").val();
    var city = $("#city").val();
    var loc = street+','+city;
    var img_res ='https://maps.googleapis.com/maps/api/streetview?size=800x400&location='+loc+'&key=AIzaSyAHkLrRP3yw9yYKIPoYpdqldaX3kkR-zic';
    console.log(loc);
    $body.append('<img src="'+img_res+'" class="bgimg">');

    var url ="https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?'+ $.param({
        'api-key':"9a5045a2daab4e1b814473e11d8ff204",
        'q':city
    });


     $.getJSON(url,function(data){

       articles =data.response.docs;
       for(var i=0;i<articles.length;i++)
       {
         var article = articles[i];
         $nytElem.append('<li class="article">'+'<a href="'+
         article.web_url+'">'+article.headline.main+'</a>'+
         '<p>'+article.snippet+'</p>'+ '</li>');
       }
     }).fail(function(e){$nytElem.text("NEW YORK TIME CANNOT BE LOADED");});


     var url_wiki ="https://en.wikipedia.org/w/api.php";
     url_wiki += '?action=opensearch&search='+city+'&format=json';
      $.ajax({
        url: url_wiki,
        method:'GET',
        dataType:'jsonp',
        headers: { 'Api-User-Agent': 'Example/1.0' },
        success:function(data)
        {
             var i = data.length-1;
             console.log(data[i][0]);
             $wikiElem.append('<li class="article"> <a href="'+data[i][0]+'">'+data[0]+'</a></li>');
        }
      }).done(function(result){console.log(result);}).fail(function(err){throw err});

    return false;
};

$('#form-container').submit(loadData);
