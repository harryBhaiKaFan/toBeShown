import {
	Settings
} from './Settings.js';

const settings_btn = document.querySelector("[data-settings-btn]");
const dsItems = document.querySelectorAll("[data-ds-item]");
const algoItems = document.querySelectorAll("[data-algo-items");

const App={
	init: function(){
		Settings.init();
		document.body.classList.add(Settings.Theme);
		
		
	},
}

window.onload=App.init;