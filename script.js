(function($) {
	var form = document.getElementsByTagName('form')[0],
		searchField = form.search,
		TWITTER_API = 'http://api.twitter.com/1/search/tweets.json?';

	form.onsubmit = function(e) {
		searchTwitter(searchField.value);
		return false;
	};

    var timer;

	$('#text').on('keyup', function() {
    	clearTimeout(timer);

		timer = setTimeout(function() {
			searchTwitter(searchField.value);
		}, 500);
	});

	function searchTwitter(searchTerm) {
		$.ajax({
			url: "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
			type: 'get',
			dataType: 'json',
			data: {
				tags: searchTerm,
				tagmode: "any",
				format: "json"
			},

			success: function(data) {
				$('#mydiv').html(''); //clear all;
				for (var i in data.items) {
					console.log("Author is:" , data.items[i].author);
					console.log("Titile is:" , data.items[i].title);
					console.log("Description is:", data.items[i].description);
					console.log("Link is:", data.items[i].media.m);
					var image =  $('<img>').attr("src", data.items[i].media.m);
					//$("#mydiv img").attr("src", data.items[i].media.m);
					$("#mydiv").append(image);
				}
                  
				
			},
			error: function(data) {
				alert(JSON.stringify(data));
			}
		});
	}

})(jQuery);