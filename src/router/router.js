import Vue from 'vue'
import VueRouter from 'vue-router'
export default(function() {
	Vue.use(VueRouter);
	const routes = [{
		path: '/home/home',
		name: 'home',
		meta: { title: "万达广场首页", isLogin: false },
		component: require('../components/home/home.vue')
	}, {
		path: '/home/aboutOur',
		name: 'aboutOur',
		meta: { title: "关于我们", isLogin: false },
		component: function(resolve) { require(['../components/home/aboutOur.vue'], resolve) }
	}, {
		path: '/home/bulletinBoard',
		name: 'bulletinBoard',
		meta: { title: "公告栏", isLogin: false },
		component: function(resolve) { require(['../components/home/bulletinBoard.vue'], resolve) }
	}, {
		path: '/life/lifeHome',
		name: 'lifeHome',
		meta: { title: "生活服务", isLogin: false },
		component: function(resolve) { require(['../components/life/lifeHome.vue'], resolve) }
	}, {
		path: '/life/shopdetails',
		name: 'shopdetails',
		meta: { title: "商品详情", isLogin: false },
		component: function(resolve) { require(['../components/life/shopdetails.vue'], resolve) }
	}, {
		path: '/shopping/shoppingHome',
		name: 'shoppingHome',
		meta: { title: "购物车", isLogin: false },
		component: function(resolve) { require(['../components/shopping/shoppingHome.vue'], resolve) }
	}, {
		path: '/shopping/orderPay',
		name: 'orderPay',
		meta: { title: "支付", isLogin: true, showBottom: true },
		component: function(resolve) { require(['../components/shopping/orderPay.vue'], resolve) }
	}, {
		path: '/shopping/orderSuccess',
		name: 'orderSuccess',
		meta: { title: "下单成功", isLogin: false },
		component: function(resolve) { require(['../components/shopping/orderSuccess.vue'], resolve) }
	}, {
		path: '/memberCenter/memberHome',
		name: 'memberHome',
		meta: { title: "会员中心", isLogin: true },
		component: function(resolve) { require(['../components/memberCenter/memberHome.vue'], resolve) }
	}, {
		path: '/memberCenter/callPasswd',
		name: 'callPasswd',
		meta: { title: "找回密码", isLogin: false },
		component: function(resolve) { require(['../components/memberCenter/callPasswd.vue'], resolve) }
	}, {
		path: '/memberCenter/login',
		name: 'login',
		meta: { title: "登陆", isLogin: false },
		component: function(resolve) { require(['../components/memberCenter/login.vue'], resolve) }
	}, {
		path: '/memberCenter/memberPoints',
		name: 'memberPoints',
		meta: { title: "会员积分卡", isLogin: true },
		component: function(resolve) { require(['../components/memberCenter/memberPoints.vue'], resolve) }
	}, {
		path: '/memberCenter/messageboard',
		name: 'messageboard',
		meta: { title: "留言板", isLogin: true },
		component: function(resolve) { require(['../components/memberCenter/messageboard.vue'], resolve) }
	}, {
		path: '/memberCenter/messageInput',
		name: 'messageInput',
		meta: { title: "留言", isLogin: true },
		component: function(resolve) { require(['../components/memberCenter/messageInput.vue'], resolve) }
	}, {
		path: '/memberCenter/myCoupon',
		name: 'myCoupon',
		meta: { title: "优惠券", isLogin: true },
		component: function(resolve) { require(['../components/memberCenter/myCoupon.vue'], resolve) }
	}, {
		path: '/memberCenter/myReservation',
		name: 'myReservation',
		meta: { title: "预定记录", isLogin: true },
		component: function(resolve) { require(['../components/memberCenter/myReservation.vue'], resolve) }
	}, {
		path: '/memberCenter/myReserve',
		name: 'myReserve',
		meta: { title: "预定", isLogin: true },
		component: function(resolve) { require(['../components/memberCenter/myReserve.vue'], resolve) }
	}, {
		path: '/memberCenter/orderAll',
		name: 'orderAll',
		meta: { title: "全部订单", isLogin: true },
		component: function(resolve) { require(['../components/memberCenter/orderAll.vue'], resolve) }
	}, {
		path: '/memberCenter/orderDetail',
		name: 'orderDetail',
		meta: { title: "订单详情", isLogin: true },
		component: function(resolve) { require(['../components/memberCenter/orderDetail.vue'], resolve) }
	}, {
		path: '/memberCenter/personInfo',
		name: 'personInfo',
		meta: { title: "个人信息", isLogin: true },
		component: function(resolve) { require(['../components/memberCenter/personInfo.vue'], resolve) }
	}, {
		path: '/memberCenter/pointsChange',
		name: 'pointsChange',
		meta: { title: "积分记录", isLogin: true },
		component: function(resolve) { require(['../components/memberCenter/pointsChange.vue'], resolve) }
	}, {
		path: '/memberCenter/register',
		name: 'register',
		meta: { title: "注册", isLogin: false },
		component: function(resolve) { require(['../components/memberCenter/register.vue'], resolve) }
	}, {
		path: '/memberCenter/resetPassd',
		name: 'resetPassd',
		meta: { title: "重设密码", isLogin: false },
		component: function(resolve) { require(['../components/memberCenter/resetPassd.vue'], resolve) }
	}, {
		path: '/memberCenter/signPage',
		name: 'signPage',
		meta: { title: "签到记录", isLogin: true },
		component: function(resolve) { require(['../components/memberCenter/signPage.vue'], resolve) }
	}, {
		path: '/memberCenter/twoCode',
		name: 'twoCode',
		meta: { title: "二维码", isLogin: true },
		component: function(resolve) { require(['../components/memberCenter/twoCode.vue'], resolve) }
	},{ 
		path: "*", redirect: '/home/home' //默认首页
	}];
	const router = new VueRouter({ routes: routes });
//	router.push('/home/home');
	router.afterEach(function(to, from, next) {
		console.log('成功导航到: ' + to.name);
		sessionStorage.setItem("pageCode", to.name || "");
		sessionStorage.setItem("prePageCode", from.name || sessionStorage.getItem("prePageCode") || "");
		document.getElementById("footer").style.display = !!to.meta.showBottom ? "none" : "block";
	});
	router.beforeEach(function(to, from, next) {
		console.log("开始路由---全局钩子开始：" + to.name);
		if(to.meta.isLogin && !sessionStorage.getItem("token")) {
			sessionStorage.setItem("toLoginPageCode", to.name);
			next({ name: "login" })
		} else {
			next();
		}
	});
	return router;
})()