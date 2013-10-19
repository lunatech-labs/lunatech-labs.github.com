/*  ###########################################################################
    Author:     Lunatech
    ########################################################################### */
    
    var fepResponsive = function(){
        
        //  Load sidebar images on larger screens
        if ($label!=="SMALL") { 
            $("#masthead, aside nav").addClass('loaded');
        }
    }   
    
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
        if ($label==="SMALL") { 
            $fepElements.keepInView({
                zindex: 42
            });
        } 
    }
    
    // TABS
    var fepTabs = function($fepElements){
        
        // init vars
        var windowPos = $(window).scrollTop();
        var newpage = true;
        
        // Events (click & hashchange)
        $($fepElements).on("click","ul a",function(event){
            event.preventDefault();
            location.hash=$(this).attr('href');
        });
        $(window).on('hashchange',function(){
            loadTab($("ul a[href='"+location.hash+"']",$fepElements));
        });
        
        // Show or switch tab
        function loadTab($tab){
            $(".active",$fepElements).removeClass("active");
            $tab.closest('li').addClass("active");
            $(".tab",$fepElements).hide();
            $($tab.attr('href')).show(0,function(){
                var h = $(this).outerHeight() + 120;
                $fepElements.css("height",h+"px");
                if(newpage) {
                    window.scrollTo(windowPos,0);
                    newpage = false;
                }
            });
        }
        // On page load show tab based on hash
        if(location.hash) {
            $(window).trigger('hashchange');
        } else {
            location.hash=$("ul li:first a",$fepElements).attr('href');
        }
        
        
    }
    
    // TWEET
    var fepTweet = function($fepElements){
        $fepElements.tweet({
            username: "lunatechlabs",
            avatar_size: null,
            outro_text: '<span class="link-twitter"><a href="http://twitter.com/LunatechLabs">Follow us on Twitter!</a> <i class="icon-arrow-right"></i></span>',
            count: 3,
            template: '{text}<span class="time">{time}</span><a href="{tweet_url}"><i class="icon-link"></i></a>',
            loading_text: "Loading tweets..."
        });
        $( ".loading", $fepElements ).prepend( '<i class="icon-refresh icon-spin"></i>&nbsp;&nbsp;' );
        function timeOut(){
            var loading = $( ".loading", $fepElements ).length;
            if( loading > 0 ) {
                $fepElements.html('<h3><a href="http://twitter.com/LunatechLabs">Follow us on Twitter!</a></h3><p>Apologies, we\'re having trouble finding our Twitter feed. Twitter could be having a <a href="http://www.whatisfailwhale.info">Fail Whale</a> moment. Reloading the page sometimes helps.</p><p>If our tweets refuse to load it might be due to extensions or addons blocking Twitter. Common culprits are the excellent Disconnect and Adblock.</p>');
            }
        }
        setTimeout( timeOut, 16000 );
    }
    
    
    //  Promo viewer 
    var fepHeaderPromo = function($fepElements){
        
        if ($label==="SMALL") { 
            return false; 
        } else {
            fepResponsive(); 
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
     
        $.cookie.defaults.expires = 4242;
        $.cookie.defaults.path = '/';
        $.cookie.defaults.domian = 'lunatech.com';
        
        var $prompt = $('<div class="dialog-cookies"><h3><i class="icon-info-sign"></i> Cookie Permission</h3><p>We request your permission to use cookies for Google Analytics to help us monitor and improve access to lunatech.com. The data collected is anonymised.</p><button id="cookieOkay">Approve</button></div>');

        $prompt.on("click","button",function(e){
            $.cookie('approval', 'on');
            $prompt.html('<div class="dialog-cookies"><h3><i class="icon-spinner icon-spin"></i> Loading Google Analytics</h3></div>');
            require(['ga'],function(){
                $prompt.remove();
            });
        });
        
        if ($.cookie('approval')===undefined) {
            $.cookie('approval', 'off');
        }

        if($.cookie('approval')==="off"){
            $prompt.appendTo($fepElements);
        } 
        
        if ($.cookie('approval')==="on"){
            require(['ga']);
        }
        
    }
        
    // Detect Border Radius
	$.support.borderRadius = false;
	$.each(['BorderRadius','MozBorderRadius','WebkitBorderRadius','OBorderRadius','KhtmlBorderRadius'], function() {
		if(document.body.style[this] !== undefined) $.support.borderRadius = true;
		return (!$.support.borderRadius);
	});
	
    //  Hide elements using border-radius
    var hideBorderRadius = function($fepElements){
        if ( !$.support.borderRadius ) { 
            $fepElements.hide();
        } 
    }
    $(".infographic").on( "click", "div", function(event){
        event.preventDefault();
        $(event.target).trigger('mouseover');
    });
