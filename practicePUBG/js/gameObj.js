let touchArea = document.getElementById("touchArea");
let fireArea = document.getElementById("fireArea");
let screenHeight = parseInt(getComputedStyle(screen).height);
let screenWidth = parseInt(getComputedStyle(screen).width);
let prevTouch = {
	x: null,
	y: null
};

let targetArr = [];


function createTarget(x, y) {
	let elem = document.createElement("div");
	elem.classList.add("shootingTarget");
	elem.style.top = y;
	elem.style.left = x;
	screen.appendChild(elem);

	this.y = parseInt(getComputedStyle(elem).top);
	this.x = parseInt(getComputedStyle(elem).left);
	this.w = parseInt(getComputedStyle(elem).width);
	this.h = parseInt(getComputedStyle(elem).height);
	this.elem = elem;
	this.refresh=function(){
		this.elem.style.top=this.y+"px";
		this.elem.style.left=this.x+"px";
	}
}

for (let i = 0; i < 10; i++) {
	targetArr.push(new createTarget(
		randInt(10, 90)+"vw",
		randInt(10, 90)+"vh"
	));
}

/**** screen listeners ****/
touchArea.ontouchmove = (e)=> {
	let touch = e.touches['0'];

	if (prevTouch.x != null &&
		prevTouch.y != null) {
			
			let diffX=touch.screenX-prevTouch.x;
			let diffY=touch.screenY-prevTouch.y;
			
		targetArr.forEach((val, i, arr)=> {
			val.x+=diffX;
			val.y+=diffY;
			val.refresh();
		});
	}
	
	prevTouch.x=touch.screenX;
	prevTouch.y=touch.screenY;
}

touchArea.onmousemove = (e)=> {
	
}

fireArea.onclick = (e)=> {
	targetArr.forEach((val,i,arr)=>{
		
	});
}

let ox=null,oy=null;
setInterval(()=>{
	if(ox==prevTouch.x){
		prevTouch.x=null;
	}
	if(oy==prevTouch.y){
		prevTouch.y=null;
	}
	
	ox=prevTouch.x;
	oy=prevTouch.y;
},100);