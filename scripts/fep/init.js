/*  ###########################################################################
    Author:     Lunatech Research
    Date:       November 2012
    ########################################################################### */
    
    // ROUTING 
    require.config({ 
        baseUrl: "/scripts/minified",
        paths: {
            "jquery":           "jquery-1.9.0-min",
            "validate":         "jquery.validate-min",
            "keepinview":       "keepinview-min",
            "tweet":            "jquery.tweet-min",
            "easing":           "jquery.easing.1.3-min",
            "fep-functions":    "fep-functions-min",
            "cookie":           "jquery.cookie-min",
            "ga":               "http://www.google-analytics.com/ga",
        }
    });
    
    //  VIEWPORT SIZE
    var $label = (typeof window.getComputedStyle==='function') ? getComputedStyle(document.body, '::before')['content'] : false;


    // GOOGLE ANALYTICS SETTINGS
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-6087516-1']);
    _gaq.push(['_gat._anonymizeIp']);
    _gaq.push(['_trackPageview']);


    require(['jquery'],function(){ 

        // We like javascript. Add 'js' class to use for styling
        $("html").attr('class','js'); 
                
        $(document).ready(function(){

            //  Load sidebar images on larger screens
            if(!$label || $label ==="none") { 
                $("#masthead, aside nav").addClass('loaded');
            }

            //  Loading DOM elements into an array of objects that will initiate lazy loading
            
            //  elem: The jquery object that triggers the lazy load and gets passed to 'func'
            //  amd:  Asyncronous Script Modules (AMD) that need to load (see the require.config above)
            //  func: The function, with a gobal scope, to execute (mostly found in fep-functions.js)
            var $lazyLoadArray = [
            
                
                {   // Twitter
                    elem: $("#twitter-feed"),
                    amd:  ['fep-functions','tweet'], 
                    func: 'fepTweet' 
                },
                {   // Google Analytics
                    elem: $('body'),
                    amd:  ['ga'], 
                    func: false 
                },
/*
                {   // Cookie loader/blocker
                    elem: $('body'),
                    amd:  ['cookie','fep-functions'], 
                    func: 'fepCookieApproval' 
                },
*/
                {   // Tabs
                    elem: $(".tabs"),
                    amd:  ['fep-functions'], 
                    func: 'fepTabs' 
                },
                {   // Validation
                    elem: $("form.validate"),
                    amd:  ['fep-functions','validate'], 
                    func: 'fepValidation' 
                },
                {   // keep in view
                    elem: $("header nav"),
                    amd:  ['fep-functions','keepinview'], 
                    func: 'fepKeepInView' 
                },
                {   // Homepage header
                    elem: $(".homepage #masthead dl"),
                    amd:  ['fep-functions','easing'], 
                    func: 'fepHeaderPromo' 
                },
                {   // Block links
                    elem: $(".link-reference"),
                    amd:  ['fep-functions'], 
                    func: 'fepBlockLink' 
                }             
                
            ];
            
            // Lazyload method
            function lazyObject(elem, amd, func){
                this.elem = elem;
                this.amd = amd;
                this.func = func;
            }
            
            // Lazyload prototype
            function lazyLoad(){
                var elem = this.elem;
                var func = this.func;
                require(this.amd, function(){ 
                    if (func) {
                        // Pass the function reference to a variable
                        var fn = window[func];
                        // Use the variable to execute the function
                        if(typeof fn === 'function') {
                            fn(elem);
                        }
                    }
                });
            }
            lazyObject.prototype.lazyLoad = lazyLoad;
            
            //  Iterate through the $lazyLoadArray 
            for(obj in $lazyLoadArray){
                //  Check if the DOM elements is present on the page 
                if($lazyLoadArray[obj].elem.length>0){
                    //  Lazyload constructor
                    var lazyObj = new lazyObject($lazyLoadArray[obj].elem, $lazyLoadArray[obj].amd, $lazyLoadArray[obj].func);
                    //  pass object with new arguments to the lazy loader
                    lazyObj.lazyLoad();
                }
            }
            
        });
        
                    
    });