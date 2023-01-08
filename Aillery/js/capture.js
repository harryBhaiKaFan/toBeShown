import { Camera } from './APIs/Camera.js';
import { Storage } from './APIs/Storage.js';
import { Settings } from './Settings.js';

const viewerElem = document.querySelector("[data-image-preview]");
const backBtn = document.querySelector("[data-back-btn]");
const changeModeBtn = document.querySelector("[data-change-mode-btn]");
const clickBtn = document.querySelector("[data-click-btn]");

const _WIDTH = 1280;
const _HEIGHT = 720;

const ImageCapturer = {
	constraints:null,
	init: function(){
		Settings.init();
		Settings.applyTheme();
		Storage.init();

		document.body.classList.add(Settings.theme);
		this.constraints = {
			audio:false,
			video:{
				facingMode:Settings.cam,
				width:_WIDTH,
				height:_HEIGHT
			}
		}

		Camera.init(viewerElem,100,100,this.constraints);

		backBtn.onclick = () => {
			let url=Settings.popPage();
			location.replace(url);
		}
		clickBtn.onclick = this.clickImg.bind(this);
		changeModeBtn.onclick = this.togCamMode.bind(this);
	},
	clickImg: async function(){
		//Takibg blob and storing it as image
		let {blob,avg} = await Camera.picture();
		let imgName = (new Date()).getTime();
		let fldr = parseInt(Settings.opened_folder);
		
		let img = await Storage.imgHandler.Img(_WIDTH,_HEIGHT,imgName,blob,avg);

		if(fldr === 0)
		{
			this.autoStore(img);
			return;
		}

		await Storage.folderHandler.addImg(fldr,img.id);
		alert("Saved in opened folder!");
	},
	autoStore: async function(img){
		let fldrs = await Storage.folderHandler.getAllFolders();
		let img_avg = img.avg;
		for(let i=0; i<fldrs.length; i++)
		{
			if(fldrs[i].imgs.length == 0)
				continue;

			let avg = (await Storage.imgHandler.getImgById(fldrs[i].imgs[0])).avg;
			let {r,g,b} = {...avg};

			if(Math.abs(img_avg.r - r ) < 25 && Math.abs(img_avg.g - g) < 25 
				 && Math.abs(img_avg.b - b) < 25)
			{
				await Storage.folderHandler.addImg(fldrs[i].id,img.id);
				alert("AI saved Image to "+fldrs[i].name+" folder!");
				return;
			}
		}
		let newFldrName = ((new Date).getTime()).toString();
		let newFldr = await Storage.folderHandler.Folder(newFldrName);
		await Storage.folderHandler.addImg(newFldr.id,img.id);

		alert("AI(created folder) saved image to "+newFldr.name+" folder!");
	},
	togCamMode:function(){
		Settings.toggleCam();
		this.constraints.video.facingMode=Settings.cam;
		Camera.reload(this.constraints);
	}
};

window.onload = ImageCapturer.init.bind(ImageCapturer);
