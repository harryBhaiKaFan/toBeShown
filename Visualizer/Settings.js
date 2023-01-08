export const Settings = {
	options:["vis_theme","vis_animeDelay","vis_defaultOpen"],
	defaultValues:["light",600,"null"],
	inputTypes:["bool","num","str"],
	init: function(){
		this.options.forEach((val,i)=>{
			if(localStorage.getItem(val) == null)
			{
				localStorage.setItem
				(val,this.defaultValues[i]);
			}
		});
	},
	set Theme(value){
		localStorage.setItem(this.options[0],value);
	},
	get Theme(){
		return localStorage.getItem(this.options[0]);
	},
	set AnimationDelay(value){
		localStorage.setItem(this.options[1],value);
	},
	get AnimationDelay(){
		return localStorage.getItem(this.options[1]);
	},
	set DefaultOpen(value){
		localStorage.setItem(this.options[2],value);
	},
	get DefaultOpen(){
		return localStorage.getItem(this.options[2]);
	}
};