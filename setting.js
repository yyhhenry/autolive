window.onload=function(){
	let setting={
		imgurl:'./whole.png',
		mouth:{x:225,y:300},
		eye:{x:190,y:210}
	};
	if(localStorage.一键出道器!=null){
		setting=JSON.parse(localStorage.一键出道器);
	}else{
		localStorage.一键出道器=JSON.stringify(setting);
	}
	let ubx=document.getElementById('ubx');
	let chg=document.getElementById('chg');
	let setm=document.getElementById('setm');
	let sete=document.getElementById('sete');
	let image=document.getElementById('image');
	let tk=null;
	ubx.innerText=setting.imgurl;
	image.src=setting.imgurl;
	setm.onclick=function(){
		tk='m';
	}
	sete.onclick=function(){
		tk='e';
	}
	image.onclick=function(event){
		let ans={x:event.layerX,y:event.layerY};
		if(tk=='m'){
			tk=null;
			setting.mouth=ans;
			localStorage.一键出道器=JSON.stringify(setting);
		}else if(tk=='e'){
			tk=null;
			setting.eye=ans;
			localStorage.一键出道器=JSON.stringify(setting);
		}
	}
	chg.onclick=function(){
		tk=null;
		let newurl=prompt('图片url',setting.imgurl);
		if(newurl!=null){
			setting.imgurl=newurl;
			localStorage.一键出道器=JSON.stringify(setting);
			ubx.innerText=setting.imgurl;
			image.src=setting.imgurl;
		}
	}
}