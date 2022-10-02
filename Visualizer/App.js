const togTheme=document.querySelector("[data-toggle-theme]");
const structElem=document.querySelector("[data-structs]");
const algoElem=document.querySelector("[data-algos]");
const moreStructElem=document.querySelector("[data-more-structs]");
const moreAlgoElem=document.querySelector("[data-more-algos]");

//grabbed elements

async function getStructs(){
	const data=await fetch("./struct.json");
	const json=await data.json();
	
	return (json);
}
// an async function for retrieving json

const App={
	DATA:null,
	init: function (){
		this.updateTheme();
		
		getStructs().then((data)=>{
			this.DATA=data;
			this.renderData();
			this.setUpEvents();
		}).catch((err)=>{
			console.log(err);
			this.abort("Unable to get Data!");
		});
		// Handling data
		
		
		togTheme.addEventListener("click",()=>{
			this.toggleTheme();
		});
	},
	abort: function (msg){
		alert(msg);
	},
	renderData: function (){
		
	},
	setUpEvents: function (){
		
	},
	updateTheme: function (){
		let currTheme=localStorage.getItem("--VisTheme");
		
		if(currTheme === null){
			localStorage.setItem("--VisTheme","light");
			return;
		}
		
		let body=document.body;
		body.className=currTheme;
	},
	toggleTheme:function(){
		let body=document.body;
		body.classList.toggle("light");
		body.classList.toggle("dark");
		
		if(body.classList.contains("dark")){
			localStorage.setItem("--VisTheme","dark");
		}else{
			localStorage.setItem("--VisTheme","light");
		}
	}
}



window.onload=()=>App.init();