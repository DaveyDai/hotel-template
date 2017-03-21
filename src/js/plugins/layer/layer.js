/**
 * 自定义弹出层  2016年12月8日  daijh
 */
(function() {
//	$.extend() 按需拓展到jq或者window  
	window.layerUtils = {
		iAlert: function(layerContent,callBack,btnContent) {
			if(!!document.getElementById("layerAlertModel"))return false;	
			var layerEl = document.createElement("div"),offsetHeight = document.body.offsetHeight;
			layerEl.id = "layerAlertModel";
			layerEl.style.cssText = "position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 4000;background:rgba(0,0,0,.4);";
			document.body.appendChild(layerEl);
			var layerHtml = '<div style="position: absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform: translate(-50%,-50%);background-color:#fff;z-index:5000;border-radius:9px;width: 76%;height: auto;text-align: center;color:#fff;">' +
				'<div style="padding:0.6rem 0;color: #000;font-size: 1rem;font-weight: bold;">提示</div>' + 
				'<div id="layerIaContent" style="padding:0 0.6rem 1.5rem 0.6rem;word-break:break-all;color: #666;font-size: 0.87rem;overflow: auto;max-height:' + offsetHeight*0.7 + 'px;">' +
				(typeof layerContent === "string"?layerContent:(layerContent && JSON.stringify(layerContent) || "")) +
				'</div><div style="padding: 0.5rem 0;border-top: 1px solid #E5E5E5;width: 100%;">' +
				'<a id="layerModelBtn" href="javascript:void(0);" style="display:block;color: #4ac60c;font-size: 0.93rem;">' + (btnContent||"确定") + '</a></div></div>';
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
					'<div style="background: url(./src/js/plugins/layer/ajaxLoading.gif);width: 46px;height: 46px;background-size: 46px;margin: 10px auto;"></div><p>' +
					(showContent || "请稍等...") + '</p></div>';
				document.getElementById("layerLoadingModel").innerHTML = layerHtml;				
			}
		}
	}
})();
