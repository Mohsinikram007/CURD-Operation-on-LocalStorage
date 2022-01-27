let id="no";
let item = document.querySelector("#item")
let data = document.querySelector("#data")
data.addEventListener('click', manageData);
item.addEventListener('keydown', (event)=>
{
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode === 13)   
		manageData();
	if(keycode === 08)   
		deleteData()

});
//localStorage.clear();
selectData();
function manageData(){
	document.getElementById('msg').innerHTML="";
	let name=document.getElementById('item').value;
	if(name==''){
		
	}else{
		console.log(id);
		if(id=='no'){
			let arr=getCrudData();
			if(arr==null){
				let data=[name];
				setCrudData(data);
			}else{
				arr.push(name);
				setCrudData(arr);
			}
			alert("Data Added")
		}else{
			let arr=getCrudData();
			arr[id]=name;
			setCrudData(arr);
			alert("Data Updated")
		}
		document.getElementById('item').value='';
		selectData();
	}
}

function selectData(){
	let arr=getCrudData();
	if(arr!=null){
		let html='';
		let sno=1;
		for(let k in arr){
			html=html+`<tr><td>${sno}</td><td>${arr[k]}</td><td><a href="javascript:void(0)" onclick="editData(${k})"><button class="btn btn-success">Edit</button></a></td>
			<td><a href="javascript:void(0)" onclick="deleteData(${k})"><button class="btn btn-danger">Delete</button></a></td>
</tr>`;
			sno++;
		}
		document.getElementById('root').innerHTML=html;
		
	}
}

function editData(rid){
	id=rid;
	let arr=getCrudData();
	document.getElementById('item').value=arr[rid];
}

function deleteData(rid){
	let arr=getCrudData();
	arr.splice(rid,1);
	setCrudData(arr);
	selectData();
}

function getCrudData(){
	let arr=JSON.parse(localStorage.getItem('crud'));
	return arr;
}

function setCrudData(arr){
	localStorage.setItem('crud',JSON.stringify(arr));
}
function delAll(){
	localStorage.clear();
	location.reload();
}