//  Tag Selectors 
var fepTagSelectors=function(e){var t=location.pathname;$("option",e).each(function(){t===$(this).data("link")&&$(this).prop("selected",!0)});e.change(function(e){var t=$("option:selected",this).data("link");t?location.pathname=t:location.href="/blog"})},fepKeepInView=function(e){$label==="SMALL"&&e.keepInView({zindex:42})},fepTabs=function(e){function r(t){$("li",e).removeClass("active");t.closest("li").addClass("active");$(".tab",e).hide();$(t.get(0).hash).show(0,function(){var t=$(this).outerHeight()+120;e.css("height",t+"px")})}var t=location.hash,n=$("ul li:first a",e);$(e).on("click","ul a",function(e){e.preventDefault();location.hash=$(this).attr("href").split(/#/)[1];r($(this))});if(t)$("ul a[href='"+t+"']",e).trigger("click");else{var i=$(window).scrollTop();r(n);location.hash=n.get(0).hash;window.scrollTo(i,0)}},fepTweet=function(e){e.tweet({username:"lunatechlabs",avatar_size:null,outro_text:'<span class="link-twitter"><a href="http://twitter.com/LunatechLabs">Follow us on Twitter!</a> <i class="icon-arrow-right"></i></span>',count:3,template:'{text}<span class="time">{time}</span><a href="{tweet_url}"><i class="icon-link"></i></a>',loading_text:"loading tweets..."})},fepHeaderPromo=function(e){function i(){if(n<t.length){t[n].prev("dt").find("a").eq(0).trigger("nextslide");n++}else{t[t.length-1].prev("dt").find("a").eq(0).trigger("nextslide");n=0}}if($label==="SMALL")return!1;var t=new Array,n=0,r=setInterval(function(){i()},8e3);$("dd",e).each(function(){$(this).data("top",$(this).offset().top);t.push($(this))});setTimeout(i,1e3);$(e).on("click nextslide","dt a",function(e){function i(){$(e.delegateTarget).animate({scrollTop:n.data("top")},800,"easeOutQuart");$("dt",e.delegateTarget).removeClass("active");t.addClass("active")}e.preventDefault();e.type==="click"&&clearTimeout(r);var t=$(this).closest("dt"),n=t.next("dd");if(t.is(".active")){t.removeClass("active");i()}else i()})},fepBlockLink=function(e){e.each(function(e,t){var n="",r=$(this).parents().get(0);if(t.nodeName==="A")n=$(this).attr("href");else{n=$("a",this).attr("href");$(r).on("click","a",function(e){e.preventDefault()})}$(r).on("click",function(e){e.preventDefault();window.location.href=n})})},fepValidation=function(e){e.each(function(){$(this).validate()})},fepCookieApproval=function(e){$.cookie.defaults.expires=4242;$.cookie.defaults.path="/";$.cookie.defaults.domian="lunatech.com";var t=$('<div class="dialog-cookies"><h3><i class="icon-info-sign"></i> Cookie Permission</h3><p>We request your permission to use cookies for Google Analytics to help us monitor and improve access to lunatech.com. The data collected is anonymised.</p><button id="cookieOkay">Approve</button></div>');t.on("click","button",function(e){$.cookie("approval","on");t.html('<div class="dialog-cookies"><h3><i class="icon-spinner icon-spin"></i> Loading Google Analytics</h3></div>');require(["ga"],function(){t.remove()})});$.cookie("approval")===undefined&&$.cookie("approval","off");$.cookie("approval")==="off"&&t.appendTo(e);$.cookie("approval")==="on"&&require(["ga"])};