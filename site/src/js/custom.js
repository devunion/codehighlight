$(window).load(function () {

    "use strict";

//------------------------------------------------------------------------------------------
//                     INITIALIZATION SocialShareKit.JS
//------------------------------------------------------------------------------------------

    SocialShareKit.init();

//------------------------------------------------------------------------------------------
//                     Added custom events initialization
//------------------------------------------------------------------------------------------
    $("[evt-name]").click(function () {
        var el = $(this);
        var href = el.attr("href");
        ga('send', 'event', el.attr("evt-name"), href ? href : 'OK');
    });

    // Add support of Leave Feedback widget
    $('a[href^="http://codehighlight.idea.informer.com"]').on('click', function () {
        ga('send', 'event', 'feedback-widget', 'OK');
    });

//------------------------------------------------------------------------
//						NAVBAR HIDE ON CLICK (COLLAPSED) SCRIPT
//------------------------------------------------------------------------ 		
    $('.nav a').on('click', function () {
        if ($('.navbar-toggle').css('display') != 'none') {
            $(".navbar-toggle").click()
        }
    });
});


$(document).ready(function () {
    "use strict";

//------------------------------------------------------------------------
//						ANCHOR SMOOTHSCROLL SETTINGS
//------------------------------------------------------------------------
    $('a.goto, .navbar .nav a').smoothScroll({speed: 800, preventDefault: false});


//------------------------------------------------------------------------
//						FULL HEIGHT SECTION SCRIPT
//------------------------------------------------------------------------
    $(".screen-height").css("min-height", $(window).height());
    $(window).resize(function () {
        $(".screen-height").css("min-height", $(window).height());
    });
});