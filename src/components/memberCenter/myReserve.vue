<template>
	<div id="myReserve" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<!--<div class="bgstyle clearfix"> 请您按照如下要求填写，以便我们留位。 </div>-->
				<div class="bgstyle clear customer">
					<dl class="Handler"><dt>预约时间</dt>
						<dd id="reserve_time" >
							<input class="r-time" type="datetime-local" name="" id="dateDefault" v-model="reserveList.reserve_time"/>
							<span class="select-com"><img src="src/images/shop_down_arrow@2x.png"/></span>
						</dd>
						<p id="reserve_timeC" >*此选项为必填项</p>
					</dl>
					<dl><dt>预约人数</dt>
						<dd><input v-model="reserveList.number" class="radius5 inputRes" type="tel" placeholder="填写人数，以便我们安排" maxlength="6"></dd>
						<p id="numberC" >*此选项为必填项</p>
					</dl>
					<dl class="situation"><dt>预订类型</dt>
						<dd>
							<select class="r-time" name="reserveType" v-model="reserveList.reserve_id" >
								<option v-bind:value="item.id" v-for="item in reserveType" v-text="item.name"></option>
							</select>
							<span class="select-com"><img src="src/images/shop_down_arrow@2x.png"/></span>							
						</dd>

						<!--<dd id="resType">
							<span v-for="item in reserveType" >
								<input name="bx" type="radio" v-bind:checked="$index==0?'checked':''" v-bind:value="item.id" ><em>{{item.name}}</em></span> 
						</dd>-->
					</dl>
					<dl><dt>您的手机号</dt>
						<dd><input v-model="reserveList.phone" class="radius5 inputRes" type="tel" name="tel" value="" maxlength="11" datatype="Require" placeholder="填写电话，以便我们联系您"></dd>
						<p id="phoneC" >*此选项为必填项</p>
					</dl>
					<dl><dt>您的姓名</dt>
						<dd><input v-model="reserveList.name" class="radius5 inputRes" type="text" name="xm" value="" maxlength="10" datatype="Require" placeholder="在这里输入您的姓名/称呼"></dd>
						<p id="nameC" >*此选项为必填项</p>
					</dl>
					<dl><dt>您的性别</dt>
						<dd>
							<select class="r-time" name="reserveType" v-model="reserveList.sex" >
								<option value="0">男</option>
								<option value="1">女</option>
							</select>
							<span class="select-com"><img src="src/images/shop_down_arrow@2x.png"/></span>							
						</dd>
					</dl>
					<dl class="beizhushuom"><dt>备注说明</dt>
						<dd><textarea v-model="reserveList.note" class="cartextarea radius5" placeholder="填写您的备注信息，尽量控制在100字以内。" maxlength="100"></textarea></dd>
					</dl>
				</div>
				<div class="account"><div class="account-btn" v-on:mousedown="putReserve()" >确认提交</div></div>
			</article>	
		</section>
	</div>	
</template>
<script type="text/javascript">
//	var dataNew = new Date();
//	var timeD = dataNew.getFullYear() + "-" + (dataNew.getMonth() + 1) + "-" + (dataNew.getDate()+1) + "T14:00:00";
    export default {
        data: function(){
        	return {
        		reserveList:{
        			shopid:configuration.global.shopid,
        			token:sessionStorage.getItem("token"),
        			number:"",//人数
        			name:"",
        			sex:0,//男：0，女：1
        			reserve_id:"1",//预订类型
        			reserve_time:"",//预订时间
        			note:"",//备注
        			phone:""//手机号码
        		},
        		reserveType:[]
        	}
        },    	
        mounted: function () {
	      	console.log("加载首页...2014-01-02T11:42");
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#myReserve").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
            var dataNew = new Date();
          	this.reserveList.reserve_time = dataNew.getFullYear() + "-" + this.timeDeta(dataNew.getMonth()+1) + "-" + this.timeDeta(dataNew.getDate()+1) + "T14:00:00";
            this.reserveInit();
        },
        methods: {
        	reserveInit:function(){
		        this.$http.post(configuration.global.serverPath + "/api/Personal/myReserveClass",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.reserveType = results.data.data;
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
        	},
        	putReserve:function(){
        		if(this.isCheck()){
			        this.$http.post(configuration.global.serverPath + "/api/Personal/reserve",this.reserveList,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
			         	var results = response.data;
			         	if(results.code === 200){
			         		layerUtils.iAlert("预订成功",function(){
								this.$router.push({name:"myReservation"});
			         		}.bind(this));
			         	}else{
			         		layerUtils.iAlert(results.message||"请求服务器失败");
			         	}
			        }, function (response) {
			        	layerUtils.iAlert("连接服务器失败，请联系管理员");
			        });        			
        		}
        	},
        	isCheck:function(){
        		var isCheck = true;
        		this.reserveList.reserve_time = this.reserveList.reserve_time.replace(/T/," ");
        		if(!this.reserveList.reserve_time || !this.reserveList.reserve_time.replace(/\s/g,"").length){
        			document.getElementById("reserve_timeC").style.display = "block";
        			isCheck = false;
        		}
        		if(!this.reserveList.number || !this.reserveList.number.replace(/\s/g,"").length){
        			document.getElementById("numberC").style.display = "block";
        			isCheck = false;
        		}
        		if(!this.reserveList.name || !this.reserveList.name.replace(/\s/g,"").length){
        			document.getElementById("nameC").style.display = "block";
        			isCheck = false;
        		}
        		if(!this.reserveList.phone || !this.reserveList.phone.replace(/\s/g,"").length){
        			document.getElementById("phoneC").style.display = "block";
        			isCheck = false;
        		}
        		return isCheck;
        	},
        	queryInput:function(typeElem){
        		var inputValue;
        		typeElem.each(function(){
        			if(this.checked){
        				inputValue = this.value;
        				return false;
        			}
        		});
        		return inputValue;
        	},
        	timeDeta:function(time){
        		return time < 10 ? "0"+time : time;
        	}
        }
    }
</script>
<style>
	#myReserve{
		font-size: 14px;
	}
	#myReserve p{
		display: none;
		color: red;
		padding-left: 10%;
	}
	#myReserve .Handler dd{
		line-height: 38px;
	}
	#myReserve .r-time{
		-moz-appearance:none;
		-webkit-appearance:none;
		outline: none;	
		border: 0;
		width: 100%;
		height: 33px;
		z-index: 999;
	}
	#myReserve .Handler dt{
		height: 45px;
	}
	#myReserve .customer{
		margin-top: 0;
		box-shadow: none;
	}
	#myReserve .customer .beizhushuom{
		border: 0;
	}
	.select-com{
	    position: absolute;
	    right: 0.8rem;
	    top: 50%;
	    margin-top: -0.23333333333333334rem;
	    line-height: 0;
	}
	.select-com img{
		width: 0.8333333333333334rem;
		height: 0.4666666666666667rem;
	}
	#reserve_time{
		padding-top: 2px;
	}
	input,textarea,select{
		font-size:14px;
	}
</style>
