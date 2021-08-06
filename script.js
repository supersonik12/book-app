var bookTitles = ["Mistborn", "The Fellowship of the Ring", "The Martian", "Guards, Guards", "Warcross","The Disappearing Spoon", "The Lightning Thief", "What If?: Serious Scientific Answers to Absurd Hypothetical Questions", "Cinder","Invictus"];
var bookAuthors = ["Brandon Sanderson","J.R.R. Tolkein","Andy Weir","Terry Pratchett","Marie Lu","Sam Kean","Rick Riordan","Randall Munroe","Marissa Meyer","Ryan Graudin"];
var bookGenres = ["Fantasy", "Fantasy", "Sci-Fi", "Fantasy","Sci-Fi","Nonfiction", "Fantasy", "Nonfiction","Sci-Fi","Sci-Fi"];
var bookLengths = ["Long", "Long", "Short", "Short", "Short", "Long", "Short","Short","Long","Long"];
var bookSeries = ["Series", "Series", "Standalone", "Series","Series", "Standalone", "Series", "Standalone", "Series","Standalone"];
var lengthChoice = "";
var seriesChoice = "";
next =  bookTitles.length;


//Gets books from localStorage
getFromStorage()

//Have to run at the start so the dropdown will load
addOptions()

function exampleFunction() {
  document.getElementById("pageTitle").style.color = "blue";
  /*alert(bookTitles);
  alert(bookAuthors);
  alert(bookGenres);
  alert(bookLengths);
  alert(bookSeries);*/
}

//Adds options to dropdown menu from bookGenres list
function addOptions() {
  var added = [];
  document.getElementById("genreDropdown").options.length=0;
  document.getElementById("genreDropdown2").options.length=0;

  for(var i=0; i<bookGenres.length; i++) {
    var currentGenre = bookGenres[i];
    var inList = added.includes(currentGenre);

    if (!inList) {

      newOption("genreDropdown",currentGenre);
      newOption("genreDropdown2", currentGenre);
      added.push(currentGenre);
    }
  }
  newOption("genreDropdown2","Other");  

}

// function for adding a new option to a dropdown (only used in the addOptions function) 
// so I don't have to write the same code three times
function newOption(dropdown, content) {
  var option = document.createElement("option");
  option.textContent = content;
  option.value = content;
  document.getElementById(dropdown).add(option);
}


//Updates the recommendations screen 
//(for tbr list screen use displayAll)
function updateScreen() {
  var genreChoice = document.getElementById("genreDropdown").value;
  document.getElementById("outputText").textContent = getBooks(genreChoice,lengthChoice,seriesChoice);
}

//Sets length (Short or Long)
function lengthButtonClick(choice){
  lengthChoice = choice;
  if (choice=="Short") {
    shortButton1.setAttribute("class","selected1");
    longButton1.setAttribute("class","button1");
  }
  if (choice=="Long") {
    longButton1.setAttribute("class","selected1");
    shortButton1.setAttribute("class","button1");
  }
  updateScreen();
}

//Sets if series or not (Series or Standalone)
function seriesButtonClick(choice){
seriesChoice =  choice;
  if (choice=="Series") {
    seriesButton1.setAttribute("class","selected2");
    aloneButton1.setAttribute("class","button2");
  }
  if (choice=="Standalone") {
    aloneButton1.setAttribute("class","selected2");
    seriesButton1.setAttribute("class","button2");
  }
  updateScreen();
}

//Finds the books that match genre length and series choices
function getBooks(genre, length, series){
  var yourBooks = [];
  for(var i=0; i<bookTitles.length; i++){
    if ((bookGenres[i]==genre) && (bookLengths[i]==length)&&(bookSeries[i]==series)){
      yourBooks.push(bookTitles[i] +" by "+ bookAuthors[i]);
    }
  }
  return yourBooks.join("\n");
}

//Adds the length for a new book on the add books page
function setLength(choice){
  bookLengths[next] = choice;
  if (choice=="Short") {
    shortButton2.setAttribute("class","selected1");
    longButton2.setAttribute("class","button1");
  }
  if (choice=="Long") {
    longButton2.setAttribute("class","selected1");
    shortButton2.setAttribute("class","button1");
  }
}

//Adds the series for a new book on the add books page
function setSeries(choice){
  bookSeries[next] = choice;
  if (choice=="Series") {
    seriesButton2.setAttribute("class","selected2");
    aloneButton2.setAttribute("class","button2");
  }
  if (choice=="Standalone") {
    aloneButton2.setAttribute("class","selected2");
    seriesButton2.setAttribute("class","button2");
  }
}

//Adds genre title and author to a new book on the add books page
//And adds 1 to next. Also saves new lists to localStorage
function addBook() {
  bookGenres[next] = document.getElementById("genreDropdown2").value;
  if (bookGenres[next] == "Other") {
    bookGenres[next] = document.getElementById("genreInput").value;
    addOptions();
  }
  bookTitles[next] = document.getElementById("titleInput").value;
  bookAuthors[next] = document.getElementById("authorInput").value;
  if (bookTitles[next]=="" || bookAuthors[next] =="" || bookGenres[next]=="") {
    alert("Error");
    deleteItem(next);
  }
  else {
    next++;
  }
  
  deleteItem(next);
  saveToStorage();
}

function newGenre() {
  var genre = document.getElementById("genreDropdown2").value
  if (genre == "Other") {
    document.getElementById("genreInput").style.display = "inline";
  }
  else {
    document.getElementById("genreInput").style.display = "none";
  
  }
}

//Used to delete a book from the tbr list using input and button
function deleteBook() {
  var index = parseInt(document.getElementById("deleteInput").value);
  if (Number.isInteger(index)&&index>0) {
    deleteItem(index-1)
  }
  else {
    alert("Error");
  }
  document.getElementById("deleteInput").value = "";
  next = bookTitles.length;
  displayAll();
  addOptions();
  saveToStorage();
}

// Deletes the items at an index from all arrays
// Then resets all the buttons and text boxes
function deleteItem(index) {
  bookLengths.splice(index,1);
  bookSeries.splice(index,1);
  bookTitles.splice(index,1);
  bookAuthors.splice(index,1);
  bookGenres.splice(index,1);

  document.getElementById("titleInput").value = "";
  document.getElementById("authorInput").value = "";

  genreDropdown2.selectedIndex = 0;
  document.getElementById("genreInput").style.display = "none";
  document.getElementById("genreInput").value = "";
  
  longButton2.setAttribute("class","button1");
  shortButton2.setAttribute("class","button1");
  seriesButton2.setAttribute("class","button2");
  aloneButton2.setAttribute("class","button2");
}

//Like updateScreen() but for the tbr page, shows all books
function displayAll() {
  var yourBooks = [];
  for(var i=0; i<bookTitles.length; i++) {
      yourBooks.push(i+1 + ". " + bookTitles[i] + " by " + bookAuthors[i] + " (" + bookGenres[i] + ", " + bookLengths[i] + ", " + bookSeries[i] + ")");
  }
  document.getElementById("tbrList").textContent = yourBooks.join("\n");
}

//Changes page by showing/hiding div elements
//Parameters are the div currently showing and the div you want to show
function changePage(from,to) {

  document.getElementById(from).style.display = "none";
  document.getElementById(to).style.display = "block";

  updateScreen();
  displayAll();
}

// saves all arrays to localStorage
function saveToStorage() {
  localStorage["bookTitles"] = JSON.stringify(bookTitles);
  localStorage["bookAuthors"] = JSON.stringify(bookAuthors);
  localStorage["bookGenres"] = JSON.stringify(bookGenres);
  localStorage["bookLengths"] = JSON.stringify(bookLengths);
  localStorage["bookSeries"] = JSON.stringify(bookSeries);
}

// gets arrays from localStorage if bookTitles is in localStorage 
function getFromStorage() {
  if ("bookTitles" in localStorage) {
    bookTitles = JSON.parse(localStorage["bookTitles"]);
    bookAuthors = JSON.parse(localStorage["bookAuthors"]);
    bookGenres = JSON.parse(localStorage["bookGenres"]);
    bookLengths = JSON.parse(localStorage["bookLengths"]);
    bookSeries = JSON.parse(localStorage["bookSeries"]);
  }
}
