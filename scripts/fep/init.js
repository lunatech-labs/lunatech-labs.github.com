/*  ###########################################################################
    Author:     Lunatech 
    ########################################################################### */
    
    
    //  VIEWPORT SIZE
    var $label = (typeof window.getComputedStyle==='function') ? getComputedStyle(document.body, '::before')['content'] : false;


    // GOOGLE ANALYTICS SETTINGS
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-6087516-1']);
    _gaq.push(['_gat._anonymizeIp']);
    _gaq.push(['_trackPageview']);

    // We like javascript. Add 'js' class to use for styling
    document.getElementsByTagName("HTML")[0].className="js";


    //  LAZY LOADING ###########################################################

    // AMD ROUTING 
    require.config({ 
        baseUrl: "/scripts/minified",
        paths: {
            "jquery":           "jquery-1.9.1-min",
            "validate":         "jquery.validate-min",
            "keepinview":       "keepinview-min",
            "tweet":            "jquery.tweet-min",
            "easing":           "jquery.easing.1.3-min",
            "fep-functions":    "fep-functions-min",
            "cookie":           "jquery.cookie-min",
            "ga":               "http://www.google-analytics.com/ga",
        },
        waitSeconds: 14
    });
        
    //  Lazyload method
    function lazyLoad(){
        var elem = this.elem;
        var func = this.func;
        require(this.amd, function(){ 
            if (func) {
                // Assign the global function reference to a variable
                var fn = window[func];
                // Use the variable to invoke the function
                if(typeof fn === 'function') {
                    fn(elem);
                }
            }
        });
    }
    
    //  Initiate lazyloading per object 
    function loadLazyScripts(array){
        
        var items = array.concat();
        
        // Asyncronous invocation 
        setTimeout(function(){
        
            var item = items.shift();
            
            //  Check if the current object returns any DOM elements from the jQuery selector
            if(item.elem.length>0){
                //  Invoke lazyLoad method with the current object 
                lazyLoad.call(item);
            }
            
            //  Iterate through the objects in the array 
            if (items.length > 0){
                setTimeout(arguments.callee, 0);
            }
            
        }, 0);
    }

    //  START DOM MANIPULATION 
    require(['jquery'],function(){ 
        
        /*  Loading DOM elements into an array of objects that will initiate lazy loading
        
         *  elem: The jquery selector that triggers the lazy load and gets passed to 'func'
         *  amd:  Asyncronous Script Modules (AMD) that need to load (see the require.config above)
         *  func: The function to execute (mostly found in fep-functions.js)od
         */
         
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
                {   // Responsive labels
                    elem: $("body .childpage"),
                    amd:  ['fep-functions'], 
                    func: 'fepResponsive' 
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
            
        //  JQUERY DOMREADY 
        $(document).ready(function(){
        
            loadLazyScripts($lazyLoadArray);

        });
        
                    
    });