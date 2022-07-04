export let ImageClicker = {
	ELEM: {
		take:null,
		out:null
	},
	ctx:null,
	imgData: null,
	data: null,
	init:function(vElem,cElem)
	{
		this.ELEM.take = vElem;
		this.ELEM.out = cElem;
		this.ctx=cElem.getContext('2d');
		
		if(navigator.mediaDevices == undefined)
		{
			alert("mediaDevices not available");
			return;
		}

		navigator.mediaDevices.getUserMedia({
			audio:false,
			video: {
				facingMode: "user",
				width:window.innerWidth,
				height:(window.innerHeight*40)/100
			}
		}).then((data)=>{
				vElem.srcObject = data;
				vElem.onloadedmetadata=()=>{
					vElem.play();
				}
				
				setInterval(()=>{
					this.ctx.drawImage(vElem,0,0);
				},1);
				
			}).catch((err)=>{
				alert(err);
		});
	},
	take:function()
	{
		return new Promise((res,rej)=>{
			res({
				data:this.ctx.getImageData(0,0,this.ELEM.out.width,this.ELEM.out.height).data,
				w:this.ELEM.out.width,
				h:this.ELEM.out.height
			});
		});
	}
};
