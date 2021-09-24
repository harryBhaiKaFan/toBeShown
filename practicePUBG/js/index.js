let screen = document.getElementById("screen");
let header = document.querySelector("header");

function randInt(min, max) {
	return((Math.random()*(max-min))+min);
}

function initColor(e) {
	screen.style.background = "rgba("+randInt(0, 100)+","+randInt(0, 100)+","+randInt(0, 100)+",1)";

	header.style.background = "rgba("+randInt(0, 100)+","+randInt(0, 150)+","+randInt(0, 100)+","+randInt(0.7, 1)+")";
}

window.onload=initColor;
window.ondblclick=initColor;