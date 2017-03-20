(function() {
	window.layerUtils = {
		iAlert: function(layerContent, callBack,btnContent) {
			if(!!document.getElementById("layerAlertModel"))return false;
			var layerEl = document.createElement("div");
			layerEl.id = "layerAlertModel";
			layerEl.style.cssText = "position:fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,.3);z-index: 4000;";
			document.body.appendChild(layerEl);
			var layerHtml = '<div style="position: absolute;left:50%;top:50%;background: #EAEAEA;z-index:5000;border:1px solid #D6D6D6;border-radius: 10px;width: 20%;height: auto;margin-left: -10%;margin-top: -10%;text-align: center;font-size:16px;color:#515763;">' +
				'<p style="margin:10px 10px 55px 10px;padding:25px 10px;word-break:break-all;">' +
				(typeof layerContent === "string"?layerContent:(layerContent && JSON.stringify(layerContent) || "")) +
				'</p><div style="height: 45px;line-height:45px;border-top: 1px solid #D6D6D6;position: absolute;bottom: 0;width: 100%;">' +
				'<a id="layerModelBtn" href="javascript:void(0);" style="display:block;color: #515763;">' + (btnContent||"确定") + '</a></div></div>';
			var layerModelNode = document.getElementById("layerAlertModel");
			layerModelNode.innerHTML = layerHtml;
			document.getElementById("layerModelBtn").addEventListener("click", function(e) {
				layerModelNode.parentNode.removeChild(layerModelNode);
				if(typeof callBack === "function")callBack();
				e.stopPropagation();
			});
		},
		iLoading:function(isShow,showContent){
			if(typeof isShow === "boolean"){
				var layerLoadingDom = document.getElementById("layerLoadingModel");
				isShow?createModel(layerLoadingDom,showContent):layerLoadingDom && layerLoadingDom.parentNode.removeChild(layerLoadingDom);
			}
			function createModel(layerLoadingDom,showContent){
				if(layerLoadingDom)layerLoadingDom.parentNode.removeChild(layerLoadingDom);
				var layerEl = document.createElement("div");
				layerEl.id = "layerLoadingModel";
				layerEl.style.cssText = "position:fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,.1);z-index: 4000;";
				document.body.appendChild(layerEl);
				var layerHtml = '<div style="position: absolute;left:50%;top:50%;background:rgba(0, 0, 0, .5);z-index:5000;border:1px solid #D6D6D6;border-radius: 10px;width:100px;height: auto;margin-left: -50px;margin-top: -60px;text-align: center;font-size:16px;color:#FFF;">' +
					'<div style="background: url(/image/ajaxLoading.gif);width: 46px;height: 46px;background-size: 46px;margin: 10px auto;"></div><p>' +
					(showContent || "请稍等...") + '</p></div>';
				document.getElementById("layerLoadingModel").innerHTML = layerHtml;				
			}
		}
	}
})();
