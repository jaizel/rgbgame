"use strict";

// PROPERTIES -------------------------------------------------------------------------------------------

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var expertButton = document.querySelector("#expert");

var colors = [];
var pickedColor = 0;

var gameMode = "hard";
var maxColor = 9;


// FUNCTIONS -------------------------------------------------------------------------------------------

function pickColor(num) {
	return colors[Math.floor(Math.random() * num)];
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb("+r+", "+g+", "+b+")";
}

function generateRandomColors(num) {

	var arr = [];

	for (var i = 0; i<num; i++) {
		arr.push(randomColor());
	}

	return arr;
}

function squareClicked() {
	var clickedColor = this.style.backgroundColor;
	if (clickedColor === pickedColor) {

		// CORECT
		messageDisplay.textContent = "Correct";
		h1.style.backgroundColor = pickedColor;

		for (var i = 0; i<colors.length; i++) {
			squares[i].style.backgroundColor = pickedColor;
		}

		resetButton.textContent = "Play again";

	} else {

		// WRONG
		this.style.backgroundColor = "#232323";
		messageDisplay.textContent = "Try again";
	}
}

function resetGame(num) {
	colors = generateRandomColors(num);
	pickedColor = pickColor(num);
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	h1.style.backgroundColor = "steelblue";
	message.textContent = "Pick a Color";

	// first, hide all, then just show what we need
	for (var j = 0; j < maxColor; j++) {
		squares[j].style.display = "none";
	}

	// set colors
	for (var i = 0; i < num; i++) {
		// set colors
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";
		// add click listeners
		squares[i].addEventListener("click", squareClicked);
	}
}

function initialize() {
	if (gameMode === "easy") {
		resetGame(3);
		return;
	} 

	if (gameMode === "hard") {
		resetGame(6);
		return;
	}

	if (gameMode == "expert") {
		resetGame(9);
		return;
	}
}

function easyClicked() {
	if (gameMode === "easy") { return; }
	easyButton.classList.add("selected");
	hardButton.classList.remove("selected");
	expertButton.classList.remove("selected");
	gameMode = "easy";
	initialize();
}

function hardClicked() {
	if (gameMode === "hard") { return; }
	hardButton.classList.add("selected");
	easyButton.classList.remove("selected");
	expertButton.classList.remove("selected");
	gameMode = "hard";
	initialize();
}

function expertClicked() {
	if (gameMode === "expert") { return; }
	expertButton.classList.add("selected");
	hardButton.classList.remove("selected");
	easyButton.classList.remove("selected");
	gameMode = "expert";
	initialize();
}

// MAIN PROGRAM ----------------------------------------------------------------------------------------

function main() {

	// initial setup
	initialize();

	// set listeners
	resetButton.addEventListener("click", initialize);
	easyButton.addEventListener("click", easyClicked);
	hardButton.addEventListener("click", hardClicked);
	expertButton.addEventListener("click", expertClicked);
}

main();