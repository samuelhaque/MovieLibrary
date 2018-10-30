
//  ---------------- Creat Global Variables ---------------!!!!!
      var movie;
      var giphyName;
      var alertMovie;
      var rating;
      var release;
      var plot;
      var poster;
      var favs = [];
      var sugs = [];
      var actors = [];
      var actorArr = [];
      var movieTitle;
      var counter=0;

//  ---------------- Inititial document ready ---------------!!!!!     

   $(document).ready(function() {

$("#item1").change(function(){
  users();
  renderButtons();
});

//  ---------------- This function handles events when search button is clicked ---------------!!!!!

      $("#submitId").on("click", function(event) {
          event.preventDefault();
          users();
          var error = $("#searchInput").val();
          if (error === "") {
            $("#error").css("display","block")
            $("#error").html("Please enter a Movie or TV show before pressing search button")
          } else {
            $("#error").css("display","none")
            counter = 0;
            submitClick();
            
          }
          // } else {
            // 
          // };
      });// ends submit
hideDiv();
//  ------------------------------ Functions Below -----------------------------!!!!!

 //  ---------------- Search movie function ---------------!!!!!

      function submitClick(){

        $(function(){ $("#searchForm").on("submit", function(e){
            search_function($("#searchInput").val());
            e.preventDefault(); // Prevents submitting in most browsers
            return false; // Prevents submitting in some other browsers
          });
        });

        event.preventDefault();
        giphyName = $("#searchInput").val();
        movie = $("#searchInput").val().trim();// This line grabs the input from the textbox
        favs.push(movie);
        sugs.push(movie);
        
        $("#favbtnDiv").css("display" , "block")
        displayMovieInfo();
        displayGifs();
        $("#searchInput").val("");

      }

//  ---------------- Function for displaying the movie info ---------------!!!!!
      function displayNearestCinema(movieTitle){
          document.getElementById("toaster").innerHTML = "";
            var flmID = null; 

            getFilmID(movieTitle);

            function getFilmID(str) {
              if (str.length == 0) { 
                  return;
              } else {
                  var xmlhttp = new XMLHttpRequest();
                  xmlhttp.onreadystatechange = function() {
                      if (this.readyState == 4 && this.status == 200){ 
                        flmID = this.responseText;
                        getNearestCinema(3);
                      }
                  };
                  xmlhttp.open("GET", "assets/php/getFilmID.php?t="+str, true);
                  xmlhttp.send();
              }
            }
            
            function getNearestCinema(nub) {
              if (nub.length == 0) { 
                  return;
              } else {
                  var xmlhttp = new XMLHttpRequest();
                  xmlhttp.onreadystatechange = function() {
                      if (this.readyState == 4 && this.status == 200) {
                          console.log(this.response);
                          var tempCinemas = JSON.parse(this.response);
                          console.log(tempCinemas);
                          for(var i = 0; i <3; i++){
                            filmsNearMe(flmID,tempCinemas[i]);
                          }
                      }
                  };
                  xmlhttp.open("GET", "assets/php/getNearestCinema.php?nub="+nub, true);
                  xmlhttp.send();
              }
            }
            
            function filmsNearMe(f,c) {
              if (f.length == 0 ||c.length == 0) { 
                  return;
              } else {
                  var xmlhttp = new XMLHttpRequest();
                  xmlhttp.onreadystatechange = function() {
                      if (this.readyState == 4 && this.status == 200) {
                         myDATA = JSON.parse(this.response);

                         var stbbe = "";
                         
                         console.log(myDATA);
  
                        stbbe += '<div id="wrapper2">';
                        stbbe += '<h2>'+myDATA.cinema.cinema_name+'</h2>';
                        stbbe += '<div class="row">';
                        stbbe += '<p>'+myDATA.films[0].showings.Standard.times[0].start_time+'</p>';
                        stbbe += '<p>'+myDATA.films[0].showings.Standard.times[1].start_time+'</p>';
                        stbbe += '<p>'+myDATA.films[0].showings.Standard.times[2].start_time+'</p>';
                        stbbe += '</div>';


                        document.getElementById("toaster").innerHTML += stbbe;
                      }
                  };
                  xmlhttp.open("GET", "assets/php/filmsNearMe.php?f="+""+f+"&c="+""+c , true);
                  xmlhttp.send();
              }
            }
      }



      function displayMovieInfo(){
        
        //  ---------------- Ajax call for Omdb ---------------!!!!!
          var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=full&apikey=40e9cece";

          $.ajax({
              url: queryURL,
              method: "GET"
          }).done(function(response) {
    
              $("#actorDiv").empty()
         
              var col = "col-xs-3 col-sm-3 col-md-3 col-lg-3"
              actors = response.Actors;
              actorArr = actors.split(",");
              for (var i = actorArr.length - 1; i >= 0; i--) {
                var res=actorArr[i].replace(/ /g, "_");
                var wikiURL= "https://en.wikipedia.org/wiki/"+res+"?index.php?action=render";
                $("#actorDiv").append("<div class='container-fluid actimg" + col +"'><a href = "+ wikiURL + " target = '_blank'>" + actorArr[i] + "</a></div>");
              };
              
              movieTitle = response.Title;
              rating = response.Rated;
              release = response.Released;
              plot = response.Plot;
              poster = response.Poster;
              
                var overview = JSON.stringify(response);

                //  ---------------- Dynamically write to Divs ---------------!!!!!
        
           $(".trailer").html("<h3>Rating: " + rating +"<br>Released: " + release +"<br>Plot: "
           + plot + "</h3>");

          $("#favbtnDiv").html("<button type='button' class='btn btn-info btn-sm' id = 'favbtn'>Add to Favorites</button>")
          $("#sugDiv").html("<button type='button' class='btn btn-info btn-sm' " +
             "id = 'sugbtn'>Add to Suggestions</button>");
            
          $(".poster").html("<img src= " + poster +">");

          $("#htmlTitle").html("<h2>" + movieTitle + "</h2>");

          //  ---------------- Pull trailer playlist from YouTube ---------------!!!!!

          $("#playDiv").html("<iframe width='560' height='315' src='https://youtube.com/embed?listType=search&list=" +
           movie + "+trailer' frameborder='0' allowfullscreen></iframe>");


           displayNearestCinema(movieTitle);


            });// ends response function

        
        };// ends display movie function
      
  
function hideDiv(){
  document.getElementById("userSelection").style.display = "none";
}
                //  ---------------- Below is Giphy API ---------------!!!!!

      function displayGifs(){
        $("#giphyDiv").empty();

        
        var gifyName = [];
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphyName + "&api_key=dc6zaTOxFJmzC&limit=3&offset=" + counter;

          $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

             var results = response.data;

                for (var i = 0; i < results.length; i++) {
                  var gifDiv = $("<div class='item col-md-4'>");

                  gifyName[i] = giphyName;

                  var rating = results[i].rating;

                  var p = $("<p>").text("Rating: " + rating);

                  var gifyImage = $("<img>");
                  gifyImage.attr("class","gif")
                  gifyImage.attr("data-name", gifyName[i]);
                  gifyImage.attr("src", results[i].images.fixed_height_still.url);
                  gifDiv.prepend(gifyImage);
                  gifDiv.prepend(p);

                  $("#giphyDiv").append(gifDiv);
                  

                };
                counter=counter+3;
                console.log(counter)
        });
      };//end of displayGifs
                           
                  //  ---------------- Click functions below ---------------!!!!!

       //  ---------------- Suggestion movies click ---------------!!!!!

        $('body').on('click', '.sugMovie', function() {
          movie = $(this).text();
          giphyName = movie;
          counter = 0;
          displayGifs();
          displayMovieInfo();
        });//end of sug click function


       //  ---------------- Favorite Movies Click ---------------!!!!!
        $('body').on('click', '.favMovie', function() {
          movie = $(this).text();
          giphyName = movie;
          counter = 0;
          displayGifs();
          displayMovieInfo();
          $("#favbtnDiv").css("display" , "none")
        });//end of favorite click function

         
        //  ---------------- Pause Gif Function ---------------!!!!!
          $('body').on('click', '.gif', function() {
            var src = $(this).attr("src");
          if($(this).hasClass('playing')){
             //stop
             $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
             $(this).removeClass('playing');
          } else {
            //play
            $(this).addClass('playing');
            $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
          }
        });//end of pause

        //-------------------Shuffle Giphy----------------------!!!!
          $("#giphyButton").on("click", function(event) {
            displayGifs();
          });//end of shuffle

  });//document end
