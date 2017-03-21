<template>
	<div id="aboutOur" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="bgstyle clearfix merchant">
					<div class="about-shop-img"><img v-bind:src="storeInfo.logo"></div>
					<div class="about-shop-name" v-text="storeInfo.name"></div>
				</div>
				<div class="shopings">
					<ul>
						<li class="bgstyle"><em>店铺电话：</em>
							<a v-bind:href="'tel:'+storeInfo.phone" v-text="storeInfo.phone"></a>
						</li>
						<li class="bgstyle"><em>店铺地址：</em><span v-text="storeInfo.address"></span></li>
						<li class="bgstyle"><em>营业时间：</em><span v-text="storeInfo.open_time+' 至 '+storeInfo.end_time"></span></li>
					</ul>
				</div>
				<div class="bgstyle about-conter">
					{{storeInfo.name}}介绍<br />
					{{storeInfo.note||"无"}}
					<p>{{storeInfo.name}}全体员工</p> 
				</div>				
			</article>	
		</section>
	</div>
</template>
<style>
	.about-conter {
	    color: #333;
	    font-size: 0.8rem;		
	}
	.about-conter p{
		text-align: right;
		margin: 3rem 0 2rem 0;
	}
	#aboutOur .merchant{
		display: -webkit-flex;
	    display: flex;
	    -webkit-justify-content: center;
	    justify-content: center;
	    -webkit-align-items: center;
	    align-items: center;
	    -webkit-flex-direction: column;
	    flex-direction: column;		
	    background-color: #EAEAEA;
	}
	#aboutOur .about-shop-img img{
		border-radius: 50%;
		margin-top: 0.5rem;
		width: 5rem;
		height:5rem;
	}
	#aboutOur .about-shop-name{
		margin: 1rem 0;
	}

</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		storeInfo:{}
        	}
        },    	
        mounted: function () {
	      	console.log("加载首页...");
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#aboutOur").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");	      	
            this.storeInfo = JSON.parse(sessionStorage.getItem("storeInfo")); 
        },
        methods: {
            backPage: function () {
            	layerUtils.iAlert("正在开发，敬请期待...");
           }
        }
    }
</script>
