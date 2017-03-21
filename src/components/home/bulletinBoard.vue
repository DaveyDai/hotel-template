<template>
	<div id="bulletinBoard" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="mess-bulls">
					<div class="bulls-mess-img"><img src="../../images/home_news_img@2x 2.png"/></div>
					<div class="bulls-mess-contenx">
						<div class="bulls-mess-titel">
							<span class="title-t-n">最新咨询</span><span class="title-mess-time">2017年3月21日 15:29:24</span>
						</div>
						<div class="bull-mess-c">恭喜万达广场商城阳光公众平台（微商城）正式起航。我的地盘，我做主</div>
					</div>	
				</div>
				<div class="mess-bulls">
					<div class="bulls-mess-img"><img src="../../images/home_recommend_img@2x 2.png"/></div>
					<div class="bulls-mess-contenx">
						<div class="bulls-mess-titel">
							<span class="title-t-n">今日推荐</span><span class="title-mess-time">2017年3月21日 15:29:24</span>
						</div>
						<div class="bull-mess-c">恭喜万达广场商城阳光公众平台（微商城）正式起航。我的地盘，我做主</div>
					</div>	
				</div>
			</article>	
		</section>
	</div>
</template>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		getNotice:{
        			text:"优雅 休闲 浪漫的主题 特色 开启您的DIY生活空间"
        		}
        	}
        },    	
        mounted: function () {
	      	console.log("加载首页...");
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#messageboard").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
//          this.getNotice();
        },
        methods: {
            backPage: function () {
                if (window.history && window.history.pushState) {
                    window.history.back();
                }
          	},
			getNotice:function(){
		         this.$http.post(configuration.global.serverPath + "/api/Tabbar/getNotice",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		 this.getNotice = results.data;
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
		    }          
        }
    }
</script>
<style>
	#bulletinBoard .content{
		padding: 0 0.67rem;
		background-color: #fff;
	}
	.mess-bulls{
		position: relative;
		width: 100%;
		height: 5.833333333333333rem;
		border-bottom: 1px solid #E5E5E5;
		display: -webkit-flex;
		display: flex;
		-webkit-align-items: center;
		align-items: center;
	}
	.mess-bulls .bulls-mess-img{
		padding: 0 0.93rem 0.67rem 0.2rem;
	}
	.mess-bulls .bulls-mess-img img{
		width: 2.9rem;
		height: 2.9rem;
	}
	.bulls-mess-contenx{
		padding-top: 0.4rem;
	}
	.bulls-mess-contenx .bulls-mess-titel{
		height: 2rem;
		line-height: 2rem;
	}
	.bulls-mess-contenx .title-t-n{
		height: 2rem;
		line-height: 2rem;
		font-size: 1rem;
		color: #333;
		font-weight: bold;
	}
	.bulls-mess-contenx .bull-mess-c{
		font-size: 0.87rem;
		color: #666;
	}
	.bulls-mess-contenx .title-mess-time{
		position: absolute;
		right: 0;
		font-size: 0.87rem;
		color: #999;		
	}
</style>