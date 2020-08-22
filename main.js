window.onload=function(){
	let graph=new Image();
	let pk=16;
	if(location.search.indexOf('tab')!=-1){console.log('testing');pk=64;}
	let setting={
		imgurl:'./whole.png',
		mouth:{x:225,y:300},
		eye:{x:190,y:210}
	};
	let blink=0;
	if(localStorage.一键出道器!=null){
		setting=JSON.parse(localStorage.一键出道器);
	}else{
		localStorage.一键出道器=JSON.stringify(setting);
	}
	graph.src=setting.imgurl;
	let mouse={x:0,y:0};
	let downMouse={x:setting.mouth.x,y:setting.eye.y};
	let dqr=function(x1,y1,x2,y2){
		return (x1-x2)*(x1-x2)+(y1-y2)*(y1-y2);
	}
	let fy=1.5*dqr(setting.mouth.x,setting.mouth.y,setting.eye.x,setting.eye.y);
	let canvas=document.getElementById('canvas');
	let fr=true;
	window.onmousemove=function(event){
		mouse={x:event.pageX,y:event.pageY};
	}
	window.onclick=function(event){
		mouse={x:event.pageX,y:event.pageY};
	}
	graph.onload=function(){
		let xw=Math.floor((graph.width+pk-1)/pk);
		let xh=Math.floor((graph.height+pk-1)/pk);
		let tb=[];
		let tv=[];
		for(let x=0;x<xw;x++){
			tb[x]=[];
			tv[x]=[];
			for(let y=0;y<xh;y++){
				tb[x][y]={x:x*pk,y:y*pk};
				tv[x][y]={x:0,y:0};
			}
		}
		setInterval(function(){
			canvas.style.width=graph.width;
			canvas.style.height=graph.height;
			canvas.width=graph.width;
			canvas.height=graph.height;
			let ctx=canvas.getContext('2d');
			for(let x=0;x<xw;x++){
				for(let y=0;y<xh;y++){
					for(let px=-1;px<=1;px++){
						if(x+px<0||x+px>=xw)continue;
						for(let py=-1;py<=1;py++){
							if(y+py<0||y+py>=xh)continue;
							tv[x][y].x+=tb[x+px][y+py].x-tb[x][y].x-px*pk;
							tv[x][y].y+=tb[x+px][y+py].y-tb[x][y].y-py*pk;
						}
					}
					(function(){
						let dx=pk*x-downMouse.x;
						let dy=(pk*y-downMouse.y)*0.7;
						if(dx*dx+dy*dy<fy){
							let tt=1-(dx*dx+dy*dy)/(fy);
							tt=0.03*Math.sqrt(tt);
							let tx=tt*(mouse.x-window.outerWidth/2);
							let ty=tt*(mouse.y-window.outerHeight/2);
							tv[x][y].x+=(tx-(tb[x][y].x-pk*x));
							tv[x][y].y+=(ty-(tb[x][y].y-pk*y));
						}
					})();
					if(blink>0)(function(){
						let dx=Math.min(Math.abs(pk*x-setting.eye.x),Math.abs(pk*x-(2*setting.mouth.x-setting.eye.x)));
						let dy=(pk*y-setting.eye.y);
						if(dx*dx+dy*dy<fy/3){
							let tt=1-(dy*dy)/(fy/3);
							tt=0.06*tt;
							let tx=tt*0;
							let ty=tt*blink;
							if(dy>0)ty=-ty;
							if(Math.abs(dy)<pk)ty=0;
							tv[x][y].x+=(tx);
							tv[x][y].y+=(ty);
						}
					})();
					tv[x][y].x*=0.86;
					tv[x][y].y*=0.86;
				}
			}
			if(blink>-1500){
				blink-=20;
			}else if(Math.random()<0.015){
				blink=700+Math.random()*100;
			}
			for(let x=0;x<xw;x++){
				for(let y=0;y<xh;y++){
					tb[x][y].x+=tv[x][y].x/200;
					tb[x][y].y+=tv[x][y].y/200;
					if(x+1<xw&&y+1<xh){
						let px=(tb[x+1][y].x-tb[x][y].x);
						let py=(tb[x][y+1].y-tb[x][y].y);
						if(px<=0||py<=0)continue;
						ctx.translate(tb[x][y].x,tb[x][y].y);
						ctx.transform(1,(tb[x+1][y].y-tb[x][y].y)/px,(tb[x][y+1].x-tb[x][y].x)/py,1,0,0);
						let ut=2;
						ctx.drawImage(graph,x*pk,y*pk,ut*pk,ut*pk,0,0,px*ut,py*ut);
						ctx.setTransform(1,0,0,1,0,0);
					}
				}
			}
		},20);
	}
}
