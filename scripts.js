/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 */

// This is an array of objects (Each object is a Video Game)
// Each object is a video game and its respective data
let videoGames = [];

/****
 * Function will use fetch() to read in data from exterior json file.
 * Data will then be read into our data structure which will be an
 * array of objects. Each object being a video game.
 */
async function readCsv() {
  // data from https://www.kaggle.com/datasets/jummyegg/rawg-game-dataset?resource=download
  const file = "game_info.json";
  // data from https://www.kaggle.com/datasets/jummyegg/rawg-game-dataset?resource=download
  const promise = await fetch(file);
  const data = await promise.json();
  //console.log("Data:", data);
  //console.log("Data.name", data[0].name);

  /*  
  for (let i = 0; i < data.length; i++) {
    //console.log("Pushing: ", data[i].name);
    videoGames.push(data[i].name);
  }*/
  //use forEach loop to push video game object
  data.forEach((videogame) => {
    videoGames.push(videogame);
  });

  showCards();
  /****
   *  Went from working on a csv file to working on a json file
   *  in preparation for working with api's. Below is the code for the former
   ****/
  /*
    //data was text, headersline is now an array of length 1 with the value at
   //its only index being the first line of string extracted from data
   const headersline = data.split("\n").slice(0, 1); //.slice(start, end): first line element only
   console.log("Headers: ", headersline);
   */

  /*make array of individual headers
  //const heads = headersline[0].split(",");

  //console.log("Heads:", heads, "Size: ", heads.length);
    for (let h = 0; h < heads.length; h++) {
    console.log("header: ", heads[h]);
  }

  //
  //const rows = data.split("\n").slice(1); //slice(1): start from index 1, skips the headers
  //console.log("Rows size: ", rows.length);

  // for each element in the rows array
  //rows.forEach((element) => {
  //  const row = element.split(",");
  //  console.log("Row: ", row);
  //});
  //////
*/
}

/* This function adds cards to the page to display the data in the array
 * @param {}: no parameters
 * @return
 */
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
    // add the clone to the cards container
    cardContainer.appendChild(nextCard);
  });
  /*
  for (let i = 0; i < videoGames.length; i++) {
    let title = videoGames[i].name;
  }*/
}

/****
 * Function will update the cloned HTML container element according to its
 * cloned children and the data read from our data structure,
 ****
 * @param {element} -card: a card element including its children from index.html
 * @param {string} -newTitle: the title of the video game
 * @param {string} -newImageURL: url location for video game image. current
 * location is in local folder images/
 * @param {string} -updated: the date the video game was last updated
 * @param {released} -released: the date the video game was released
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

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newTitle;

  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newTitle + " Cover";

  const cardTitle = card.querySelector("li:nth-of-type(1)");
  cardTitle.textContent += newTitle;

  const cardUpdated = card.querySelector("li:nth-of-type(2)");
  cardUpdated.textContent += updated;

  const cardReleased = card.querySelector("li:nth-of-type(3)");
  cardReleased.textContent += released;

  const cardPlatforms = card.querySelector("li:nth-of-type(4)");
  //index i used for proper placement of comma in text to add
  let i = 0;
  platforms.forEach((platform) => {
    if (i == 0) {
      cardPlatforms.textContent += platform;
    } else if (platform == "") {
      cardPlatforms.textContent += "N/A";
    } else {
      cardPlatforms.textContent += ", " + platform;
    }
    i++;
  });

  const cardGenre = card.querySelector("li:nth-of-type(5)");
  let j = 0;
  genres.forEach((genre) => {
    if (j == 0) {
      cardGenre.textContent += genre;
    } else {
      cardGenre.textContent += genre;
    }
    j++;
  });
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", readCsv);
//document.addEventListener("DOMContentLoaded", showCards);

function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!",
  );
}

function removeLastCard() {
  videoGames.pop(); // Remove last item in videoGames array
  showCards(); // Call showCards again to refresh
}
