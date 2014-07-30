(function($) {
	var form = document.getElementsByTagName('form')[0],
		searchField = form.search,
		TWITTER_API = 'http://api.twitter.com/1/search/tweets.json?';

	form.onsubmit = function(e) {
		searchTwitter(searchField.value);
		return false;
	};

    var timer;
//
	$('#text').on('keyup', function() {
    	clearTimeout(timer);

		timer = setTimeout(function() {
			searchTwitter(searchField.value);
		}, 300);
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
				//console.log(data);
				//console.log('ok');
				for (var i in data.items) {
					console.log(data.items[0].author);
					console.log(data.items[0].title);
					//console.log(data.items[0].media.m);
				}

				$("#mydiv img").attr("src", data.items[0].media.m);
			},
			error: function(data) {
				alert(JSON.stringify(data));
			}
		});
	}

})(jQuery);