// An API to interact with indexedDB.
	// Following operations can be performed.
	// 1.storing data
// 2.getting data
// 3.updating data
// 4.deleting data

/***
	*
	* Make transaction and perform any
	* operation.
	*
	* ***/


	function makeTrnxn(DB, storeName, mode) {
		let tx = DB.transaction(storeName, mode);
		let store = tx.objectStore(storeName);

		return(store);
	}



function addData(DB, storeName, data) {
	let store = makeTrnxn(DB, storeName, "readwrite");
	let addRq = store.add(data);

	return(new Promise((res, rej)=> {
		addRq.onsuccess = res;
		addRq.onerror = rej;
	}));
}

function updateData(DB, storeName, data) {
	let store = makeTrnxn(DB, storeName, "readwrite");
	let updateRq = store.put(data);

	return(new Promise((res, rej)=> {
		updateRq.onsuccess = res;
		updateRq.onerror = rej;
	}));
}

function deleteData(DB, storeName, key) {
	let store = makeTrnxn(DB, storeName, "readwrite");
	let delRq = store.delete(key);

	return(new Promise((res, rej)=> {
		delRq.onsuccess = res;
		delRq.onfailure = rej;
	}));
}

function readData(DB, storeName, key) {
	let store = makeTrnxn(DB, storeName, "readonly");
	let readRq = store.get(key);

	return(new Promise((res, rej)=> {
		readRq.onsuccess = res;
		readRq.onerror = rej;
	}));
}

function readAllData(DB, storeName) {
	let store = makeTrnxn(DB, storeName, "readonly");
	let readRq = store.getAll();

	return(new Promise((res, rej)=> {
		readRq.onsuccess = res;
		readRq.onfailure = rej;
	}));
}


function increImgID() {
	let id = localStorage.getItem("Aillery_IMG");
	if (id === null) {
		localStorage.setItem("Aillery_IMG", "1");
		return(1);
	}
	id = parseInt(id);
	id++;
	localStorage.setItem("Aillery_IMG", id);
	return(id);
}

function increFolderID() {
	let id = localStorage.getItem("Aillery_FLD");
	if (id === null) {
		localStorage.setItem("Aillery_FLD", "1");
		return(1);
	}
	id = parseInt(id);
	id++;
	localStorage.setItem("Aillery_FLD", id);
	return(id);
}


export let Storage = {
	DB_NAME: "AILLERY_DB",
	DB_OBJ: null,
	imgsID: 0,
	foldersID: 0,
	folderStore: "folders",
	imgStore: "images",
	init: function() {
		let successFn = null;
		let failureFn = null;

		const request = indexedDB.open(this.DB_NAME);

		request.onupgradeneeded = (e) => {
			const db = e.target.result;

			db.createObjectStore(Storage.imgStore, {
				keyPath: "id"
			});

			db.createObjectStore(Storage.folderStore, {
				keyPath: "id"
			});

		}

		request.onsuccess = (e) => {
			this.DB_OBJ = e.target.result;
			successFn(e);
		}

		request.onerror = (e) => {
			failureFn(e);
		}

		return new Promise((res, rej)=> {
			successFn = res;
			failureFn = rej;
		});
	},
	folderHandler: {
		Folder: async function (name) {
			let folder = {
				id: increFolderID(),
				name: name,
				imgs: []
			};

			await addData(Storage.DB_OBJ, Storage.folderStore, folder);

			return(folder);
		},

		addImg: async function (fID, imgID)
		{
			let folder = (await readData(Storage.DB_OBJ,Storage.folderStore,fID)).target.result;

			folder.imgs.push(imgID);
			return (await updateData(Storage.DB_OBJ,Storage.folderStore,folder));
		},

		removeImg: async function(fID,imgID){
			let folder = (await readData(Storage.DB_OBJ,Storage.folderStore,fID)).target.result;
			let newArr = [];

			folder.imgs.forEach((value)=>{
				if(value == imgID)
					return;
				newArr.push(value);
			});
			folder.imgs = newArr;
			return (await updateData(Storage.DB_OBJ,Storage.folderStore,folder));
		},

		getAllFolders: async function (){
			return ((await readAllData(Storage.DB_OBJ,Storage.folderStore)).target.result);
		},

		Delete: async function (fID){
			let folder=(await readData(Storage.DB_OBJ, Storage.folderStore, fID)).target.result;
			folder.imgs.forEach((val)=>{
				Storage.imgHandler.Delete(val);
			});

			return(await deleteData(Storage.DB_OBJ, Storage.folderStore, folder.id));
		},

		Rename: async function (fID,newName){
			let folder=(await readData(Storage.DB_OBJ, Storage.folderStore, fID)).target.result;
			folder.name=newName;
			return(await updateData(Storage.DB_OBJ, Storage.folderStore, folder));
		},

		getFolderByFID: async function (fID){
			return ((await readData(Storage.DB_OBJ, Storage.folderStore, fID)).target.result);
		}
	},

	imgHandler: {

		Img: async function(width, height, name, blob,avg) {
			let img = {
				id: increImgID(),
				width: width,
				height: height,
				blob: blob,
				name:name,
				avg:{
					r:avg.r,
					g:avg.g,
					b:avg.b,
					a:avg.a
				}
			};

			await addData(Storage.DB_OBJ, Storage.imgStore, img);
			return(img);
		},
		getImgById: async function(imgID){
			let img = (await readData(Storage.DB_OBJ, Storage.imgStore, imgID)).target.result;
			return(img);
		},
		Delete: async function (imgID){

			return await deleteData(Storage.DB_OBJ,Storage.imgStore,imgID);
		},

		Rename: async function (imgID,newName){
			let img=(await readData(Storage.DB_OBJ,Storage.imgStore,imgID)).target.result;

			img.name=newName;

			return(await updateData(Storage.DB_OBJ, Storage.imgStore, img));
		},
		updateBlob: async function(imgID,newBlob){
			let img = (await readData(Storage.DB_OBJ,Storage.imgStore,imgID)).target.result;
			img.blob = newBlob;
			return(await updateData(Storage.DB_OBJ, Storage.imgStore, img));
		},
		Blob: async function (imgID){
			let img=(await readData(Storage.DB_OBJ, Storage.imgStore, imgID)).target.result;

			return(img.blob);
		}
	}
};
