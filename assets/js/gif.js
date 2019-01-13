$(document).ready(function() {

$('button').on("click", function() {

    var game = $(this).attr('data-game');

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    game + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })

        .then(function(g) {
            var results = g.data;

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var rating = results[i].rating;

                    var gifDiv = $('<div>');

                    var p = $('<p>').text('Rating: ' + rating);

                    var gameImg = $('<img>');

                    gameImg.attr('src', results[i].images.fixed_height.url);

                    gifDiv.append(p);
                    gifDiv.append(gameImg);

                    $('#images').prepend(gifDiv);


                }

            }
        });
});
});