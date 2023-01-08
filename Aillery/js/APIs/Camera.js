// An API to take pictures with camera.

export let Camera = {
	vElem: null,
	cElem: null,
	ctx: null,
	stream: null,
	init: function(parent,width,height,constraints) 
	{
		
		this.vElem = document.createElement("video");
		this.vElem.style.width=width+"vw";
		this.vElem.style.height=height+"vh";
		
		this.cElem = document.createElement("canvas");
		this.cElem.width=constraints.video.width;
		this.cElem.height=constraints.video.height;
		
		this.ctx = this.cElem.getContext('2d');

		if (navigator.mediaDevices == undefined) {
			alert("mediaDevices not available");
			return;
		}

		navigator.mediaDevices.getUserMedia(constraints).then((stream)=> {
			this.vElem.srcObject = stream;
			this.stream = stream;
			this.vElem.onloadedmetadata = ()=> {
				this.vElem.play();
			}
		}).catch((err)=> {
			console.log(err);
		});
		
		parent.appendChild(this.vElem);
	},
	picture: function() {
		this.ctx.drawImage(this.vElem, 0, 0,this.cElem.width,this.cElem.height);
		let imgData=this.ctx.getImageData(0,0,this.cElem.width,this.cElem.height).data;
		let avg = {
			r:0,
			g:0,
			b:0,
			a:0
		};

		for(let i=0; i<imgData.length; i+=4){
			avg.r=avg.r+imgData[i];
			avg.g=avg.g+imgData[i+1];
			avg.b=avg.b+imgData[i+2];
			avg.a=avg.a+imgData[i+3];
		}
		avg.r = avg.r/(imgData.length/4);
		avg.g = avg.g/(imgData.length/4);
		avg.b = avg.b/(imgData.length/4);
		avg.a = avg.a/(imgData.length/4);

		return new Promise((res)=>{
			this.cElem.toBlob((blob)=>{
				res({blob,avg});
			},'image/png',0.9);
		});
	},
	reload: function(constraints){
		this.stream.getTracks().forEach((track)=>{
			track.stop();
		});

		navigator.mediaDevices.getUserMedia(constraints).then((stream)=> {
			this.vElem.srcObject = stream;
			this.stream = stream;
			this.vElem.onloadedmetadata = ()=> {
				this.vElem.play();
			}
		}).catch((err)=> {
			console.log(err);
		});
	}
};
