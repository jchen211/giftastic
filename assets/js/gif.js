$(document).ready(function() {

var gameArr = ['Final Fantasy VII', 'Legend of Zelda', 'Pokémon: Yellow', 'Chrono Trigger', 'Mario Kart'];

function getGifs () {

$('button').on("click", function() {

    var game = $(this).attr('data-game');

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    game + "&api_key=dc6zaTOxFJmzC&limit=6";

    $.ajax({
      url: queryURL,
      method: "GET"
    })

        .then(function(gg) {
            var results = gg.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var rating = results[i].rating;

                    var gifDiv = $("<div class='gifGames'>");

                    var p = $('<p>').text('Rating: ' + rating);

                    var gameImg = $('<img>');

                    gameImg.addClass('gif-imgs');

                    gameImg.attr('src', results[i].images.fixed_height.url);
                    gameImg.attr('data-still', results[i].images.fixed_height_still.url);
                    gameImg.attr('data-state', 'still');
                    gameImg.attr('data-animate', results[i].images.fixed_height.url);

                    gifDiv.append(p);
                    gifDiv.append(gameImg);

                    $('#images').prepend(gifDiv);
                    
                    $('.gif-imgs').on("click", function() {
                        var state = $(gameImg).attr("data-game");
                        if (state === "still") {
                          $(gameImg).attr("src", $(gameImg).attr("data-animate"));
                          $(gameImg).attr("data-state", "animate");
                        } else {
                          $(gameImg).attr("src", $(gameImg).attr("data-still"));
                          $(gameImg).attr("data-state", "still");
                        }
                      }); 
               
                }
            }
        });
    });

      
    }






function generateBtn () {
    $('#gameName').empty();

    for (var i = 0; i < gameArr.length; i++) {
        var g = $('<button>');
        g.addClass('game-btn');
        g.attr('data-game', gameArr[i]);
        g.text(gameArr[i]);
        $('#gameName').append(g);
    }
}

$("#add-game").on("click", function(e) {
    e.preventDefault();

    var games = $('#game-input').val().trim();
    gameArr.push(games);

    generateBtn();

    $('#game-form').reset();
});
    
$(document).on('click', '.game-btn', getGifs);
 
generateBtn();

});

