(function(t,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(t=typeof globalThis<"u"?globalThis:t||self,e(t.index={},t.vue))})(this,function(t,e){"use strict";function c(n){return n.install=function(o){const{name:u}=n;o.component(u,n)},n}const i={tag:{type:String,default:"div"},span:{type:Number,default:24},offset:{type:Number,default:0}},r=e.defineComponent({name:"k-col",props:i,setup(n,{slots:o}){const u=e.inject("KRow",0),a=e.computed(()=>{const s=[];return["span","offset"].forEach(f=>{const d=n[f];typeof d=="number"&&d>0&&s.push(`k-col-${f}-${n[f]}`)}),["k-col",...s]}),p=e.computed(()=>u!==0?{paddingLeft:u/2+"px",paddingRight:u/2+"px"}:{});return()=>{var s;return e.h(n.tag,{class:a.value,style:p.value},(s=o.default)==null?void 0:s.call(o))}}}),l=c(r);t.colProps=i,t.default=l,Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});