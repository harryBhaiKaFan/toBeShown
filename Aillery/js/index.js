import { ImageClicker } from './ImageClicker.js';

window.onload=()=>
{
	/***
	 * SETTING IMGNO to '0'
	 * Adjusting theme onload
	 * If theme is dark then only...
	 ***/
	if(localStorage.getItem('--imgNO') == null)
	{
		localStorage.setItem('--imgNO',"0");
	}
	
	if(localStorage.getItem('--AilleryTheme') == 'dark')
	{
		document.body.classList.toggle('dark');
		document.body.classList.toggle('light');
	}
	
	 /***
	 * Loading all images from localStorage
	 * ***/
	 
	(function(){
		let imgNO=localStorage.getItem("--imgNO");
		
		if(imgNO == null)
		return;
		
		imgNO=parseInt(imgNO);
		
		while(imgNO)
		{
			let imgStr = "--img"+imgNO;
			let imgStrData = localStorage.getItem(imgStr);
			
			let imgData = JSON.parse(imgStrData);
		
			let cnvElem = document.createElement('canvas');
			cnvElem.style.width = imgData.w+"px";
			cnvElem.style.height = imgData.h+"px";

			populated.insertBefore(cnvElem,addImage);
			
			cnvElem.width=parseInt(getComputedStyle(cnvElem).width);
		
			cnvElem.height=parseInt(getComputedStyle(cnvElem).height);
		
			let ctx = cnvElem.getContext('2d');
		
			let secImgData = ctx.createImageData(imgData.w,imgData.h);
		
			for(let i=0; i<imgData.w*imgData.h*4 ;i++)
			{
				secImgData.data[i]=imgData.data[i];
			}

			ctx.putImageData(secImgData, 0, 0);
			imgNO--;
		
		}
	}());
	/****
	 * BackButton Means reload button
	 *
	 * 
	 * ****/
	 
	 (function (){
	 	let backButtons = document.querySelectorAll(".backButton");
	 	
	 	backButtons.forEach((val)=>{
	 		val.onclick=(e)=>location.reload();
	 	})
	 }());
	/****
	 * The App's loader adjusting
	 * Making it disappeared after 600 milliseconds
	 * ***/
	setTimeout(()=>
	{
		let loader = document.querySelector(".loader");

		loader.style.height="0";
		loader.style.fontSize="0";

		setTimeout(()=>
		{
			loader.style.display="none";
		},50);

	},600);

	/***
	 * The theme changing listener
	 *
	 * Change app's theme add set it to localStorage
	 * ***/
	changeTheme.onclick=()=>
	{
		if(document.body.classList.toggle('dark'))
			localStorage.setItem('--AilleryTheme', 'dark');

		if(document.body.classList.toggle('light'))
			localStorage.setItem('--AilleryTheme', 'light');
	}

	/***
	 * The image add listener
	 *
	 * launch the ImageTaker elem 
	 * ***/
	
	(function(){
		let screens = document.querySelectorAll(".screen");
		let taker = document.querySelector(".ImageTaker");
		addImage.onclick=()=>
		{
			screens.forEach((val)=>{
				val.classList.add('inactive');
			});
			taker.classList.remove('inactive');
			taker.classList.add('active');

			/*
			 * Clicker init here
			 * Clicks an image 
			 * Stores it in localStorage
			 * and reloads the webpage
			 *
			 * !!! Needs to be changed 
			 * +++ Way will be (Using indexeddb) -->
			 *
			 *  1.) Take image 
			 *  2.) Match them with available images
			 *  		if any matched put the image in
			 *  		the folder (table in database) of
			 *  		that matched image.
			 *  3.) Otherwise if no images are 
			 *  		available or none were Matched
			 *  		create an untitled folder (table in database)
			 *  		and put the images in that
			 *  		folder.
			 * */
			 
			imageCapture.height=parseInt(getComputedStyle(imageCapture).height);
			imageCapture.width=parseInt(getComputedStyle(imageCapture).width);
			
			ImageClicker.init(imageHave,imageCapture);
			

			imageClick.onclick=()=>{

				ImageClicker.take().then((data)=>{
					
					let imgNO=localStorage.getItem("--imgNO");
					imgNO++;
					localStorage.setItem("--imgNO",`${imgNO}`);
					
					localStorage.setItem("--img"+imgNO,JSON.stringify(data));
					
					location.reload();

				}).catch((err)=>{
					alert(err);
				});
			}

		}
	}());

	//addImage.onclick();
	
}
