/*  ###########################################################################
    Author:     Lunatech Research
    Date:       November 2012
    ########################################################################### */// ROUTING 
require.config({baseUrl:"/scripts/minified",paths:{jquery:"jquery-1.9.0-min",validate:"jquery.validate-min",keepinview:"keepinview-min",tweet:"jquery.tweet-min",easing:"jquery.easing.1.3-min","fep-functions":"fep-functions-min",cookie:"jquery.cookie-min",ga:"http://www.google-analytics.com/ga"}});var $label=typeof window.getComputedStyle=="function"?getComputedStyle(document.body,"::before").content:!1,_gaq=_gaq||[];_gaq.push(["_setAccount","UA-6087516-1"]);_gaq.push(["_gat._anonymizeIp"]);_gaq.push(["_trackPageview"]);require(["jquery"],function(){$("html").attr("class","js");$(document).ready(function(){function t(e,t,n){this.elem=e;this.amd=t;this.func=n}function n(){var e=this.elem,t=this.func;require(this.amd,function(){if(t){var n=(new Function("return "+t))();n(e)}})}var e=[{elem:$("#twitter-feed"),amd:["fep-functions","tweet"],func:"fepTweet"},{elem:$("body"),amd:["ga"],func:!1},{elem:$(".tabs"),amd:["fep-functions"],func:"fepTabs"},{elem:$("form.validate"),amd:["fep-functions","validate"],func:"fepValidation"},{elem:$("nav"),amd:["fep-functions","keepinview"],func:"fepKeepInView"},{elem:$(".homepage #masthead dl"),amd:["fep-functions","easing"],func:"fepHeaderPromo"},{elem:$(".link-reference"),amd:["fep-functions"],func:"fepBlockLink"}];t.prototype.lazyLoad=n;for(obj in e)if(e[obj].elem.length>0){var r=new t(e[obj].elem,e[obj].amd,e[obj].func);r.lazyLoad()}})});