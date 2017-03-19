<template>
	<div id="login" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="login-head">
					<img src="../../images/login_in_head_img@2x.png"/>
				</div>
				<div class="login-menberName">
					<img src="src/images/login_in_member@2x.png"/><input v-model="loginParam.username" type="text"  placeholder="手机号/账号/用户名" maxlength="30"/>
				</div>
				<div class="login-menberName login-possd">
					<img src="src/images/login_in_password@2x.png"/><input v-model="loginParam.password" type="password"  placeholder="登录密码" maxlength="20"/>
				</div>
				<div class="login-now" v-on:click="login()" >登录</div>
				<div class="login-other">
					<router-link :to="{name:'register'}" href="javascript:void(0)" class="login-o-get">快速注册</router-link>
					<router-link :to="{name:'callPasswd'}" href="javascript:void(0)" class="login-o-forget">忘记密码？</router-link>
				</div>
			</article>	
		</section>
	</div>
</template>
<style>
	#login .content{
		background-color: #fff;
	}
	.login-menberName{
		position: relative;
		top: 4rem;
		width: 80%;
		height: 2.533333333333333rem;
		line-height: 2.533333333333333rem;
		margin: 0 10%;
		border: 1px solid #ccc;
		border-radius: 38px;
		padding: 0 0.6rem;
		display: -webkit-flex;
		display: flex;
		-webkit-align-items: center;
		align-items: center;
	}
	.login-menberName img{
		width: 1.2rem;
		height: 1.2333333333333334rem;
		margin: 0 0.8rem 0 0.5rem;
	}
	.login-menberName input{
		font-size: 0.8666666666666667rem;
		color: #999;
		border: 0;
		width: 80%;
		height: 2rem;
		margin-bottom: 0.16666666666666666rem;
	}
	.login-possd{
		margin-top: 1rem;
	}
	.login-possd img{
		height: 1.4666666666666666rem;
	}		
	.login-explant{
		position: relative;
		top:4.666666666666667rem ;
		width: 80%;
		margin: 0 10%;
	}
	.login-explant .login-time{
		font-size: 1rem;
		color: #333;
	}
	.login-explant .login-time-n{
		margin-left: 1.0666666666666667rem;
		font-size: 1rem;
		color: #000;
		font-weight: bold;
		border-bottom: 1px solid #ccc;
		padding: 0 0 0.5rem 0.4rem;
		display: inline-block;
		width: 61%;
	}
	.login-now{
		margin: 6rem 10% 0 10%;
		width: 80%;
		height: 2.6666666666666665rem;
		line-height: 2.6666666666666665rem;
		background-color: #14b6f5;
		text-align: center;
		font-size: 1rem;
		color: #fff;
		border-radius: 40px;
	}
	.login-other{
		margin-top: 2rem;
		width: auto;
		height: 3rem;
		line-height: 3rem;
		font-size: 1.2rem;
	}
	.login-other .login-o-get{
		text-decoration: underline;
		margin-left: 1.2rem;
		color: #0b83dc;
	}
	.login-other .login-o-forget{
		position: absolute;
		right: 1.2rem;
		text-decoration: underline;
		color: #0b83dc;
	}
	.login-time-select{
	    border: 0;
  		appearance:none;
  		-moz-appearance:none;
  		-webkit-appearance:none;
    	font-size: 1.2rem;
    	font-weight: bold;
    	width: 100%;
    	background-color: #fff;
	}
	.login-head{
		position: relative;
		width: 100%;
		height: 8.233333333333333rem;
		background: linear-gradient(to right top,#14b6f5,#6ed6ff);
	}
	.login-head img{
		width: 5.466666666666667rem;
		height: 5.466666666666667rem;
		position: absolute;
		display: inline-block;
		bottom: -1rem;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		loginParam:{
        			shopid:configuration.global.shopid,
        			username:"",
        			password:""
        		}
        	}
        },    	
        mounted: function () {
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#login").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
        },
        methods: {
        	isEnNumeric:function(strValue){
        		// 判断是否为英文、数字、字母或_
				var pattern = /^[_0-9a-zA-Z]+$/;  
				return pattern.test(strValue);        		
        	},        	
        	login:function(){
        		if(this.checkParam()){
			        this.$http.post(configuration.global.serverPath + "/api/login/login",this.loginParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
			         	var results = response.data;
		                if(results.code === 200){
		                	sessionStorage.setItem("token",results.data.token);
		                	this.$router.push({name:sessionStorage.getItem("toLoginPageCode")});
		                }else if(results.code === -1){
		                    layerUtils.iAlert(results.data);
		                }else{
		                	layerUtils.iAlert(results.message);
		                }
			        },function (response) {
			        	alert(JSON.stringify(response.data));
			        });         			
        		}else{
        			layerUtils.iAlert("请输入正确的用户名密码");
        		}
        	},
		    checkParam:function(){
		    	return (!!this.loginParam.username && this.isEnNumeric(this.loginParam.username)) && (this.loginParam.password && this.loginParam.password.replace(/\s/g,"").length > 0);
		    }
        }
    }
</script>
