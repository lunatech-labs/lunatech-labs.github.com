//  Tag Selectors 
var fepTagSelectors=function(e){var t=location.pathname;console.log(t);$("option",e).each(function(){t===$(this).data("link")&&$(this).prop("selected",!0)});e.change(function(e){var t=$("option:selected",this).data("link");t?location.pathname=t:location.href="/blog"})},fepKeepInView=function(e){e.keepInView({zindex:42})},fepTabs=function(e){$("ul li:first",e).addClass("active");$(e).on("click","a",function(t){t.preventDefault();$("li",e).removeClass("active");$(this).closest("li").addClass("active");$("div[id*='tab']",t.delegateTarget).hide();$(this.hash).show(0,function(){var e=$(this).outerHeight()+120;$(t.delegateTarget).css("height",e+"px")})});$("ul li:first a",e).trigger("click")},fepTweet=function(e){e.tweet({username:"lunatechlabs",avatar_size:null,outro_text:'<span class="link-twitter"><a href="http://twitter.com/LunatechLabs">Follow us on Twitter!</a> <i class="icon-arrow-right"></i></span>',count:3,template:'{text}<span class="time">{time}</span><a href="{tweet_url}"><i class="icon-link"></i></a>',loading_text:"loading tweets..."})},fepHeaderPromo=function(e){function s(){if(r<n.length){n[r].prev("dt").find("a").eq(0).trigger("nextslide");r++}else{n[n.length-1].prev("dt").find("a").eq(0).trigger("nextslide");r=0}}var t=getComputedStyle(document.body,"::before").content;if(t==="SMALL")return!1;var n=new Array,r=0,i=setInterval(function(){s()},8e3);$("dd",e).each(function(){$(this).data("top",$(this).offset().top);n.push($(this))});$(e).on("click nextslide","dt a",function(e){e.preventDefault();e.type==="click"&&clearTimeout(i);var t=$(this).closest("dt"),n=t.next("dd");if(t.is(".active")){t.removeClass("active");$(e.delegateTarget).animate({scrollTop:0},800,"easeOutQuart")}else{$(e.delegateTarget).animate({scrollTop:n.data("top")},800,"easeOutQuart");$("dt",e.delegateTarget).removeClass("active");t.addClass("active")}})},fepBlockLink=function(e){e.each(function(e,t){var n="",r=$(this).parents().get(0);if(t.nodeName==="A")n=$(this).attr("href");else{n=$("a",this).attr("href");$(r).on("click","a",function(e){e.preventDefault()})}$(r).on("click",function(e){e.preventDefault();window.location.href=n})})};