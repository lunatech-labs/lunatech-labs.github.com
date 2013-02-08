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
        
            //  Loading DOM elements into an array of objects that will initiate lazy loading
            
            //  elem: The jquery object that triggers the lazy load and gets passed to 'func'
            //  amd:  Asyncronous Script Modules (AMD) that need to load (see the require.config above)
            //  func: The function to execute (mostly found in fep-functions.js)
            var $lazyLoadArray = [
            
                
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
                    elem: $("nav"),
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
                },                
                {   // Twitter
                    elem: $("#twitter-feed"),
                    amd:  ['fep-functions','tweet'], 
                    func: 'fepTweet' 
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
                    
                        //  Constructor: 
                        //  Create a new function with the 'func' string and return it
                        var lazyFunc = new Function("return "+func)();
                        
                        //  Call the Constructor and pass the target element
                        lazyFunc(elem);
                        
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