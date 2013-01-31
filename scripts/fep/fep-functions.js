
    //  Tag Selectors 
    var fepTagSelectors = function($fepElement){
        var loc = location.pathname;
        $("option",$fepElement).each(function(){
            if (loc === ($(this).data('link'))){
                $(this).prop('selected',true);
            }
        });
        $fepElement.change(function(e){
            var link = $("option:selected",this).data('link');
            if (link) {
                location.pathname = link;
            } else {
                location.href = "/blog"
            }
        });
    }
    
    //  KEEP IN VIEW 
    var fepKeepInView = function($fepElements){
        $fepElements.keepInView({
            zindex: 42
        });
    }
    
    // TABS
    var fepTabs = function($fepElements){
        $("ul li:first",$fepElements).addClass('active');
        $($fepElements).on("click","ul a",function(event){
            event.preventDefault();
            $("li",$fepElements).removeClass("active");
            $(this).closest('li').addClass("active");
            $("div[id*='tab']",event.delegateTarget).hide();
            $(this.hash).show(0,function(){
                var h = $(this).outerHeight() + 120;
                $(event.delegateTarget).css("height",h+"px");
            });
        });
        $("ul li:first a",$fepElements).trigger('click');
    }
    
    // TWEET
    var fepTweet = function($fepElements){
        $fepElements.tweet({
            username: "lunatechlabs",
            avatar_size: null,
            outro_text: '<span class="link-twitter"><a href="http://twitter.com/LunatechLabs">Follow us on Twitter!</a> <i class="icon-arrow-right"></i></span>',
            count: 3,
            template: '{text}<span class="time">{time}</span><a href="{tweet_url}"><i class="icon-link"></i></a>',
            loading_text: "loading tweets..."
        });
    }
    
    
    //  Promo viewer 
    var fepHeaderPromo = function($fepElements){
        
        if(typeof window.getComputedStyle==='function'){
            var $label = getComputedStyle(document.body, '::before')['content'];
            if ($label==="SMALL") { return false;}
        }
        
        var dd = new Array();
        var counter = 0;
        
        // Set reoccuring interval
        var timer = setInterval(function(){triggerNextslide()},8000);
            
        // get css generated label for active media query
        $("dd",$fepElements).each(function(){
            $(this).data('top',$(this).offset().top);
            dd.push($(this));
        });
        
        // Run shorter animation only once:
        setTimeout(triggerNextslide, 1000);
            
        $($fepElements).on('click nextslide','dt a',function(e){    
            e.preventDefault();
            if(e.type==='click') { 
                clearTimeout(timer);
            } 
            var $dt = $(this).closest('dt');
            var $dd = $dt.next('dd');
            function animateSlide(){
                $(e.delegateTarget).animate({
                    scrollTop: $dd.data('top')
                }, 800, "easeOutQuart");
                $("dt",e.delegateTarget).removeClass('active');
                $dt.addClass('active');
            }
            if($dt.is('.active')){
                $dt.removeClass('active');
                animateSlide();
            } else {
                animateSlide();
            }
        });
        function triggerNextslide(){
            if (counter<dd.length) {
                dd[counter].prev('dt').find('a').eq(0).trigger('nextslide');
                counter++;
            } else {
                dd[dd.length-1].prev('dt').find('a').eq(0).trigger('nextslide');
                counter = 0;
            }
        }        
    }
    
    

    //  BLOCK LINKS 
    var fepBlockLink = function($fepElements){
        $fepElements.each(function(index,domElem){
            var $href = "";
            var block = $(this).parents().get(0);
            if (domElem.nodeName === "A") {
                $href = $(this).attr('href');
            } else {
                $href = $("a",this).attr('href');
                $(block).on('click',"a",function(e){
                    e.preventDefault();
                });
            }
            $(block).on('click',function(e){
                e.preventDefault();
                window.location.href = $href;
            });
        });
    }
    

    //  VALIDATION
    var fepValidation = function($fepElements){
        
        $fepElements.each(function(){
            $(this).validate();
        });
        
    }


    // Non-functional Cookie blocker
    var fepCookieApproval = function($fepElements){
     
        var googleAnalytics = function(){
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-6087516-1']);
            _gaq.push (['_gat._anonymizeIp']);
            _gaq.push(['_trackPageview']);
        }

        $.cookie.defaults.expires = 4242;
        $.cookie.defaults.path = '/';
        $.cookie.defaults.domian = 'lunatech.com';
        
        var prompt = '<div class="dialog-cookies"><h3><i class="icon-info-sign"></i> Cookie Permission</h3><p>We request your permission to use cookies for Google Analytics to help us monitor and improve access to lunatech.com. The data collected is anonymised.</p><button id="cookieOkay">Approve</button></div>';

        $fepElements.on("click",".dialog-cookies button",function(e){
            $.cookie('approval', 'on');
            googleAnalytics();
            $(".dialog-cookies", e.delegateTarget).remove();
        });
        
        if ($.cookie('approval')===undefined) {
            $.cookie('approval', 'off');
        }

        if($.cookie('approval')==="off"){
            $fepElements.append(prompt);
        } 
        
        if ($.cookie('approval')==="on"){
            googleAnalytics();
        }
        
    }    
    



