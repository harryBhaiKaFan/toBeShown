
export const Settings = {
	options: ["vis_theme", "vis_animeDelay", "vis_opened"],
	defaultValues: [{
		toggler: true,
		value: 0
	},
	{
		toggler: false,
		value: 600
	},
	{
		toggler: false,
		value: "null"
	}],
	possibleValues: [["light", "dark"], 
	"number",
	"string",
	["array","graph","linkedList","map","queue","stack","tree","bubbleSort","coutingSort","heapSort","insertionSort","mergeSort","quickSort","selectionSort"]],
	init: function () {
		this.options.forEach((val, i) => {
			if (localStorage.getItem(val) == null) {
				if (this.defaultValues[i].toggler) {
					localStorage.setItem(val,this.possibleValues[0][this.defaultValues[i].value]);
				} else {
					localStorage.setItem
						(val, this.defaultValues[i].value);
				}
			}
		});
		this.defaultValues[0].value = this.possibleValues[0].findIndex((val)=>{
			return (val == this.Theme);
		});
	},
	set Theme(value) {
		localStorage.setItem(this.options[0], value);
	},
	get Theme() {
		return localStorage.getItem(this.options[0]);
	},
	set AnimationDelay(value) {
		localStorage.setItem(this.options[1], value);
	},
	get AnimationDelay() {
		return localStorage.getItem(this.options[1]);
	},
	applyTheme: function () {
		document.body.classList.add(this.Theme);
	},
	toggleTheme: function () {
		document.body.classList.toggle(this.Theme);
		this.Theme = this.possibleValues[0][((this.defaultValues[0].value+1)%this.possibleValues[0].length)];
		this.defaultValues[0].value++;
	},
	set Opened(value) {
		localStorage.setItem(this.options[2],value);
	},
	get Opened() {
		return localStorage.getItem(this.options[2]);
	}
};