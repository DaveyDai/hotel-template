(function($){
	//存放请求数组
	var requestArr = [];
	//清理请求
	var clearRequest = function(){
		for(var i = 0, len = requestArr.length; i < len; i++){
			if(requestArr[i]){
				requestArr[i].abort(); //中断正在请求的ajax，会执行该请求的error和complete方法
				requestArr[i] = null;
			}
		}
		requestArr = [];
	}
	/**
	 * ajax请求数据
	 * @param url：请求的url
	 * @param param：传递的参数,这里进行utf-8编码，后端服务器需要进行相应解码，处理中文乱码问题
	 * @param callback 回调处理函数
	 * @param controllerParam 请求控制对象{
	 * 	isAsync 是否异步请求，默认是true
	 *  isShowWait：是否显示等待层 默认是false 保留功能
	 *  tipsWords 显示等待层时，显示的文字，不传默认显示"请等待..."
	 *  timeOut 超时时间默认30秒
	 * 	timeOutFunc 超时后的处理函数，默认可不传，只提示超时
	 * } 
	 */
	var ajaxRequest = function(url, param, callback, controllerParam) {
		//接口登录拦截，暂时放这里
		if(!sessionStorage.getItem("userId")){
			window.location.href = window.top&&window.top.global&&window.top.global.configuration&&window.top.global.configuration.pathUrl+"vipyun/public/login.html";
			return false;
		}		
		// 设置默认值
		controllerParam = typeof controllerParam === "undefined" ? {} : controllerParam;
		controllerParam["isAsync"] = setDefault(controllerParam["isAsync"], true);
		controllerParam["isShowWait"] = setDefault(controllerParam["isShowWait"], false);
		controllerParam["tipsWords"] = controllerParam["tipsWords"] || "请等待...";
		controllerParam["timeOut"] = controllerParam["timeOut"] || 30;
		var serverPath = window.top&&window.top.global&&window.top.global.configuration&&window.top.global.configuration.serverPath+url;
		// UTF-8编码(出现中文乱码时 打开注释)
//		for ( var key in param) {
//			if(param.hasOwnProperty(key)){
//				param[key] = typeof param[key] === "boolean" || !!param[key] ? "" : encodeURIComponent(value);
//			}
//		}
		// firefox 禁止同步请求使用 withCredentials 功能
		var xhrFields = {"withCredentials" : true};
		var iAjax = $.ajax({
			url: serverPath,
			data: param,
			type: "post",
			dataType: "json",
			async: controllerParam.isAsync,
			xhrFields : controllerParam.isAsync === false?{}:xhrFields,
			timeout: controllerParam.timeOut * 1000,
			beforeSend: function(XMLHttpRequest) {
//				if(controllerParam.isShowWait)layerUtils.iLoading(true, controllerParam.tipsWords); 
			},
			success: function(data, textStatus) {
				if(data && typeof callback === "function"){
					callback(data); 
				}else{
					alert("返回数据出错");
//					layerUtils.iAlert("返回数据出错");
				}
			},
			complete: function(XMLHttpRequest, textStatus) {
				//请求完成
			},
			error: function(XMLHttpRequest, textStatus, errorMessage) { // abort会执行error方法
				if(textStatus == "timeout"){
					iAjax.abort();
					if(typeof controllerParam.timeOutFunc === "function"){
						 timeOutFunc();
					 }else{
						 layerUtils.iAlert("请求超时");
					 }
				}
				else if(textStatus != "abort"){
					layerUtils.iAlert("请求异常");
				}
			}
		});
		requestArr.push(iAjax);
	}
	$.extend({
		ajaxRequest:ajaxRequest,
		clearRequest:clearRequest
	});
	/**
	 * 设置 boolean 变量的默认值
	 * @param originalVal 原始值 
	 * @param defaultVal 默认值
	 */
	function setDefault(originalVal, defaultVal){
		return !!originalVal ? defaultVal : originalVal;
	}	
})(jQuery);
