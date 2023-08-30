(function(n,a){typeof exports=="object"&&typeof module<"u"?module.exports=a(require("vue")):typeof define=="function"&&define.amd?define(["vue"],a):(n=typeof globalThis<"u"?globalThis:n||self,n.index=a(n.vue))})(this,function(n){"use strict";const a=n.defineComponent({name:"Loading",render(){return n.createVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024",class:"loading"},[n.createVNode("path",{d:"M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z",fill:"currentColor"},null)])}});function l(o,s,c,i){return s&&(o+=`-${s}`),c&&(o+=`__${c}`),i&&(o+=`--${i}`),o}function k(o){return{b:(t="")=>l(o,t,"",""),e:(t="")=>t?l(o,"",t,""):"",m:(t="")=>t?l(o,"","",t):"",be:(t="",r="")=>t&&r?l(o,t,r,""):"",bm:(t="",r="")=>t&&r?l(o,t,"",r):"",em:(t="",r="")=>t&&r?l(o,"",t,r):"",bem:(t="",r="",C="")=>t&&r&&C?l(o,t,r,C):"",is:(t,r)=>r?`is-${t}`:""}}function f(o){const s=`k-${o}`;return k(s)}const y={color:String,size:[Number,String]},B=n.defineComponent({name:"k-icon"}),b=n.defineComponent({...B,props:y,setup(o){const s=o,c=f("icon"),i=n.computed(()=>!s.size&&!s.color?{}:{...s.size?{"font-size":s.size+"px"}:{},...s.color?{color:s.color}:{}});return(d,p)=>(n.openBlock(),n.createElementBlock("i",{class:n.normalizeClass(n.unref(c).b()),style:n.normalizeStyle(i.value)},[n.renderSlot(d.$slots,"default")],6))}});function m(o){return o.install=function(s){const{name:c}=o;s.component(c,o)},o}const u=m(b),g={size:String,type:{type:String,validator:o=>["primary","success","warning","danger","info","default"].includes(o),default:""},round:Boolean,loading:Boolean,disabled:Boolean,nativeType:{type:String,default:"button"},iconPlacement:{type:String,default:""}},h={click:o=>o instanceof MouseEvent,mousedown:o=>o instanceof MouseEvent},w=["type","disabled"],z=n.defineComponent({name:"k-button",inheritAttrs:!1}),_=n.defineComponent({...z,props:g,emits:h,setup(o,{emit:s}){const c=f("button"),i=n.useSlots(),d=e=>{s("click",e)},p=e=>{s("mousedown",e)};return(e,$)=>(n.openBlock(),n.createElementBlock("button",{class:n.normalizeClass([n.unref(c).b(),n.unref(c).m(e.type),n.unref(c).m(e.size),n.unref(c).is("round",e.round),n.unref(c).is("loading",e.loading),n.unref(c).is("disabled",e.disabled)]),type:e.nativeType,disabled:e.disabled||e.loading,onClick:d,onMousedown:p},[e.iconPlacement==="left"?(n.openBlock(),n.createBlock(n.unref(u),{key:0},{default:n.withCtx(()=>[e.loading?(n.openBlock(),n.createBlock(n.unref(a),{key:0})):n.unref(i).icon?(n.openBlock(),n.createBlock(n.resolveDynamicComponent(n.unref(i).icon),{key:1})):n.createCommentVNode("",!0)]),_:1})):n.createCommentVNode("",!0),n.renderSlot(e.$slots,"default"),e.iconPlacement==="right"?(n.openBlock(),n.createBlock(n.unref(u),{key:1},{default:n.withCtx(()=>[e.loading?(n.openBlock(),n.createBlock(n.unref(a),{key:0})):n.unref(i).icon?(n.openBlock(),n.createBlock(n.resolveDynamicComponent(n.unref(i).icon),{key:1})):n.createCommentVNode("",!0)]),_:1})):n.createCommentVNode("",!0)],42,w))}});return m(_)});