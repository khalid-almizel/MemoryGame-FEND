/*
 * Create a list that holds all of your cards
 */
const cards2shuffle = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-bicycle', 'fa fa-leaf', 'fa fa-bomb'];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */ 
window.addEventListener("load", setupCards());

function setupCards() {
	var cardList;
	var listFirst = document.getElementsByClassName('card');
	for (var mct = 0; mct < 2; mct++) {
		cardList = shuffle(cards2shuffle);
		for (var cct = 0; cct < 8; cct++) {
			listFirst[cct + mct * 8].innerHTML = "<i class='" + cardList[cct] + "'></i>";
		}
	}
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
var firstCard,matchCard;
var flag = false;
var startTime , timer=0;

var openCards = document.getElementsByClassName("card open show");
var cardArr;
cardArr = document.getElementsByTagName("li");
for (var ct = 0; ct < cardArr.length; ct++) {
	cardArr[ct].addEventListener("click", clickCard);
}
var rep = document.getElementsByClassName("fa fa-repeat");
rep[0].addEventListener("click", newGame);
var clbtn = document.getElementById("closebtn");

function popUpP() {
	if (event.target == document.getElementById("popup")) document.getElementById("popup").style.display = "none";
}

function popUpClose() {
	document.getElementById("popup").style.display = "none";
}

function newGame() {
    // window.clearInterval(timer);
	//  flag = false;
	// window.location.reload();
	window.location.reload();
}

function clickCard() {
	if (!flag) {
		flag = true;
        startTime = new Date();
		timer = window.setInterval(startTimer, 10);
	}
	checkMatch(this);
}

function checkMatch(mCard) {
    var temporary;
    matchCard = mCard;
	switch (openCards.length % 2) {
		case 1:
			if (firstCard.getElementsByTagName('i')[0].className == matchCard.getElementsByTagName('i')[0].className) {
				firstCard.className = 'card open show';
				matchCard.className = 'card open show';
				checkEndGame();
			} else {
                matchCard.className = 'card open show';
                temporary = setTimeout(Close,200);
                
			}
			break;
		case 0:
			matchCard.className = "card open show";
			firstCard = matchCard;
			break;
	}
}

function Close()
{
        firstCard.className = 'card';
		matchCard.className = 'card';
        moveUp();
}


function moveUp() {
	var MoveOut = parseInt(document.getElementsByClassName("moves")[0].innerHTML);
	if (MoveOut >= 0) document.getElementsByClassName("moves")[0].innerHTML = MoveOut + 1;
	if (MoveOut > 10) document.getElementsByClassName("fa fa-star")[0].style.display = 'none';
	if (MoveOut > 20) document.getElementsByClassName("fa fa-star")[1].style.display = 'none';
	
}


function startTimer() {
	var Timer = new Date();
	document.getElementById('timer').innerHTML = Math.abs(Timer.getMinutes() - startTime.getMinutes()) + " mins:" + Math.abs(Timer.getSeconds() - startTime.getSeconds()) +" secs";
}


function checkEndGame() {
	var pop;
   
	if (openCards.length == 16) {
         window.clearInterval(timer);
		pop = "You Won in " + document.getElementById("timer").innerHTML + ", in " + document.getElementsByClassName("moves")[0].innerHTML + " moves. rating: "
		for (var st = 0; st < 3; st++) {
			if (document.getElementsByClassName('fa-star')[st].style.display != "none") pop += "<i class='fa fa-star'></i>"
		}
		pop += "<p> Another Game? " + "<button id='yesbtn' onClick='javascript:newGame();'>Yes</button>";
		document.getElementById("popupmsg").innerHTML = pop;
		document.getElementById("popup").style.display = "block";
		document.getElementById("modcont").style.display = "block";
		
	}
}
