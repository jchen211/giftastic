$(document).ready(function() {

var gameArr = ['Final Fantasy VII', 'Legend of Zelda', 'Pokémon: Yellow', 'Chrono Trigger', 'Mario Kart'];

function getGifs () {


    var game = $(this).attr('data-game');

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    game + "&api_key=dc6zaTOxFJmzC&limit=6";

    $.ajax({
      url: queryURL,
      method: "GET"
    })

        .then(function(gg) {
            var results = gg.data;
            for (var i = 0; i < 6; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var rating = results[i].rating;

                    var gifDiv = $("<div class='gifGames'>");

                    var p = $('<p>').text('rating: ' + rating);

                    var gameImg = $('<img>');

                    gameImg.addClass('gif-imgs');

                    gameImg.attr('src', results[i].images.fixed_height_still.url);
                    gameImg.attr('data-state', 'still');
                    gameImg.attr('data-still', results[i].images.fixed_height_still.url);
                    gameImg.attr('data-animate', results[i].images.fixed_height.url);

                    gifDiv.append(p);
                    gifDiv.append(gameImg);

                    $('#images').prepend(gifDiv);
                }
            }
                    
            $('.gif-imgs').on("click", function() {
                var state = $(this).attr('data-state');

                if (state === 'still') {
                     $(this).attr('src', $(this).attr('data-animate'));
                     $(this).attr('data-state', 'animate');

                } else {
                     $(this).attr('src', $(this).attr('data-still'));
                     $(this).attr("data-state", 'still');
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

$("#add-game").on('click', function(e) {
    e.preventDefault();

    var games = $('#game-input').val().trim();
    gameArr.push(games);

    generateBtn();

});
    
$(document).on('click', '.game-btn', getGifs);
 
generateBtn();

});

