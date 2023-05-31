import { Settings } from './Settings.js';
import { SettingsBox, Input, INPUT_TYPES } from './components/js/SettingsBox.js';


const settings_btn = document.querySelector("[data-settings-btn]");
const dsSec = document.querySelector("[data-structs]");
const algoSec = document.querySelector("[data-algos]");
const content = document.querySelector("[data-content]");
const vis = document.querySelector("[data-vis]");
const back_btn = document.querySelector("[data-back-btn]");
const heading = document.querySelector("[data-heading]")

function visualize(sec, data) {
	content.classList.add("hidden");
	vis.classList.remove("hidden");
	back_btn.classList.remove("hidden");
	heading.classList.add("hidden");
	
}

const App = {
	init: function () {
		Settings.init();
		Settings.applyTheme();
		SettingsBox.init(Input(INPUT_TYPES.THEME, Settings.Theme, this.updateTheme.bind(this)),
			Input(INPUT_TYPES.NUMBER, Settings.AnimationDelay, this.updateAnimeDelay.bind(this), "Animation Delay(ms)"));

		dsSec.addEventListener("click", (e) => {
			let data = e.target.dataset.dsType;
			if (typeof (data) !== "string") return;
			visualize(dsSec, data);
		});

		algoSec.addEventListener("click", (e) => {
			let data = e.target.dataset.algoType;
			if (typeof (data) !== "string") return;
			visualize(algoSec, data);
		});

		settings_btn.addEventListener("click", () => {
			SettingsBox.display();
		});

		back_btn.addEventListener("click", () => {
			content.classList.remove("hidden");
			vis.classList.add("hidden");

			back_btn.classList.add("hidden");
			heading.classList.remove("hidden");
		});
	},
	updateTheme: function () {
		Settings.toggleTheme();
		Settings.applyTheme();
	},
	updateAnimeDelay: function (e) {
		let value = e.target.value;
		Settings.AnimationDelay = value;
	}
}

window.onload = App.init.bind(App);
