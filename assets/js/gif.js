$(document).ready(function() {

var gameArr = ['Final Fantasy VII', 'The Legend of Zelda: Breath of the Wild', 'Pokémon: Yellow', 'Chrono Trigger'];

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
    event.preventDefault();

    var games = $('#game-input').val().trim();
    gameArr.push(games);

    generateBtn();
});

generateBtn();

// this on click function shows the gifs that are already pre-loaded
function getGifs () {

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

                    var gifDiv = $("<div class='gifGames'>");

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
    }

$(document).on("click", ".game-btn", getGifs);

});
