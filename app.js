$(document).ready(function(){

	(function(){

		// Variables
		const $searchTxt = $("#searchTxt");
		const $results = $("#results");
		const $searchBtn = $("#searchBtn");
		const youtubeURL = "https://www.googleapis.com/youtube/v3/search";
		const $collection = $(".collection");


		//$results.fadeIn(3000);

		// Search button event listener
		$searchBtn.on("click", function(){
			
			let query = $searchTxt.val();

			//check if query len is more than 3 chars
			if (query.length > 3){
				// when the search button is clicked, 
				// take the search text box value and call the handleSearch()
				// passing in the query
				
				$results.fadeIn(5000);

				handleSearch(query);
			} else {
				$searchTxt.focus();
			}

		});

		function handleSearch(query){
			
			// jQuery GET request
			// hitting the Youtube URL 
			// sending the request obj with the query included

			$.get(youtubeURL, {'maxResults': '50',
				'part': 'snippet',
				'q': query,
				'type': '',
				key: 'AIzaSyCHHIMpvm5pbBW2f7oWomB4dLo0blXLXv8'
			}, 
			function(data){
	     	//call the handleData function 
	     	handleData(data);
     	}) // end of $.get

		}; // end of handleSearch()

		// JSON data passed in
		// Take the data and plug into HTML
		function handleData(data) {

			// clearing the items inside
			// when performing second search
			$results.html = "";

			// loop through all the data obj
			data.items.forEach((currentValue, index, array)=>{

				// find the 
				// [0].id.videoId
				// [0].snippet.title
				// [0].snippet.description
				// [0].snippet.thumbnails.medium.url				

				let vidID = currentValue.id.videoId;
				let channelId = currentValue.snippet.channelId;
				let title = currentValue.snippet.title;
				let creator = currentValue.snippet.channelTitle;
				let uploadDateTime = currentValue.snippet.publishedAt;
				//get only the date
				//ignore the time
				let uploadDateOnly = uploadDateTime.slice(0, uploadDateTime.indexOf("T"));
				let desc = currentValue.snippet.description;
				let imageURL = currentValue.snippet.thumbnails.medium.url;

				//call the generateHTML passing in the required info
				generateHTML(vidID, channelId, title, creator, uploadDateOnly, desc, imageURL)

			}) // end of for each

		}; // end of handleData()

		function generateHTML(vidID, channelId, title, creator, uploadDate, desc, imageUrl){

			let videoUrl = "https://www.youtube.com/watch?v=" + vidID;
			let creatorUrl = "https://www.youtube.com/channel/" + channelId;
			let HTML_TEMPLATE = '<li class="collection-item">' +
						'<a href="' +
						videoUrl +
						'">' +
						'<div class="image-container">' +
						'<img class="image" src="' +
						imageUrl +
						'" alt="">' +
						'</div>' +
						'</a>' +
						'<div class="video-info-container">' +
						'<ul class="video-info">' +
						'<li class="title"><a href="' +
						videoUrl +
						'">' + 
						title +
						'</a></li>' +
						'<li class="creator"><a href="' +
						creatorUrl + 
						'">' + 
						creator +
						'</a></li>' +
						'<li class="upload-date">' +
						uploadDate +
						'</li>' +
						'<li class="desc">' +
						desc +
						'</li>' +
						'</ul>' +
						'</div>' +
						'</li>';

		// add the built HTML template to the results div
		$results.append(HTML_TEMPLATE);

		} // end of generateHTML

		let $testBtn = $("#testBtn").on("click", function(){
			handleData(testData);
		})// end of test btn func

	})(); // end function

}); // end of doc ready