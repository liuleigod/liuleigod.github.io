window.onload=function(){
	var bgm_text=document.querySelector('.bgm_text');
	var bgm_btn_play=document.querySelector('.bgm_btn_play');
	var bgm_btn_stop=document.querySelector('.bgm_btn_stop');
	var bgm_btn_next=document.querySelector('.bgm_btn_next');
	var bgm=document.getElementById('bgm');
	//播放暂停
	bgm_btn_play.onclick=function(){
		bgm.play();
	}
	bgm_btn_stop.onclick=function(){
		bgm.pause();
	}
	if(localStorage.getItem('bgm_gds')!=null){
		bgm.setAttribute('value',localStorage.getItem('bgm_gds'));
		bgm.innerHTML='<source src="bgm/'+localStorage.getItem('bgm_gds')+'.mp3" type="audio/mpeg">';
		bgm_text.innerHTML='播放第'+localStorage.getItem('bgm_gds')+'首歌曲';
	}else{
		bgm.setAttribute('value',1);
		bgm.innerHTML='<source src="http://music.163.com/song/media/outer/url?id=1381755293.mp3" type="audio/mpeg">';
		bgm_text.innerHTML='播放第1首歌曲';
	} 
	//下一首
	bgm_btn_next.onclick=function(){
		var bgm_gds=bgm.getAttribute('value');
		if(bgm_gds<1){
			bgm_gds++;
		}else{
			bgm_gds=1;
		}
		bgm.innerHTML='<source src="http://music.163.com/song/media/outer/url?id=1381755293.mp3" type="audio/mpeg">';
		bgm_text.innerHTML='播放第'+bgm_gds+'首歌曲';
		bgm.load();
		bgm.play();
		bgm.setAttribute('value',bgm_gds);
		localStorage.setItem('bgm_gds',bgm_gds);
	}
	bgm.onended=function(){
		bgm_btn_next.click();
	};
	//重置
	var bgm_btn_rest=document.querySelector('.bgm_btn_rest');
	bgm_btn_rest.onclick=function(){
		bgm.pause();
		setTimeout(function(){
			localStorage.removeItem('bgm_gds');
			localStorage.removeItem('bgm_time');
			bgm.setAttribute('value',1);
			bgm.innerHTML='<source src="http://music.163.com/song/media/outer/url?id=1381755293.mp3" type="audio/mpeg">';
			bgm_text.innerHTML='播放第1首歌曲';
			bgm.load();
			bgm.play();
		},200);
	}
	//切换或刷新页面音轨补偿,1s后开始补偿
	setTimeout(function(){
		//如果发现本地有存储，则进行音轨补偿
		if(localStorage.getItem('bgm_time')!=null){
			bgm.currentTime=localStorage.getItem('bgm_time');
			bgm.play();
			/*音量逐渐增大*/
		    bgm.volume = 0;
  			v = 0;
            var t = setInterval(function(){
                v+= 0.005;
                if(v<=1){
            		bgm.volume = v;
                }else{
                    clearInterval(t);
                }
            },25);
		}
		//每100ms周期执行播放进度记录
		window.setInterval(function(){
			//检查浏览器是否支持本地存储
			if(typeof(Storage)!=='undefined'){
				localStorage.setItem('bgm_time',bgm.currentTime);
			}else{
				var doc_body=document.querySelector('body');
				doc_body.innerHTML="<h1>抱歉，您的浏览器过久，不支持localStorage本地存储。请更换新的浏览器再试</h1>";
			}
		},100);
		//初始化就启动bgm
		bgm.play();
	    bgm.volume = 0;
   		v = 0;
        var t = setInterval(function(){
            v+= 0.005;
            if(v<=1){
                bgm.volume = v;
            }else{
                clearInterval(t);
            }
        },25);
	},1000);
}
