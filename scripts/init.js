/*! Front-end Patterns Init script

    Copyright (c) 2009-2012 Lunatech Research, Egor Kloos

    */

    // INIT

    require(["jquery"], function(){
                    
        $(document).ready(function() {
        
            
/*
            $(".promo").on('click','section',function(){
                var $elem = $(this);
                $(".promo p ~ p:visible").slideUp('slow', function(){$(".promo .active").removeClass("active");});
                $("p ~ p:hidden", $elem).slideDown('fast', function(){$elem.addClass("active");});
            });
*/

            $(".promo-tabs").each(function(){
                var $elem = $(this);
                require(["jquery-tools"], function(){
                    $elem.tabs(".pane",{
                        current: "active",
                        history: true,
                        event: 'click',
                        //effect: 'fade',
                        //fadeOutSpeed: "slow",
                        // start from the beginning after the last tab
                        rotate: true
                    // use the slideshow plugin. It accepts its own configuration
                    }).slideshow({autoplay:true,interval:9000});
                });
            });

        });
    });