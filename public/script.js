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
				var obj = {
					author: data.items[0].author,
				 	title : data.items[0].title,
				    description: data.items[0].description,
				    url: data.items[0].media.m
				};				 
			 $.ajax({
					url: '/request',
					data: JSON.stringify(obj),
					type: 'POST',
				    success: function (data) {
						console.log('Success:');
					},
					error: function (xhr, status, error) {
						console.log('Error: ' + error.message);
					},
				});
					for (var i in data.items) {
					// console.log("Author is:" , data.items[i].author);
					// console.log("Titile is:" , data.items[i].title);
					// console.log("Description is:", data.items[i].description);
					// console.log("Link is:", data.items[i].media.m);
					var image =  $('<img>').attr("src", data.items[i].media.m);
					$("#mydiv").append(image);
				};
             },

			error: function(data) {
				alert("Error from script js");
			}
		});
	}

})(jQuery);