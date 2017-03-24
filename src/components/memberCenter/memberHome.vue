<template>
	<div id="memberHome" style="position: relative;">
		<div class="newmenber">
			<div class="nmtop clearfix">
				<div class="nlogo fl"><img src="../../images/member_self_image@2x.png" alt="商家logo"></div>
				<div class="newsmem">
					<div class="newsnamebox"><span class="newsmemname"><a href="javascript:void(0);"></a></span><span class="nboxvip">{{personInfo.nickname && '昵称： '||''}}{{personInfo.nickname||'未设置昵称'}}</span><span class="nboxvip"><a href="javascript:void(0);" style="color:white;"></a></span></div>
					<div class="newsmembox">
						<ul>
							<li>
								<div class="box">
									<a href="javascript:void(0);">
										<div class="nmuen1">{{personInfo.point}}</div>
										<div class="nmuen2">积分</div>
									</a>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="clearfix nmemlist">
				<ul>
					<li>
						<div class="bgstyle nsignin noshadow" v-on:click="signCheck()" >
							<div class="nmemlist1"><img src="../../images/member_sign_in@2x.png" /></div>
							<div class="nmemlist2">每日签到</div>
						</div>
					</li>
					<router-link :to="{name:'orderAll'}" tag="li" >
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_order@2x.png" /></div>
							<div class="nmemlist2">全部订单</div>
						</div>
					</router-link>
					<router-link :to="{name:'personInfo'}" tag="li" >
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_personal_data@2x.png" /></div>
							<div class="nmemlist2">个人资料</div>
						</div>
					</router-link>
					<router-link :to="{name:'memberPoints'}" tag="li" >
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_card@2x.png" /></div>
							<div class="nmemlist2">会员积分卡</div>
						</div>
					</router-link>
					<router-link :to="{name:'myReservation'}" tag="li" >
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_reserve_record@2x.png" /></div>
							<div class="nmemlist2">预订记录</div>
						</div>
					</router-link>
					<router-link :to="{name:'myReserve'}" tag="li" >
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_reserve@2x.png" /></div>
							<div class="nmemlist2">我要预订</div>
						</div>
					</router-link>
					<li>
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_guagua_card@2x.png" /></div>
							<div class="nmemlist2">刮刮卡</div>
						</div>
					</li>
					<li>
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_discount_coupon@2x.png" /></div>
							<div class="nmemlist2">优惠券</div>
						</div>
					</li>
					<li>
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_value_card@2x.png" /></div>
							<div class="nmemlist2">储值卡专区</div>
						</div>
					</li>
					<li>
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_big_plate@2x.png" /></div>
							<div class="nmemlist2">大转盘</div>
						</div>
					</li>
					<li>
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_mine_number@2x.png" /></div>
							<div class="nmemlist2">我的排号</div>
						</div>
					</li>
				</ul>
			</div>
			<!--<div class="clear clearfix logoutbox" v-on:mousedown="outLogin()" >
				<a href="javascript:void(0);">退出登录 </a>
			</div>-->
			<div class="account"><div class="account-btn" v-on:mousedown="outLogin()" >退出登录</div></div>
			<!--<div class="hotel-copyright">Copyright @ 万达广场 版权所有</div>-->
		</div>
		<div id="signCheckN" class="sign-page-tips" style="display: none;">
			<div class="tips-sign-content">
				<div class="tips-title-ok">
					<img src="../../images/member_success_img@2x.png"/>
					<span class="title-tip-yes">签到成功</span>
					<div class="tips-fenge"></div>
				</div>
				<div class="tips-title-silist">
					<p>恭喜您！明天再接再厉哦~</p>
					<div class="sign-tipss-to" @click="checkSignList()">签到记录</div>
				</div>
			</div>
			<div class="sign-tips-img" v-on:click="signHide()" ><img src="../../images/member_close_img@2x.png"/></div>
		</div>		
		<!--<div id="signTake" class="nsigninbox">
			<div class="pos_title clearfix clear"><span class="pos_hide radius5 fl" v-on:click="signHide()" >取消</span></div>
			<div class=""><span class="ndayin"><a v-on:click="signCheck()" class="radius5" href="javascript:void(0);">点击这里签到哦</a></span><span class="ndayin"><router-link :to="{name:'signPage'}" class="radius5" href="javascript:void(0);">查看签到记录</router-link></span></div>
		</div>		-->
	</div>
</template>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		personInfo:{}
        	}
        },    	
        mounted: function () {
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#memberHome .newmenber").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
            this.getPersonInfo();
        },
        methods: {
			signHide:function(){
				$("#memberHome #signCheckN").fadeOut();
			},
		    signCheck:function(){
		        this.$http.post(configuration.global.serverPath + "/api/Personal/signIn",{token:sessionStorage.getItem("token")},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		$("#memberHome #signCheckN").fadeIn();
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });			    		
		    },			
		    outLogin:function(){
		    	sessionStorage.setItem("toLoginPageCode",sessionStorage.getItem("pageCode"));
		    	sessionStorage.removeItem("token");
		    	this.$router.push({name:"login"});
		    },
		    getPersonInfo:function(){
		        this.$http.post(configuration.global.serverPath + "/api/Personal/getPersonalData",{shopid:configuration.global.shopid,token:sessionStorage.getItem("token")},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.personInfo = results.data;
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });			    		
		    },
		    checkSignList:function(){
		    	this.$router.push({name:"signPage"});
		    }
        }
    }
</script>
<style>
	.bgstyle{
		margin: -1px!important;
		box-shadow: 0 0 1px #777 inset;
	}
	#memberHome .hotel-copyright{
		margin-bottom: 50px;
	}
	#memberHome .nmemlist li,#memberHome .nmemlist li .bgstyle{
		-webkit-tap-highlight-color: rgba(200,200,200,0);
	}
	#memberHome .nmemlist{
		margin-top: 0.67rem;
		padding: 0;
		background-color: #fff;
	}
	/*签到弹出层*/
	.sign-page-tips{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.6);
		z-index: 3000;
		display: -webkit-flex;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-flex-direction:column;
		flex-direction: column;
	}
	.sign-page-tips .tips-sign-content{
		position: relative;
		width: 60%;
		height: 9.8rem;
	}
	.sign-page-tips .tips-title-ok{
		position: relative;
		width: 100%;
		height: 3.6666666666666665rem;
		background-color:#fff6da;
		border-top-left-radius: 0.7333333333333333rem;
		border-top-right-radius: 0.7333333333333333rem;
		font-size: 1.2rem;
		color: #f05638;
		font-weight: bold;
		display: -webkit-flex;
		display: flex;
		-webkit-align-items: center;
		align-items: center;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-justify-content: center;
		justify-content: center;
	}
	.sign-page-tips .tips-title-ok img{
		width: 2.3666666666666667rem;
		height: 2.3666666666666667rem;
	}
	.sign-page-tips .tips-title-ok img{
		width: 2.3666666666666667rem;
		height: 2.3666666666666667rem;
	}
	.sign-page-tips .title-tip-yes{
		margin-bottom: 1.5rem;
	}
	.sign-page-tips .tips-fenge{
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 0.14rem;
		background: url(../../images/member_img@2x.png) no-repeat;
		/*background-size:100% ;*/
		
	}
	.sign-page-tips .tips-title-silist{
		width: 100%;
		height: 5.833333333333333rem;
		background-color: #14B6F5;
		border-bottom-left-radius: 0.7333333333333333rem;
		border-bottom-right-radius: 0.7333333333333333rem;
		color: #fff;
		text-align: center;
	}
	.sign-page-tips .tips-title-silist p{
		font-size: 0.9333333333333333rem;
		padding: 0.9333333333333333rem 0 0.3333333333333333rem 0;
	}
	.sign-page-tips .sign-tipss-to{
		font-size: 0.8rem;
		border: 2px solid #fff;
		border-radius: 26px;
		display: inline-block;
		padding: 0.16666666666666666rem 1rem;
	}
	.sign-page-tips .sign-tips-img{
		text-align: center;
		margin-top: 2.933333333333333rem;
	}
	.sign-page-tips .sign-tips-img img{
		width: 70%;
		height: 70%;
	}	
</style>

