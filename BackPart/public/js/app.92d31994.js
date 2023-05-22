(function(){"use strict";var e={7438:function(e,t,n){var r=n(144),o=n(998),a=n(6232),i=n(6190),u=n(4145),s=n(8271),l=n(4324),c=n(5808),d=n(4525),f=n(5187),m=n(5200),p=n(3059),v=n(4528),g=n(9709),h=n(3687),b=n(2540),y=function(){var e=this,t=e._self._c;return t(o.Z,{attrs:{id:"inspire"}},[t(g.Z,{attrs:{fixed:"",app:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[t(u.Z,{staticClass:"mx-auto",attrs:{"max-width":"300",tile:""}},[t(c.Z,{attrs:{dense:""}},[t(b.Z,[e._v("MENU")]),e._l(e.menuItems,(function(n,r){return t(d.Z,{key:r,attrs:{exact:"",router:"",to:{name:n.router}}},[t(f.Z,[t(l.Z,[e._v(e._s(n.icon))])],1),t(m.km,[t(m.V9,[e._v(e._s(n.text))])],1)],1)}))],2)],1)],1),t(a.Z,{attrs:{color:"indigo",dark:"",fixed:"",app:""}},[t(i.Z,{attrs:{icon:""},on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}},[t(l.Z,[e._v("mdi-menu")])],1),t("div",{staticStyle:{"font-size":"large"}},[e._v("ALLIN")]),t(h.Z),e.isLogin?t("div",[e._v(e._s(e.userInfo.name))]):t(i.Z,{attrs:{elevation:"0",color:"rgba(0,0,0,0)",router:"",to:{name:"login"}}},[t(l.Z,{attrs:{small:""}},[e._v("mdi-login")]),e._v("Login")],1),e.isLogin?t(v.Z,{attrs:{dense:"","offset-y":""},scopedSlots:e._u([{key:"activator",fn:function({attrs:n,on:r}){return[t(i.Z,e._g(e._b({staticClass:"ma-3",attrs:{icon:"",small:""}},"v-btn",n,!1),r),[t(l.Z,[e._v("mdi-dots-vertical")])],1)]}}],null,!1,4195494413)},[t(c.Z,[t(d.Z,{attrs:{exact:"",router:"",to:{name:"mypage"}}},[t(f.Z,[t(l.Z,[e._v("mdi-account")])],1),t(m.km,[t(m.V9,[e._v("마이페이지")])],1)],1),t(d.Z,{attrs:{exact:""},on:{click:e.logout}},[t(f.Z,[t(l.Z,[e._v("mdi-logout")])],1),t(m.km,[t(m.V9,[e._v("로그아웃")])],1)],1)],1)],1):e._e()],1),t(p.Z,[t("router-view")],1),t(s.Z,{attrs:{color:"indigo",app:""}},[t("span",{staticClass:"white--text"},[e._v("© 2023")])])],1)},x=[],Z=n(629),_={data:()=>({drawer:null}),computed:{...(0,Z.rn)(["menuItems","isLogin","userInfo"])},methods:{...(0,Z.nv)(["logout"])}},w=_,P=n(1001),k=(0,P.Z)(w,y,x,!1,null,null,null),E=k.exports,L=n(8345);n(7658);r.ZP.use(Z.ZP);var C=new Z.ZP.Store({state:{isLogin:!1,isLoginError:!1,userInfo:null,allUsers:[{userNo:1,name:"AAA",email:"aaa@naver.com",password:"1234"},{userNo:2,name:"BBB",email:"bbb@naver.com",password:"1234"},{userNo:3,name:"CCC",email:"ccc@naver.com",password:"1234"}],menuItems:[{text:"대시보드",icon:"mdi-view-dashboard-outline",router:"dashboard"},{text:"프로젝트",icon:"mdi-bulletin-board",router:"project"},{text:"산출물현황",icon:"mdi-clipboard-search-outline",router:"outputStatus"},{text:"사용로그",icon:"mdi-clipboard-text-clock-outline",router:"useLog"},{text:"환경설정",icon:"mdi-cog-outline",router:"setting"}],summary:[{text:"완료",type:"success",data:3},{text:"진행",type:"info",data:3},{text:"취소",type:"warning",data:1},{text:"지연",type:"error",data:1}],headers:[{text:"프로젝트명",value:"Pname",sortable:!1},{text:"프로젝트 번호",value:"Pno",align:"start"},{text:"담당자",value:"user_name"},{text:"상태",value:"state"},{text:"시작일",value:"start_date"},{text:"완료예정일",value:"deadline"},{text:"종료일",value:"end_date"},{text:"",value:"actions"}],mypage_headers:[{text:"프로젝트명",value:"Pname",align:"start",sortable:!1},{text:"프로젝트 번호",value:"Pno"},{text:"상태",value:"state"},{text:"진행률",value:"progress"},{text:"D-day",value:"d_day"}]},getters:{},mutations:{loginSuccess(e,t){e.isLogin=!0,e.isLoginError=!1,e.userInfo=t},loginError(e){e.isLogin=!1,e.isLoginError=!0},logout(e){e.isLogin=!1,e.isLoginError=!1,e.userInfo=null}},actions:{login({state:e,commit:t},n){let r=null;e.allUsers.forEach((e=>{e.email===n.email&&(r=e)})),null===r||r.password!==n.password?t("loginError"):(t("loginSuccess",r),N.push({name:"dashboard"}))},logout({commit:e}){e("logout"),N.push({name:"login"})}},modules:{}});r.ZP.use(L.ZP);const S=(e,t,n)=>{C.state.isLogin,n()},j=[{path:"/",name:"dashboard",component:()=>Promise.all([n.e(434),n.e(609),n.e(154),n.e(799)]).then(n.bind(n,3799)),beforeEnter:S},{path:"/project",name:"project",component:()=>Promise.all([n.e(434),n.e(609),n.e(154),n.e(337)]).then(n.bind(n,8337)),beforeEnter:S},{path:"/outputStatus",name:"outputStatus",component:()=>Promise.all([n.e(434),n.e(609),n.e(652)]).then(n.bind(n,6652)),beforeEnter:S},{path:"/useLog",name:"useLog",component:()=>n.e(459).then(n.bind(n,4459)),beforeEnter:S},{path:"/setting",name:"setting",component:()=>n.e(32).then(n.bind(n,2032)),beforeEnter:S},{path:"/login",name:"login",component:()=>Promise.all([n.e(434),n.e(802)]).then(n.bind(n,3802))},{path:"/mypage",name:"mypage",component:()=>Promise.all([n.e(434),n.e(609),n.e(154),n.e(234)]).then(n.bind(n,7234))}],O=new L.ZP({mode:"history",base:"/",routes:j});var N=O,A=n(1705);r.ZP.use(A.Z);var I=new A.Z({});r.ZP.config.productionTip=!1,new r.ZP({router:N,store:C,vuetify:I,render:e=>e(E)}).$mount("#app")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,a){if(!r){var i=1/0;for(c=0;c<e.length;c++){r=e[c][0],o=e[c][1],a=e[c][2];for(var u=!0,s=0;s<r.length;s++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[s])}))?r.splice(s--,1):(u=!1,a<i&&(i=a));if(u){e.splice(c--,1);var l=o();void 0!==l&&(t=l)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[r,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{32:"3cd34ff0",154:"378dd1ef",234:"a79be14c",337:"2d3f50eb",434:"80283264",459:"9e0540b4",609:"576447f5",652:"f8eac1c1",799:"ddb15a69",802:"b3ff9499"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{32:"1ecf3cab",337:"30e86a3d",434:"739e6d45",459:"1ecf3cab",609:"9f712fe9",652:"1ecf3cab",799:"a528d547",802:"5064be15"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="allin:";n.l=function(r,o,a,i){if(e[r])e[r].push(o);else{var u,s;if(void 0!==a)for(var l=document.getElementsByTagName("script"),c=0;c<l.length;c++){var d=l[c];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==t+a){u=d;break}}u||(s=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,n.nc&&u.setAttribute("nonce",n.nc),u.setAttribute("data-webpack",t+a),u.src=r),e[r]=[o];var f=function(t,n){u.onerror=u.onload=null,clearTimeout(m);var o=e[r];if(delete e[r],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(e){return e(n)})),t)return t(n)},m=setTimeout(f.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=f.bind(null,u.onerror),u.onload=f.bind(null,u.onload),s&&document.head.appendChild(u)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,n,r,o){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var i=function(n){if(a.onerror=a.onload=null,"load"===n.type)r();else{var i=n&&("load"===n.type?"missing":n.type),u=n&&n.target&&n.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+u+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=i,s.request=u,a.parentNode&&a.parentNode.removeChild(a),o(s)}};return a.onerror=a.onload=i,a.href=t,n?n.parentNode.insertBefore(a,n.nextSibling):document.head.appendChild(a),a},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){o=i[r],a=o.getAttribute("data-href");if(a===e||a===t)return o}},r=function(r){return new Promise((function(o,a){var i=n.miniCssF(r),u=n.p+i;if(t(i,u))return o();e(r,u,null,o,a)}))},o={143:0};n.f.miniCss=function(e,t){var n={32:1,337:1,434:1,459:1,609:1,652:1,799:1,802:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}}(),function(){var e={143:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=a);var i=n.p+n.u(t),u=new Error,s=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;u.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",u.name="ChunkLoadError",u.type=a,u.request=i,o[1](u)}};n.l(i,s,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,i=r[0],u=r[1],s=r[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(o in u)n.o(u,o)&&(n.m[o]=u[o]);if(s)var c=s(n)}for(t&&t(r);l<i.length;l++)a=i[l],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(c)},r=self["webpackChunkallin"]=self["webpackChunkallin"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(7438)}));r=n.O(r)})();
//# sourceMappingURL=app.92d31994.js.map