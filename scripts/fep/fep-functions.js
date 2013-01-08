
    //  Tag Selectors 
    var fepTagSelectors = function($fepElement){
        var loc = location.pathname;
        console.log(loc);
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
        $($fepElements).on("click","a",function(event){
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

        var $label = getComputedStyle(document.body, '::before')['content'];
        if ($label==="SMALL") { return false;}

        var dd = new Array();
        var counter = 0;
        var timer = setInterval(function(){triggerNextslide()},8000);
        // get css generated label for active media query
        $("dd",$fepElements).each(function(){
            $(this).data('top',$(this).offset().top);
            dd.push($(this));
        });
        $($fepElements).on('click nextslide','dt a',function(e){    
            e.preventDefault();
            if(e.type==='click') { 
                clearTimeout(timer);
                //counter = $dd.index('dd');
            }
            var $dt = $(this).closest('dt');
            var $dd = $dt.next('dd');
            if($dt.is('.active')){
                $dt.removeClass('active');
                $(e.delegateTarget).animate({
                    scrollTop: 0
                }, 800, "easeOutQuart");
            } else {
                $(e.delegateTarget).animate({
                    scrollTop: $dd.data('top')
                }, 800, "easeOutQuart");
                $("dt",e.delegateTarget).removeClass('active');
                $dt.addClass('active');
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
    








