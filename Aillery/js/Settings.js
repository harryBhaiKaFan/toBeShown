
export const Settings = {
	_ANY:"_any",
	_NO:"_no",
	options:["_Ail_theme","_Ail_Current_folder","_Ail_Current_image","_Ail_Page_History","_Ail_Usr_Cam"],
	defaultValue:["light","0","0","","user"],
	inputTypes:["OPTION","NUM","NUM","Str","str"],
	possibleValue:[
		["light","dark"],
		["_any"],
		["_any"],
		["_any"],
		["user","environment"]
	],
	init: function (){
		this.options.forEach((value,i)=>{
			let check = localStorage.getItem(value);
			if(check === null){
				localStorage.setItem(value,this.defaultValue[i]);
			}
		});
	},
	set theme(value){
		localStorage.setItem(this.options[0],value);
	},
	get theme(){
		return localStorage.getItem(this.options[0]);
	},
	set opened_folder(value){
		localStorage.setItem(this.options[1],value);
	},
	get opened_folder(){
		return localStorage.getItem(this.options[1]);
	},
	set opened_image(value){
		localStorage.setItem(this.options[2],value);
	},
	get opened_image(){
		return localStorage.getItem(this.options[2]);
	},
	applyTheme:function(){
		let body = document.body;
		body.className = this.theme;
	},
	toggleTheme:function(){
		if(this.theme === this.possibleValue[0][0]){
			this.theme = this.possibleValue[0][1];
		}else{
			this.theme = this.possibleValue[0][0];
		}
	},
	set opened_pages(value){
		localStorage.setItem(this.options[3], value);
	},
	get opened_pages(){
		return localStorage.getItem(this.options[3]);
	},
	pushPage: function(url){
		let newUrl = this.opened_pages;
		if(newUrl === "")
			newUrl = url;
		else
			newUrl = newUrl+'|'+url;

		this.opened_pages = newUrl;
	},
	popPage: function(){
		let url = this.opened_pages.split("|");
		let newPages = "";

		for(let i=0; i<url.length-1;i++){
			newPages+=url[i];
			if(i < url.length-2)
				newPages+="|";
		}
		this.opened_pages = newPages;
		return(url[url.length-1]);
	},
	set cam(value){
		localStorage.setItem(this.options[4],value);
	},
	get cam(){
		return localStorage.getItem(this.options[4]);
	},
	toggleCam(){
		if(this.cam == this.possibleValue[4][0])
		{
			this.cam = this.possibleValue[4][1];
		}else
		{
			this.cam = this.possibleValue[4][0];
		}
	}
}
