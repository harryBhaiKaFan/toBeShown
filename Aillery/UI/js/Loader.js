/**
 * A simple loader.
 * 
 * **/

export const Loader={
	parent:null,
	loaderELEM:null,
	spinnerELEM:null,
	init: function (elem){
		this.parent=elem;
		elem.style.position="relative";
		this.loaderELEM=document.createElement("div");
		this.loaderELEM.classList.add("loader");
		this.spinnerELEM=document.createElement("div");
		this.spinnerELEM.classList.add("spinner");
		this.spinnerELEM.textContent="_____";
		
		this.loaderELEM.appendChild(this.spinnerELEM);
		elem.appendChild(this.loaderELEM);
	},
	remove: function (){
		this.loaderELEM.remove();
	},
	add: function (elem){
		this.remove();
		this.parent=elem;
		elem.appendChild(this.loaderELEM);
	}
};
