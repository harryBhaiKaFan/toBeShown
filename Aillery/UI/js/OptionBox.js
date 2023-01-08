

function closeBoxFn(box, optionBox)
{
	
	setTimeout(()=>{
		optionBox.style.height="0";
		box.style.height="0";
		setTimeout(()=>{
			box.remove();
		},100);
	},300);
}

function createOption(elemValue)
{
	const option=document.createElement("div");
	option.classList.add("option");
	option.textContent=elemValue;
	
	return(option);
}

export function OptionBox(options=null)
{
	if(options === null)
	{
		options = {
			headText:"Options",
			options:["Option1"]
		};
	}
		
	const Box=document.createElement("div");
	Box.classList.add("box");
	
	const closeBox=document.createElement("div");
	closeBox.textContent="×";
	closeBox.classList.add("close-box");
	Box.appendChild(closeBox);

	const optionBox=document.createElement("div");
	optionBox.classList.add("option-box");
	
	const boxTitle=document.createElement("h3");
	boxTitle.textContent=options.headText;
	boxTitle.classList.add("option-head");
	optionBox.appendChild(boxTitle);

	let boxOptionElems=[];
	
	options.options.forEach((val,i)=>{
		boxOptionElems.push(createOption(val));
		optionBox.appendChild(boxOptionElems[i]);
	});
	
	
	Box.appendChild(optionBox);
	document.body.appendChild(Box);
	
	return(new Promise((res,rej)=>{
		optionBox.onclick=(e)=>{
			closeBoxFn(Box,optionBox);
			res(e.target);
		}
		
		closeBox.onclick=(e)=>{
			closeBoxFn(Box,optionBox);
			rej(e);
		}
	}));
}