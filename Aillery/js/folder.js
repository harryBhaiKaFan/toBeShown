import {Storage} from "./APIs/Storage.js";
import {Settings} from "./Settings.js";
import {OptionBox} from "../UI/js/OptionBox.js";

const fldrImgs = document.querySelector("[data-folder-images]");
const fldrName = document.querySelector("[data-folder-name]");
const backBtn = document.querySelector("[data-back-btn]");
const addBtn = document.querySelector("[data-add-img]");


function setImageHandler(image,folder)
{
	OptionBox({
		headText: image.name,
		options: ["Delete","Rename","Open"]
	}).then((opt)=>{
		let option = opt.innerText;
		switch(option){
			case "Delete":
				Storage.folderHandler.removeImg(folder.id,image.id).then(()=>{
				}).catch(()=>{
					alert("Failed to delete from folder!");
				})
				Storage.imgHandler.Delete(image.id).then(()=>{
					FolderHandler.loadFolder();
				}).catch(()=>{
					alert("Failed to delete from database!");
				});
				break;
			case "Rename":
				let newName = prompt("New Name:",(new Date()).getTime());
				Storage.imgHandler.Rename(image.id,newName).then(()=>{
					FolderHandler.loadFolder();
				}).catch(()=>{
					alert("Failed to Rename");
				});
				break;
			case "Open":
				Settings.opened_image = image.id;
				Settings.pushPage(location.href);
				location.replace("/image.html");
				break;
		}
	}).catch(()=>{
	});
}

function createImgDiv(imgObj)
{
	const image = document.createElement("div");
	image.classList.add("image");

	const imageIcon = document.createElement("img");
	imageIcon.classList.add("image-icon");

	let url = URL.createObjectURL(imgObj.blob);
	imageIcon.src = url;

	const imageName = document.createElement("div");
	imageName.classList.add("image-name");
	imageName.textContent = imgObj.name;

	image.appendChild(imageIcon);
	image.appendChild(imageName);

	return(image);
}

const FolderHandler = {
	init: function(){
		Settings.init();
		Settings.applyTheme();

		Storage.init().then(()=>{
			FolderHandler.loadFolder();
		}).catch(()=>{
			alert("Unable to init storage!");
		});

		addBtn.onclick = FolderHandler.addImage.bind(FolderHandler);
		backBtn.onclick = FolderHandler.prevPage.bind(FolderHandler);
	},
	addImage: function(){
		Settings.pushPage(location.href);
		location.replace("/capture.html");
	},
	prevPage: function(){
		let url = Settings.popPage();
		Settings.opened_folder = Settings.defaultValue[1];
		location.replace(url);
	},
	loadFolder:function(){
		Storage.folderHandler.getFolderByFID(parseInt(Settings.opened_folder))
			.then((f)=>{
				fldrName.textContent=f.name;
				FolderHandler.loadImages(f);
			}).catch(function(e){
				console.log(e);
				alert("Unable to open folder !");
			});
	},
	loadImages:function(fldr){
		let imgs = fldr.imgs;
		fldrImgs.innerHTML = "";
		imgs.forEach((value)=>{
			Storage.imgHandler.getImgById(value).then((e)=>{
				let elem = createImgDiv(e);
				fldrImgs.appendChild(elem);
				elem.onclick = ()=>
					setImageHandler(e, fldr);
			}).catch(()=>{
				alert("Failed to open an image!");
			});
		});
	}
}


window.onload = FolderHandler.init.bind(FolderHandler);
