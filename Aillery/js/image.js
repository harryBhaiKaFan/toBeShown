import {Storage} from '/js/APIs/Storage.js';
import {Settings} from '/js/Settings.js';

const backBtn = document.querySelector("[data-back-btn]");
const imgName = document.querySelector("[data-image-name]");
const cnvs = document.querySelector("[data-image-view]");
const editBtn = document.querySelector("[data-edit-image]");
const saveBtn = document.querySelector("[data-save-image]");
const penColorInp = document.querySelector("[data-choose-pen-color]");
const penWidthInp = document.querySelector("[data-choose-pen-width]");

const ImageViewer = {
	init: function(){
		penColorInp.scrollIntoView();
		Settings.init();
		Settings.applyTheme();

		cnvs.height = parseInt(getComputedStyle(cnvs).height);
		cnvs.width = parseInt(getComputedStyle(cnvs).width);

		Storage.init().then(()=>{
			ImageViewer.loadImage();
		}).catch((err)=>{
			alert("Cannot init storage!");
			console.log(err);
		});
		backBtn.onclick = ImageViewer.loadPrevPage;
		saveBtn.onclick = ImageViewer.saveEditedImage;
		penColorInp.onchange = () => console.log(cnvs.getContext('2d').strokeStyle = penColorInp.value);
		penWidthInp.oninput = () => cnvs.getContext('2d').lineWidth = penWidthInp.value;
	},
	loadPrevPage: function(){
		Settings.opened_image=Settings.defaultValue[2];
		let url = Settings.popPage();
		location.replace(url);
	},
	loadImage: function(){
		Storage.imgHandler.getImgById(parseInt(Settings.opened_image)).then((img)=>{
			ImageViewer.renderImage(img);
			editBtn.onclick=ImageViewer.editImage;
		}).catch((err)=>{
			alert("Failed to load image!");
			console.log(err);
		});
	},
	renderImage: function(img){
		let ctx = cnvs.getContext("2d");
		createImageBitmap(img.blob).then((imageBitMap)=>{
			ctx.drawImage(imageBitMap,0,0,cnvs.width,cnvs.height);
		}).catch(()=>{
			alert("Failed to create image bit map!");
		})
		imgName.innerText=img.name;


	},
	editImage: function(){
		let penWidth = penWidthInp.value;
		let penColor = penColorInp.value;
		let ctx = cnvs.getContext("2d");
		ctx.strokeStyle = penColor;
		ctx.lineWidth = penWidth;
		cnvs.style.touchAction="none";

		editBtn.classList.toggle("hidden-btn");
		saveBtn.classList.toggle("hidden-btn");

		cnvs.onpointerdown = (e) =>{
			ctx.beginPath();
			ctx.moveTo(e.pageX,e.pageY);
		}
		cnvs.onpointermove = (e) => {
			ctx.lineTo(e.pageX,e.pageY);
			ctx.moveTo(e.pagex,e.pageY);
			ctx.stroke();
		}
		cnvs.onpointerup = () => {
			ctx.closePath();
		}

	},
	saveEditedImage: function(){
		cnvs.onpointerup=null;
		cnvs.onpointerdown=null;
		cnvs.onpointermove=null;
		cnvs.style.touchAction="initial";

		let imgID = parseInt(Settings.opened_image);
		cnvs.toBlob((blob)=>{
			Storage.imgHandler.updateBlob(imgID,blob).then(()=>{
				editBtn.classList.toggle("hidden-btn");
				saveBtn.classList.toggle("hidden-btn");

			}).catch(()=>{
				alert("Cannot save edited image!");
			});
		},'image/png',0.9);
	}
};

window.onload=()=>ImageViewer.init();
