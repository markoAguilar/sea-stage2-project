/****
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * -Snap Inc.
 ****/

/****
 * This is an array of objects
 * Each object is a video game and its respective data
 ****/
let videoGames = [];

/*calls the readCsv() function when the page is first loaded*/
document.addEventListener("DOMContentLoaded", readCsv);

/****
 * Function will use fetch() to read in data from local json file to initially
 * populate the videoGames array.
 * Data will then be read into our data structure which will be an
 * array of objects. Each object being a video game.
 * Data is from https://www.kaggle.com/datasets/jummyegg/rawg-game-dataset?resource=download
 ****/
async function readCsv() {
  const file = "game_info.json";
  const promise = await fetch(file);
  const data = await promise.json();
  //console.log("Data:", data);
  //console.log("Data.name", data[0].name);

  //forEach loop to push video game object
  //into videoGames array
  data.forEach((videogame) => {
    videoGames.push(videogame);
  });

  //Call showCards() function to display the data that was saved
  //into our videoGames data structure variable
  showCards();
}

/****
 * Function clears the HTML element with the id card-container and adds
 * cards to the page to display the data in the videoGame array
 * @param {}: no parameters
 ****/
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  videoGames.forEach((videoGame) => {
    let title = videoGame.name;
    let image = "images/placeholder.png";
    //the value at the videoGame.updated key, is a string with both a date and a
    //time that are delimitted by a T character
    let updated = videoGame.updated.split("T")[0];
    let released = videoGame.released;
    let platforms = videoGame.platforms.split("||");
    let genres = videoGame.genres.split("||");

    //make a clone of the templateCard
    const nextCard = templateCard.cloneNode(true);

    // edit cloned card with the contents from data structure
    editCardContent(
      nextCard,
      title,
      image,
      updated,
      released,
      platforms,
      genres,
    );

    // add the edited clone to the cards container
    cardContainer.appendChild(nextCard);
  });
}

/****
 * Function will pop() the last videoGame object in the array.
 * The videoGame cards in the array will then be redisplayed
 * to show the changes
 ****/
function removeLastCard() {
  videoGames.pop(); // Remove last item in videoGames array
  showCards(); // Call showCards again to refresh
}

/****
 * Went from working on a csv file to working on a json file
 * in preparation for possible work with api's.
 * Below was some code for the former attempt.
 ****/
/*
 //data was text, headersline an array of length 1 with the value at
 //its only index being the first line of string extracted from data
 
 const headersline = data.split("\n").slice(0, 1); //.slice(start, end): first line only
 //make array of individual headers
 const heads = headersline[0].split(",")

 //Rows
  const rows = data.split("\n").slice(1); //slice(1): start from index 1, skips the headers

  //for each element in the rows array
  rows.forEach((element) => {
    const row = element.split(",");
  });

  //Cols... */

/****
 * Function will update the cloned HTML container element according to its
 * cloned children and the data read from our data structure,
 ****
 * @card {html element} : a card html element including its children from index.html
 * @newTitle {string} : the title of the video game
 * @newImageURL {string} : url location for video game image. current
 * location is in local folder images/
 * @updated {string} : the date the video game was last updated
 * @released {string} : the date the video game was released
 * @platforms {array} : each platform the video game is compatible with
 * @genres {array} : the genres the video game belongs to
 ****/
function editCardContent(
  card,
  newTitle,
  newImageURL,
  updated,
  released,
  platforms,
  genres,
) {
  card.style.display = "block";

  //set the content of the card parameter to the values
  //of the other parameters
  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newTitle;

  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newTitle + " Cover";

  const cardTitle = card.querySelector("li:nth-of-type(1)");
  cardTitle.textContent += " " + newTitle;

  const cardUpdated = card.querySelector("li:nth-of-type(2)");
  cardUpdated.textContent += " " + updated;

  const cardReleased = card.querySelector("li:nth-of-type(3)");
  cardReleased.textContent += " " + released;

  const cardPlatforms = card.querySelector("li:nth-of-type(4)");
  //forEach loop to add each platform in the platforms array with commas
  //index i used for proper placement of comma in text to be appended
  let i = 0;
  platforms.forEach((platform) => {
    if (i == 0) {
      cardPlatforms.textContent += " " + platform;
      i++;
    } else {
      cardPlatforms.textContent += ", " + platform;
    }
    i++;
  });

  const cardGenre = card.querySelector("li:nth-of-type(5)");
  let j = 0;
  genres.forEach((genre) => {
    if (genre == "" || genre == " ") {
      cardGenre.textContent += " N/A";
      j++;
    } else if (j == 0) {
      cardGenre.textContent += " " + genre;
      j++;
    } else {
      cardGenre.textContent += ", " + genre;
    }
    j++;
  });
}

/****
 * Function will trigger when pressing the "Add Game" button in index.html
 * Function will clear the html element with id "card-container" of all other
 * HTML elements. Function will then create a fieldset and appropriate elements
 * to receive user input for the new game to add to our data structure.
 ****/
function addGame() {
  //first we need to empty the card-container to display our input form instead
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  //create fieldset and all its elements and append them to the cardContainer
  const field = document.createElement("fieldset");
  field.setAttribute("id", "newGameData");

  const legend = document.createElement("legend");
  legend.innerText = "Enter Game Details";
  field.appendChild(legend);

  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("id", "newTitle");
  titleInput.setAttribute("placeholder", "Title");
  titleInput.setAttribute("max", "20");
  titleInput.setAttribute("maxlength", "40");
  field.appendChild(titleInput);
  cardContainer.innerHTML += "<br>";
  cardContainer.innerHTML += "<br>";

  const updatedInput = document.createElement("input");
  updatedInput.setAttribute("type", "text");
  updatedInput.setAttribute("id", "newUpdated");
  updatedInput.setAttribute("placeholder", "Updated Date: mm/dd/yy");
  updatedInput.setAttribute("max", "20");
  updatedInput.setAttribute("maxlength", "40");
  field.appendChild(updatedInput);
  cardContainer.innerHTML += "<br>";
  cardContainer.innerHTML += "<br>";

  const releasedInput = document.createElement("input");
  releasedInput.setAttribute("type", "text");
  releasedInput.setAttribute("id", "newReleased");
  releasedInput.setAttribute("placeholder", "Release Date: mm/dd/yy");
  releasedInput.setAttribute("max", "20");
  releasedInput.setAttribute("maxlength", "40");
  field.appendChild(releasedInput);

  const platformInput = document.createElement("input");
  platformInput.setAttribute("type", "text");
  platformInput.setAttribute("id", "newPlatform");
  platformInput.setAttribute("placeholder", "Platform");
  platformInput.setAttribute("max", "20");
  platformInput.setAttribute("maxlength", "40");
  field.appendChild(platformInput);
  cardContainer.innerHTML += "<br>";
  cardContainer.innerHTML += "<br>";

  const genreInput = document.createElement("input");
  genreInput.setAttribute("type", "text");
  genreInput.setAttribute("id", "newGenre");
  genreInput.setAttribute("placeholder", "Genre");
  genreInput.setAttribute("max", "20");
  genreInput.setAttribute("maxlength", "40");
  field.appendChild(genreInput);
  cardContainer.innerHTML += "<br>";
  cardContainer.innerHTML += "<br>";

  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("onclick", "pushGame()");
  submitBtn.innerText = "Add Game";
  field.appendChild(submitBtn);

  cardContainer.appendChild(field);
}

/****
 * Function will trigger when user presses the Add Game button in the displayed
 * fieldset. Function adds the new game with the user input to the videoGames
 * array. Function will then call showCards() to display the changes that were
 * made.
 ****/
function pushGame() {
  //needs to get data from user input for new game to add
  const newTitle = document.getElementById("newTitle").value;
  const newUpdated = document.getElementById("newUpdated").value;
  const newReleased = document.getElementById("newReleased").value;
  const newPlatforms = document.getElementById("newPlatform").value;
  const newGenre = document.getElementById("newGenre").value;
  //console.log("NEW:\n", newTitle, newReleased, newPlatform, newGenre);

  //push the new game to the videoGames array
  videoGames.push({
    name: newTitle,
    updated: newUpdated,
    released: newReleased,
    platforms: newPlatforms,
    genres: newGenre,
  });

  //show the new game in the videoGames array
  showCards();
}
