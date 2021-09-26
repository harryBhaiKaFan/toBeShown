let screen = document.getElementById("screen");
let bg = document.querySelectorAll(".bg");
let header = document.querySelector("header");

function randInt(min, max) {
	return((Math.random()*(max-min))+min);
}

function initColor(e) {
	screen.style.background = "rgba("+randInt(0,70)+","+randInt(0, 70)+","+randInt(0, 70)+")";
}

window.onload=initColor;
window.ondblclick=initColor;