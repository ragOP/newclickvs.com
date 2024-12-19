var font_1 = new FontFaceObserver('Helvetica Neue LT W05 55 Roman');
var font_2 = new FontFaceObserver('Helvetica Neue LT W05_75 Bold');
var font_3 = new FontFaceObserver('Big Caslon');

font_1.load().then(function () {
    document.getElementsByTagName('body')[0].className += " fontHelvetica";
});
font_2.load().then(function () {
    document.getElementsByTagName('body')[0].className += " fontHelveticaBold";
});
font_3.load().then(function () {
    document.getElementsByTagName('body')[0].className += " fontBigCaslon";
});

/* MatchHeight ====================== */
function setbg() {
    $(".setbg").each(function () {
        var theBg = $(this).find(".bg-img").attr("src");
        $(this).css("background-image", "url(" + theBg + ")");
        $(this).find("img.bg-img").hide();
    });
}
// Custom select
_select = $('select');
if(_select.length) {
    _select.each(function () {
        let that = $(this);
        if(that.hasClass('select-decor')) {
            let _parent = that.parent();
            that.select2({
                selectionCssClass: 'select-decor',
                dropdownCssClass: 'select-decor',
                placeholder: '',
                width: '100%',
                dropdownParent: _parent
            });
        }
        else {
            that.select2({
                selectionCssClass: 'select-custom',
                dropdownCssClass: 'select-custom',
                width: '100%',
                minimumResultsForSearch: 7,
            });
        }
    });
}

if($('#hire-us-form')){
    $('#hire-range').attr({
        'data-min' : '10000',
        'data-max' : '200000',
        'data-from' : '25000',
        'data-range' : ''
    })
}

// Custom range input
let _range_input = $('input[data-range]');

if(_range_input) {
    _range_input.ionRangeSlider({
        prefix: "$",
    });
}


// $10K - $25K
// $25K - $50K
// $50K - $100K
// $100K - $200K
// $200K +
_range_input.on('change', function () {
    let that = $(this);
    let _new_value = '';
    let _data_min = that.data('min');
    let _data_max = that.data('max');
    let _data_from = _data_max / 5;
    let _data_val = that.prop('value');
    let _tool = that.parent().find('.irs-single');
    //console.log(_data_val)
    if (_data_val >= 10000 && _data_val < 25000) {
        _new_value = '$' + 10 + 'K - $' + 25 + 'K';
    } else if (_data_val >= 25000 && _data_val < 50000) {
        _new_value = '$' + 25 + 'K - $' + 50 + 'K';
    } else if (_data_val >= 50000 && _data_val < 100000) {
        _new_value = '$' + 50 + 'K - $' + 100 + 'K';
    } else if (_data_val >= 100000 && _data_val < 200000) {
        _new_value = '$' + 100 + 'K - $' + 200 + 'K'
    } else {
        _new_value = '>$' + 200 + 'K';
    }
    _tool.attr('data-value', _new_value);
})
$(document).ready(function () {
    var wh = $(window).height();
    var main_header = $('.main-header').outerHeight();

    function checkWidth() {
        var windowSize = $(window).innerWidth();
        if (windowSize < 768) {
            //$("#pills-tab").tabCollapse();
        }
    }

    function innerHeroH() {
        $(".inner-page-image").css({"height": wh - main_header});
        $(".full-banner").css({"height": wh})
    }

    checkWidth();
    innerHeroH();

});

$('.hm-navigation .nav-pills .nav-item a').on('click', function (e) {
    leftpartHeight();
});

// Mega Menu:
let _mega_menu = $('[data-mega-menu]');
let _mega_scroll = $('[data-mega-scroll]');
let _mega_sub = $('[data-mega-sub]');
let _mega_link = $('[data-mega-link]');
let _win_desktop = $(window).width() > 1025;

function setScroll() {
    if(_mega_scroll.length) {
        _mega_scroll.each(function () {
            let that = $(this);
            let _top = offsetTop(that);
            that.css({ 'max-height': 'calc(100vh - ' + _top + 'px)' });
        })
    }
}
setScroll();
if(_mega_menu.length) {
    //_mega_menu.prependTo('body');
}
function setModalHeight() {
    let heightWithoutScrollbar = $(window).innerHeight();
    if(_mega_menu.length) {
        _mega_menu.css({'height': heightWithoutScrollbar});
    }
}
setModalHeight();
$(window).on('resize', function () {
    setModalHeight();
    setScroll();
});

function clearMegaTab() {
    $('[data-mega-tab]').removeClass('active');
    $('[data-mega-tab-content]').removeClass('opened');
}

if(_mega_link.length) {
    _mega_link.each(function (i) {
        let that = $(this);
        that.attr('data-mega-link', i);
        if (i === 0 && _win_desktop) {
            that.addClass('active');
        }
    });
}
if(_mega_sub.length) {
    _mega_sub.each(function (i) {
        let that = $(this);
        that.attr('data-mega-sub', i);
        if (i === 0 && _win_desktop) {
            that.addClass('opened');
        }
        if (i === 3 && _win_desktop) {
            that.find('.mega-menu__grid').addClass('grid-2-2');
        }
    });
}
let _menu_item = $('.main-header .navbar-nav .nav-item');
if(_menu_item.length) {
    _menu_item.each(function () {
        if($(this).hasClass('menu-item-has-children')) {
            $(this).prepend('<i class="menu-icon"/>');
            $(this).find('>a, >i').wrapAll('<span />');
        }
    })
}
$('.nav-item.menu-item-has-children > span').on('click', function (e) {
    e.preventDefault();
    $(this).parent().siblings().removeClass('active');
    $(this).parent().toggleClass('active');
});

$('[data-foot-cta]').on('click', function (e) {
    e.preventDefault();
    $(this).parents('.f-col').siblings().removeClass('active');
    $(this).parents('.f-col').toggleClass('active');
});

let _root = $('body');

let _mobile_menu = $('[data-mobile-menu]');
if(_mobile_menu.length) {
    //$('body').append(_mobile_menu);
}
function mobile_height() {
    let _mobile_menu = $('[data-mobile-menu]');
    let _root_height = $(window).height();
    let _header_height = $('.main-header').innerHeight();
    if(_mobile_menu.length) {
        _mobile_menu.css('max-height', (_root_height - _header_height));
    }
}
mobile_height();
$(window).on('resize touchmove', mobile_height);

$(document).on('click', '[data-menu-toggle]', function () {
    $('[data-menu-toggle]').toggleClass('open');
    setTimeout(function () {
        $(window).trigger('resize');
    }, 700);
    if(_mega_menu.length) {
        $('[data-mega-menu], [data-mobile-menu]').toggleClass('opened');
        clearMegaTab();
    }
    _root.toggleClass('overflow-hidden menu-opened');
    $('.main-header').toggleClass('menu-opened');
    if($('.fp-enabled').length) {
        if(!_root.hasClass('overflow-hidden')) {
            fullpage_api.reBuild();
        }
    }
});

_mega_link.on('click', function (e) {
    e.preventDefault();
    let that = $(this);
    let data_id = that.attr('data-mega-link');
    let data_sub = $('[data-mega-sub="' + data_id + '"]');
    clearMegaTab();
    _mega_link.not(that).removeClass('active');
    if(_mega_sub.length && data_id) {
        _mega_sub.not(data_sub).removeClass('opened');
    }
    if (_win_desktop) {
        that.addClass('active');
        data_sub.addClass('opened');
    }
    else {
        that.toggleClass('active');
        if(_mega_sub.length && data_id) {
            data_sub.toggleClass('opened');
        }
    }
});

let _mega_tab = $('[data-mega-tab]');
let _mega_tab_content = $('[data-mega-tab-content]');

if(_mega_tab.length) {
    _mega_tab.each(function (i) {
        let that = $(this);
        that.attr('data-mega-tab', i);
    });
}
if(_mega_tab_content.length) {
    _mega_tab_content.each(function (i) {
        let that = $(this);
        that.attr('data-mega-tab-content', i);
    });
}
_mega_tab.on('click', function (e) {
    e.preventDefault();
    let that = $(this);
    let data_id = that.attr('data-mega-tab');
    _mega_tab.removeClass('active');
    that.addClass('active');
    if(_mega_tab_content.length) {
        _mega_tab_content.removeClass('opened');
    }
    if(data_id) {
        $('[data-mega-tab-content="' + data_id + '"]').addClass('opened');
    }
});

// Hire Us Modal
let _hire_us_btn = $('[data-hire-btn], a[href="#hire-us"]');
let _hire_us_modal = $('[data-hire-modal]');
let _hire_us_close = $('[data-hire-close]');
let _hire_us_row = $('[data-hire-row]');

if(_hire_us_modal.length) {
    $('body').append(_hire_us_modal);
}

if(_hire_us_row.length) {
    _hire_us_row.each(function (i) {
        let that = $(this);
        let _form_text = that.find('input');
        let _form_select = that.find('select');
        let _timer = '';

        _hire_us_row.not(':nth-child(1)').addClass('is-hide');

        _form_text.on('keyup', function () {
            clearTimeout(_timer);
            let _el = $(this);
            if(_el.closest('.hum-col').hasClass('is-last')) {
                _hire_us_modal.animate({
                    scrollTop: _hire_us_modal.prop('scrollHeight')
                }, 700);
            }
            if(_form_text.filter( (i, e) => !e.value.trim() ).length === 0){
                that.next().removeClass('is-hide');
            }
        });
        _form_select.on('change', function () {
            if(_form_select.filter( (i, e) => !e.value.trim() ).length === 0){
                that.next().removeClass('is-hide');
            }
        });
    });
    document.addEventListener( 'wpcf7submit', function( event ) {
        if(_hire_us_modal.hasClass('opened')) {
            _hire_us_modal.animate({
                scrollTop: _hire_us_modal.prop('scrollHeight')
            }, 700);
        }
    }, false );
}
_root_all = $('html, body');
_hire_us_btn.on('click', function (e) {
    e.preventDefault();
    _hire_us_modal.addClass('opened');
    if(!_root.hasClass('overflow-hidden')) {
        _root.addClass('overflow-hidden');
    }
});
_hire_us_close.on('click', function (e) {
    e.preventDefault();
    _hire_us_modal.removeClass('opened');
    if(_root_all.hasClass('overflow-hidden') && !_root_all.hasClass('menu-opened')) {
        _root_all.removeClass('overflow-hidden');
    }
    if($('.fp-enabled').length) {
        fullpage_api.reBuild();
    }
});

// Blog Filters
let _filters_col = $('[data-cols]');
let _filters_refine_link = $('[data-filters-refine]');
let _filters_modal = $('[data-filters-modal]');
let _filters_close_link = $('[data-filters-close]');
let _filters_overlay = '<div class="filters-overlay" />';

if(_filters_col.length) {
    _filters_col.each(function () {
       if($(this).find('li').length <= 3) {
           $(this).addClass('one-col');
       }
    });
}
_filters_refine_link.on('click', function (e) {
    e.preventDefault();
    _filters_modal.addClass('opened');
    _root.addClass('overflow-hidden filters-opened');
    $(_filters_overlay).insertBefore(_filters_modal);
});
_filters_close_link.on('click', function (e) {
    e.preventDefault();
    _filters_modal.removeClass('opened');
    _root.removeClass('overflow-hidden filters-opened');
    $('.filters-overlay').remove();
});

// Sticky sidebar (Blog Page)
let _win = $(window);
let _sticky_sidebar = $('[data-blog-sidebar]');
let _blog_content = $('.recent-news-author');
function sticky_relocate(sticky) {
    let _sticky_box = $(sticky);

    if (_sticky_box.length) {
        _sticky_box.css({
            'left' : _sticky_box.parent().offset().left + 18,
            //'top' : _sticky_box.parent().offset().top
        });
    }
}
function stickyStop() {
    if(_blog_content.length && _sticky_sidebar.length) {
        if(offsetBottom('.single-post-content') < 330) {
            _sticky_sidebar.addClass('stopped');
        } else {
            _sticky_sidebar.removeClass('stopped');
        }
    }
}
stickyStop();
if(_sticky_sidebar.length) {
    sticky_relocate('[data-blog-sidebar]');
}
_win.on('scroll', function () {
    if(_sticky_sidebar.length) {
        if (_win.scrollTop() > offsetTop('[data-blog-sidebar]') + 100) {
            _sticky_sidebar.addClass('sticky');
        } else {
            _sticky_sidebar.removeClass('sticky');
        }
    }
});

_win.on('resize', function () {
    sticky_relocate('[data-blog-sidebar]');
});
_win.on('resize scroll', function () {
    stickyStop();
});

// Reading progress bar
let _progress_bar = $('[data-progress-bar]');

function progressPosition() {
    if(_progress_bar.length) {
        if ($(window).scrollTop() > 500) {
            $('.progress-bar-wrap').addClass('sticky-top');
            setTimeout(function () {
                $('.progress-bar-wrap').addClass('visible');
            }, 300);
        } else {
            $('.progress-bar-wrap').removeClass('sticky-top visible');
        }
    }
}
progressPosition();
$(window).on('scroll', function () {
    progressPosition();
});
let _progress_content = $('.single-post-content');
if(_progress_bar.length && _progress_content.length) {
    let getMax = function(){
        //return $(document).height() - $(window).height();
        return _progress_content.height();
    }

    let getValue = function(){
        return $(window).scrollTop();
    }

    if('max' in document.createElement('progress')){
        // Browser supports progress element
        let _progressBar = $('progress');

        // Set the Max attr for the first time
        _progressBar.attr({ max: getMax() });

        $(document).on('scroll', function(){
            // On scroll only Value attr needs to be calculated
            _progressBar.attr({ value: getValue() });
        });

        $(window).resize(function(){
            // On resize, both Max/Value attr needs to be calculated
            _progressBar.attr({ max: getMax(), value: getValue() });
        });
    } else {
        let _progressBar = $('.progress-bar'),
            max = getMax(),
            value, width;

        let getWidth = function(){
            // Calculate width in percentage
            value = getValue();
            width = (value/max) * 100;
            width = width + '%';
            return width;
        }

        let setWidth = function(){
            progressBar.css({ width: getWidth() });
        }

        $(document).on('scroll', setWidth);
        $(window).on('resize', function(){
            // Need to reset the Max attr
            max = getMax();
            setWidth();
        });
    }
}

// Reading Blog (Remaining time)

function read_time() {
    let _read_time_box = $('[data-read-time]');
    if(_read_time_box.length) {
        let _read_time_value = _read_time_box.data('read-time')
        let _progress = $(window).scrollTop() / ($(document).height() - _progress_content.height());
        let _progress_time = _read_time_value - (_read_time_value * _progress);
        let _text = Math.ceil(_progress_time);
        //_read_time_box.toggleClass('anim', 150)
        if(_progress_time <= .5) {
            _read_time_box.text(0);
        } else{
            _read_time_box.text(_text);
        }
    }
}
read_time();

_win.on('scroll', read_time);

function leftpartHeight() {
    setTimeout(function () {
        var navHeight = $('.hm-navigation .container-fluid').innerHeight();
        var navHeightHeader = $('.hm-navigation header').innerHeight();
        $('.leftpart').css({'height': navHeight + navHeightHeader});
    }, 200);
}

leftpartHeight();


function parallaxPage() {
    setTimeout(function () {
        $(".parallax-career, .parallax-about-people, .parallax-about-career").parallax({
            position: 0,
            zIndex: 1,
        });
    }, 900);
}

$(window).scroll(function () {
    parallaxPage();
});
$(window).resize(function () {
    parallaxPage();
});
// Get bottom el position
function offsetBottom(el, i) {
    i = i || 0; return $(el)[i].getBoundingClientRect().bottom
}

// Get top el position
function offsetTop (el, i) {
    i = i || 0; return $(el)[i].getBoundingClientRect().top
}

$(window).on("load", function () {
    setbg();
    var wh = $(window).height();
    try {
        var isPhoneDevice = "ontouchstart" in document.documentElement;

        } catch (err) {
    }

    var textWrapper = document.querySelector('.animate-text');
    if(textWrapper !== null) {
        textWrapper.style.visibility = "hidden";
    }
    function setTextAnime() {
        // Wrap every letter in a span
        if(textWrapper !== null && !textWrapper.classList.contains('completed')) {
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

            anime.timeline({loop: false})
                .add({
                    targets: '.animate-text .letter',
                    opacity: [0,1],
                    easing: "easeInOutQuad",
                    duration: 5,
                    delay: (el, i) => 10 * (i+1)
                });
            textWrapper.classList.add('completed');
        }
    }

    var circle_box = '.circlebx';
    var letter_anime = '.animate-text';

    if($(circle_box).length) {
        $(circle_box).appear();
    }
    if(circle_box.length) {
        $(letter_anime).appear();
    }

    // Start Circle animation
    $(document.body).on('appear', circle_box, function(e, $affected) {
        if(!$(circle_box).hasClass('appeared')) {
            var circleboxanim = new TimelineMax({paused: true});
            circleboxanim.fromTo(
                ".circlebox svg",
                2,
                {rotation: 0, z: 0.01, scale: 0.98},
                {rotation: 360, z: 0.01, scale: 0.98},
                0
            );
            circleboxanim.from(
                ".circlebox svg",
                1.5,
                {scale: 1, repeat: -1, ease: Power0.easeNone}
            );
            setTimeout(function () {
                $(".linecolor[data-name='pm']").trigger("click");
            }, 300);
            $(".circle_tab_content").hide();
        }
        $(circle_box).addClass('appeared');
    });

    // Start Letters animation https://animejs.com/
    $(document.body).on('appear', letter_anime, function(e, $affected) {
        if(textWrapper !== null) {
            setTimeout(function () {
                textWrapper.style.visibility = 'visible';
            }, 100);
            setTextAnime();
        }
    });

    // let cs_video = document.querySelectorAll('.cs-section--full .cs-video');
    // if(cs_video !== null) {
    //     for (let i = 0; i < cs_video.length; i++) {
    //         let _item = cs_video[i];
    //         _item.parentNode.style.maxWidth = _item.videoWidth + 'px';
    //     }
    // }
    function animateCSVideo() {
        let _delay = 300;
        let cs_video = '.cs-video';
        if($(cs_video).length) {
            $(cs_video).not('.has-controls').each(function (i) {
                let that = $(this);
                that.attr('id', 'cs-video_' + i);
                let video_play = document.getElementById('cs-video_' + i);
                if(that.is('[data-video-delay]')) {
                    _delay = that.data('video-delay');
                }
                if(that.is(':appeared')) {
                    if(!that.hasClass('appeared')) {

                        setTimeout(function () {
                            var playPromise = video_play.play();
                            if (playPromise !== undefined) {
                                playPromise.then(_ => {
                                    // Automatic playback started!
                                    // Show playing UI.
                                    // video_play.pause();
                                })
                                    .catch(error => {
                                        // Auto-play was prevented
                                        // Show paused UI.
                                    });
                            }
                            console.log('video appeared')
                        }, _delay);

                    }
                }
                else {
                    //that.currentTime = 0;
                }
                that.on('ended', function() {
                    //that.addClass('appeared');
                    //that.currentTime = 0;
                });
            });
        }
    }
    animateCSVideo();

    $(window).on('scroll', function () {
        animateCSVideo();
    });

    let _play_video = $('[data-play-video]');
    _play_video.on('click', function (e) {
        e.preventDefault();
        let that = $(this);
        if(that.hasClass('is-pause')) {
            that.removeClass('is-pause').closest('.has-controls').removeClass('video-play')
                .find('video').prop({'controls': false, 'muted': true}).trigger('pause');
        } else {
            that.addClass('is-pause').closest('.has-controls').addClass('video-play')
                .find('video').prop({'controls': true, 'muted': false}).trigger('play');
        }
        that.parent().find('video').on('ended',function(){
            that.removeClass('is-pause');
            that.closest('.has-controls').removeClass('video-play');
            that.closest('.has-controls').find('video').prop({'controls': false, 'muted': true});
        });
        that.parent().find('video').on('pause',function(){
            that.removeClass('is-pause');
            that.closest('.has-controls').removeClass('video-play');
            that.closest('.has-controls').find('video').prop({'controls': false, 'muted': true});
        });
    });

    wow = new WOW({
            offset: 300,
        }
    );


    wow.init();

    $(window).scroll(function () {
        if ($(window).scrollTop() >= wh * 2.8) {
            $("nav").addClass("fixed-header-");
        } else {
            $("nav").removeClass("fixed-header-");
        }
    });

    var _feature_steps = $('[data-feature-steps]');
    function stepsHeight() {
        if(_feature_steps.length) {
            _feature_steps.each(function () {
                var that = $(this);
                var _step = that.children();
                var _h_last_step = _step.last().innerHeight();
                var _h_steps = that.innerHeight();
                that.css('min-height', _h_steps - _h_last_step - 1);
            })
        }
    }
    function stepsSlider() {
        if (_feature_steps.length) {
            _feature_steps.each(function () {
                var that = $(this);

                if (window.matchMedia("(min-width: 768px)").matches) {
                    if (that.hasClass('owl-builded')) {
                        that.trigger('destroy.owl.carousel');
                        that.removeClass('owl-builded');
                    }
                } else {
                    that.owlCarousel({
                        nav: true,
                        items: 1,
                        dots: false,
                        smartSpeed: 700,
                        //autoHeight: true
                    });
                    that.addClass('owl-builded');
                }
            })
        }
    }
    let _study_slider = $('.js-study-slider');
    function studySlider() {
        if (_study_slider.length) {
            _study_slider.each(function () {
                var that = $(this);

                if (window.matchMedia("(min-width: 768px)").matches) {
                    if (that.hasClass('owl-builded')) {
                        that.trigger('destroy.owl.carousel');
                        that.removeClass('owl-builded');
                    }
                } else {
                    that.owlCarousel({
                        nav: true,
                        items: 1,
                        dots: false,
                        smartSpeed: 700,
                        //autoHeight: true
                    });
                    that.addClass('owl-builded');
                }
            })
        }
    }
    stepsSlider();
    studySlider();
    stepsHeight();
    $(window).on('resize', function () {
        stepsSlider();
        studySlider();
        stepsHeight();
    });
});

$('document').ready(function ($) {
    function videoStart() {
        let _video_start = $('[data-play-video]');
        if(_video_start.length) {
            _video_start.each(function (i) {
                var video = $(this);
                video.attr('id', 'video_' + i);
                var video_play = document.getElementById('video_' + i);
                setTimeout(function () {
                    var playPromise = video_play.play();
                    console.log(video_play)
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            // Automatic playback started!
                            // Show playing UI.
                            // video_play.pause();
                        })
                            .catch(error => {
                                // Auto-play was prevented
                                // Show paused UI.
                            });
                    }
                }, 300)

                // var isPlaying = video_play.currentTime > 0 && !video_play.paused && !video_play.ended
                //     && video_play.readyState > 2;
                // if (!isPlaying) {
                //     video_play.play();
                // }
            });
        }
    }

    videoStart();

    $(".figure-kd").each(function () {
        let tl = new TimelineMax();
        const secondaryTitle = $(this).find(".figure-img, .figure-caption");
        tl.to(secondaryTitle, 1, {opacity: 0.5, y: "-50px"}, "-+1.1");
        let scene = new ScrollMagic.Scene({
            triggerElement: this,
            duration: 500,
            offset: 0,
            triggerHook: 0.2
        })
            .setTween(tl)
            .addTo(controller);
    });

    var _desktop_view = $(window).width() > 768;
    var _root = $('html');
    var _cs_section = $('.cs-section');

    if(_cs_section.length) {
        new fullpage('#fullpage', {
            navigation: true,
            navigationPosition: 'right',
            autoScrolling: true,
            scrollBar: true,
            scrollingSpeed: 700,
            //paddingTop: '87px',
            normalScrollElements: '[data-mega-scroll], [data-mega-menu], [data-hire-modal], .acsb-main',
            onLeave: function (origin, destination, direction) {
                if (direction =='down') {
                    $('.main-header').addClass('normal-header');
                }
                if (direction =='up' && destination.index !== 0) {
                    setTimeout(function () {
                        $('.main-header').removeClass('normal-header');
                    }, 300);
                    setTimeout(function () {
                        $('.main-header').addClass('normal-header');
                    }, 3000);
                }
                if (direction =='up' && destination.index == 0) {
                    $('.main-header').removeClass('normal-header');
                }
            }
        });
    }


    var _full_page_simple = $('.fullpage-simple')
    var _full_section = _full_page_simple.find('.section');
    if(_desktop_view) {
        if(_full_page_simple.length && _full_section.length > 1) {
            new fullpage('#fullpage', {
                autoScrolling: true,
                scrollBar: true,
                scrollingSpeed: 700,
                navigation: true,
                navigationPosition: 'right',
                //paddingTop: '87px',
                //scrollOverflow: true,
                normalScrollElements: '.normal-scroll, [data-mega-scroll], [data-mega-menu], [data-hire-modal], .acsb-main',
                onLeave: function (origin, destination, direction) {
                    videoStart();
                    if (direction =='down') {
                        $('.main-header').addClass('normal-header');
                    }
                    if (direction =='up' && destination.index !== 0) {
                        setTimeout(function () {
                            $('.main-header').removeClass('normal-header');
                        }, 300);
                        setTimeout(function () {
                            $('.main-header').addClass('normal-header');
                        }, 3000);
                    }
                    if (direction =='up' && destination.index == 0) {
                        $('.main-header').removeClass('normal-header');
                    }
                },
            });
        }
    }

    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 0,
        },
    });

    if($('[data-hero-mark]').length) {
        // SVG Animation
        var animstep_1 = new TimelineMax({paused: true});

        animstep_1.fromTo(
            "#klogo .s3",
            1,
            {x: 0, y: 0, rotation: 0.01, z: 0.01},
            {x: -89, y: 0, rotation: 0.01, z: 0.01},
            0
        );
        animstep_1.fromTo(
            "#klogo .s4",
            1,
            {x: 0, y: 0, rotation: 0.01, z: 0.01},
            {x: -308, y: 126, rotation: 0.01, z: 0.01},
            0
        );
        animstep_1.fromTo(
            "#klogo .s5",
            1,
            {x: 0, y: 0, rotation: 0.01, z: 0.01},
            {x: -352, y: -402, rotation: 0.01, z: 0.01},
            0
        );
        animstep_1.fromTo(
            "#klogo .s6",
            1,
            {x: 0, y: 0, rotation: 0.01, z: 0.01},
            {x: -325, y: 0, rotation: 0.01, z: 0.01},
            0
        );
        animstep_1.fromTo(
            "#klogo .s7",
            1,
            {x: 0, y: 0, rotation: 0.01, z: 0.01},
            {x: 328, y: 227, rotation: 0.01, z: 0.01},
            0
        );
        animstep_1.fromTo("#klogo .s8", 1, {x: 0, y: 0, rotation: 0.01, z: 0.01}, {
            x: -276,
            y: -1,
            rotation: 0.01,
            z: 0.01
        }, 0);
        animstep_1.fromTo(
            "#klogo .s9",
            1,
            {x: 0, y: 0, rotation: 0.01, z: 0.01},
            {x: 145, y: 0, rotation: 0.01, z: 0.01},
            0
        );
        animstep_1.fromTo(
            "#klogo .s10",
            1,
            {x: 0, y: 0, rotation: 0.01, z: 0.01},
            {x: 335, y: -73, rotation: 0.01, z: 0.01},
            0
        );
        animstep_1.fromTo(
            "#klogo .s11",
            1,
            {x: 0, y: 0, rotation: 0.01, z: 0.01},
            {x: 380, y: -161, rotation: 0.01, z: 0.01},
            0
        );
        animstep_1.fromTo(
            "#klogo .s12",
            1,
            {x: 0, y: 0, rotation: 0.01, z: 0.01},
            {x: 0, y: -255, rotation: 0.01, z: 0.01},
            0
        );
        animstep_1.fromTo(
            "#klogo .s13",
            1,
            {x: 0, y: 0, rotation: 0.01, z: 0.01},
            {x: 0, y: 139, rotation: 0.01, z: 0.01},
            0
        );
        animstep_1.fromTo(
            "#klogo .s14",
            1,
            {x: 0, y: 0, rotation: 0.01, z: 0.01},
            {x: 276, y: 0, rotation: 0.01, z: 0.01},
            0
        );
        animstep_1.fromTo(
            "#klogo .s15",
            1,
            {x: 0, y: 0, rotation: 0.01, z: 0.01},
            {x: -280, y: 205, rotation: 0.01, z: 0.01},
            0
        );
        animstep_1.fromTo(
            "#klogo .s16",
            1,
            {x: 0, y: 0, rotation: 0.01, z: 0.01},
            {x: -280, y: 205, rotation: 0.01, z: 0.01},
            0
        );
        animstep_1.fromTo(
            "#klogo .s17",
            1,
            {x: 0, y: 0, rotation: 0.01, z: 0.01},
            {x: -275, y: 0, rotation: 0.01, z: 0.01},
            0
        );

        // Background Animation
        var animstep_2 = new TimelineMax({paused: true});
        animstep_2.fromTo(
            "[data-hero-bg]",
            1,
            {opacity: .5},
            {opacity: .2},
            0
        );

        // Title 1 Animation
        var animstep_3 = new TimelineMax({paused: true});
        animstep_3.fromTo(
            "[data-caption='1']",
            1,
            { x: 0, y: 100, opacity: 1, rotation: 0.01, z: 0.01 },
            { x: 0, y: -100, opacity: 0, rotation: 0.01, z: 0.01 },
            0
        );

        // Title 2 Animation
        var animstep_4 = new TimelineMax({paused: true});
        animstep_4.fromTo(
            "[data-caption='2']",
            1,
            { x: 0, y: 0, opacity: 0, rotation: 0.01, z: 0.01 },
            { x: 0, y: 100, opacity: 1, rotation: 0.01, z: 0.01 },
            0
        );

        // Image Animation
        var animstep_5 = new TimelineMax({paused: true});
        animstep_5.fromTo(
            "[data-hero-img]",
            1,
            {opacity: 0, scale: 0},
            {opacity: 1, scale: 1},
            0
        );

        var tl = new TimelineMax({repeat: -1})
            .to("#klogo", 3, {x: "0", y: "-=10", yoyo: true, ease: Power0.easeNone})
            .to("#klogo", 3, {x: "0", y: "+=10", yoyo: true, ease: Power0.easeNone})

        $('[data-hero-mark]').addClass('animate-init');
    }

    var _hero_banner = $('[data-hero]');
    var _hero_banner_size = $('[data-hero-size]');
    var _circle_section = $('[data-circle-box]');
    var _header = $('.main-header');
    var _scroll_auto = true
    var _scroll_bar = true;
    if(_win.innerWidth() < 768) {
        //_scroll_auto = false
    }
    function _set_hero_size() {
        if (_hero_banner_size.length) {
            if (_win.innerWidth() < 768) {
                _hero_banner_size.each(function () {
                    var that = $(this);
                    that.css('max-height', _win.innerHeight() - _header.innerHeight());
                })
            }
        }
    }
    _set_hero_size();
    _win.on('resize', _set_hero_size);
    if(_hero_banner.length) {
        _hero_banner.insertBefore('#fullpage');
        new fullpage('#fullpage', {
            navigation: true,
            navigationPosition: 'left',
            autoScrolling: _scroll_auto,
            scrollBar: true,
            scrollingSpeed: 700,
            //scrollOverflow: true,
            // hybrid: true,
            fitToSection: false,
            normalScrollElements: '#recent-news_, [data-mega-scroll], [data-hire-modal], [data-mega-menu], .acsb-main',
            afterReBuild: function(){
                console.log("fullPage.js has manually being re-builded");
            },
            onLeave: function (origin, destination, direction) {
                //console.log(origin, destination, direction, destination.index)
                if (destination.index == 0) {
                    animstep_3.duration(.4).reverse();
                    animstep_1.duration(.5).reverse();
                    animstep_2.duration(.5).reverse();
                }
                if (destination.index == 1) {
                    animstep_2.delay(.3).duration(.5).play();
                    animstep_1.duration(.5).play();
                    animstep_5.duration(.5).reverse();
                    //animstep_3.duration(.4).reverse();
                    animstep_4.duration(.6).reverse();
                    animstep_3.duration(.4).play();
                }
                if (destination.index == 2) {
                    animstep_1.duration(.5).reverse();
                    animstep_4.duration(.6).play();
                    animstep_5.duration(.5).play();
                    animstep_3.duration(.4).play();
                }
                if (destination.index > 2) {
                    _root.addClass('hero-unpin');
                    setTimeout(function () {
                        $('.main-header').addClass('fixed-header');
                    }, 400);
                }
                if (destination.index <= 2) {
                    _root.removeClass('hero-unpin');
                    setTimeout(function () {
                        $('.main-header').removeClass('fixed-header');
                    }, 400);
                }
                // define movement of panels .pm - blue, .dd - green, .vp - yellow
                if (destination.index == 5 && direction =='down') {
                    setTimeout(function () {
                        if(_circle_section.length) {
                            _circle_section.addClass('start-animated');
                        }
                    }, 400);
                }
                if (destination.index >= 5 && destination.index <=7) {
                    setTimeout(function () {
                        if(_circle_section.length) {
                            _circle_section.addClass('stopped animated');
                        }
                    }, 450);
                }
                else {
                    setTimeout(function () {
                        if(_circle_section.length) {
                            _circle_section.removeClass('stopped');
                        }
                    }, 400);
                }
                if (destination.index == 5) {
                    _circle_section.removeClass('dd-active vp-active').addClass('pm-active');
                }
                if (destination.index == 6) {
                    _circle_section.removeClass('pm-active vp-active').addClass('dd-active');
                }
                if (destination.index == 7) {
                    _circle_section.removeClass('pm-active dd-active').addClass('vp-active');
                }
                if (destination.index > 2 && direction =='down') {
                    $('.main-header').addClass('normal-header');
                }
                if (direction =='up' && destination.index !== 0 &&
                    destination.index !== 1 && destination.index !== 2 &&
                    destination.index !== 5 && destination.index !== 6 &&
                    destination.index !== 7) {
                    setTimeout(function () {
                        $('.main-header').removeClass('normal-header');
                    }, 300);
                    setTimeout(function () {
                        $('.main-header').addClass('normal-header');
                    }, 3000);
                }
                if (direction =='up' && destination.index <= 2) {
                    $('.main-header').removeClass('normal-header');
                }
                //wow.init();
            },
        });
        function setNav() {
            let _toggle_left = $('[data-menu-toggle]').offset().left;
            $('#fp-nav').css('left', _toggle_left);
        }
        setNav();
        $(window).on('resize', setNav);
    }

    /* chenge url icon weather on location page */
    if($('.location-page .splw-main-wrapper .splw-cur-temp .weather-icon').length != 0){
        let icon = $('.location-page .splw-main-wrapper .splw-cur-temp .weather-icon'),
            urlIcon = icon.attr("src");
            console.log(urlIcon);

        switch (urlIcon) {
            case 'http://openweathermap.org/img/w/10n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/rain-moon-night.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/10d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/rain-sun-day.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/11n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/lightning-night.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/11d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/lightning-day.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/13d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/snow-day-windy.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/13n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/snow-night-windy.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/01d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/sun.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/01n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/moon.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/02n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/cloud-moon.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/02d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/cloud-sun.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/03n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/cloud.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/03d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/cloud.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/04n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/cloud.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/04d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/cloud.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/50n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/fog.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/w/50d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/fog.svg");
                icon.addClass('active');
                break;
                
            case 'http://openweathermap.org/img/wn/10n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/rain-moon-night.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/10d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/rain-sun-day.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/11n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/lightning-night.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/11d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/lightning-day.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/13d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/snow-day-windy.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/13n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/snow-night-windy.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/01d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/sun.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/01n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/moon.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/02n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/cloud-moon.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/02d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/cloud-sun.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/03n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/cloud.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/03d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/cloud.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/04n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/cloud.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/04d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/cloud.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/50n.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/fog.svg");
                icon.addClass('active');
                break;
            case 'http://openweathermap.org/img/wn/50d.png':
                icon.attr("src", location.origin + "/wp-content/themes/kobedigital/images/weather/fog.svg");
                icon.addClass('active');
                break;
            default:
                break;
        }
    }

});

window.onload = function() {
    let _preloader = $('[data-preloader]');
    setTimeout(function () {
        if(_preloader.length) {
            _preloader.hide();
        }
    }, 500);
    $('[data-preload]').attr('data-preload', false);
};

function stickyHeader() {
    var check_front = $('body[class*="front"]').length;
    if(!check_front) {
        if ($(window).scrollTop() > 500) {
            $('.main-header').addClass('fixed-header');
            setTimeout(function () {
                $('.main-header').addClass('full-header');
            }, 300);
        } else {
            $('.main-header').removeClass('fixed-header full-header');
        }
    }
}
stickyHeader();
$(window).scroll(function () {
    stickyHeader();
});

// Hover on Case Studies Items (use jquery.hoverIntent.min.js)
let _case_item = $('[data-wcs-item]');

if(_case_item.length) {
    _case_item.hoverIntent({
        over: function() {
            $(this).addClass('hover');

        },
        timeout: 120,
        interval: 50,
        sensitivity: 10,
        out: function() {
            $(this).removeClass('hover');
        }
    });
}

// Check Scroll bar
function checkScroll(_el) {
    $.fn.hasScrollBar = function() {
        var e = this.get(0);
        return {
            vertical: e.scrollHeight > e.clientHeight,
            horizontal: e.scrollWidth > e.clientWidth
        };
    }
    var _el_wrap = $(_el);
    if(_el_wrap.length) {
        if (_el_wrap.hasScrollBar().vertical) {
            _el_wrap.addClass('has-scroll');
        } else {
            _el_wrap.removeClass('has-scroll');
        }
    }
}

let _title_decor = $('[data-decor-title]');
if(_title_decor.length) {
    _title_decor.each(function(){
        let $this = $(this), text=$this.html().trim(), words = text.split(/\s+/);
        let lastWord = words.pop();
        words.push('<span>' + lastWord + '<svg class="k-ico"><use xlink:href="#ico-arrow-r"></use></span>');
        $this.html(words.join(' '));
    });
}

function graphic_width() {
    let _sm_title = $('.sm-title');

    if(_sm_title.length) {
        _sm_title.each(function () {
            let _that = $(this);
            let _img = _that.next('.sm-img').find('img');
            if(_img.length) {
                _that.css('max-width', _img.width() - 20);
            }
        })
    }
}

$(window).on('load', graphic_width);
$(window).on('resize', graphic_width);

let _news_item = $('.js-blog-col');
function newsSliderMobile() {
    if (_news_item.length) {
        if (window.matchMedia("(min-width: 768px)").matches) {
            if ($('.js-recent-news-slider').length) {
                $('.js-recent-news-slider').next('.article-cta').remove();
                $('.js-recent-news-slider').remove();
                $('.recent-news').addClass('fp-normal-scroll');
                if($('.fp-enabled').length) {
                    fullpage_api.reBuild();
                }
            }
        } else {
            $('<div class="js-recent-news-slider owl-carousel" />').appendTo('.recent-news');

            _news_item.each(function () {
                let that = $(this);
                that.clone().appendTo('.js-recent-news-slider');
            });
            $('.article-cta').insertAfter('.js-recent-news-slider');
            $('.js-recent-news-slider').owlCarousel({
                nav: true,
                items: 1,
                dots: false,
                smartSpeed: 700,
            });
            $('.js-recent-news-slider').addClass('owl-builded');
            $('.recent-news').removeClass('fp-normal-scroll');
            if($('.fp-enabled').length) {
                fullpage_api.reBuild();
            }
        }
    }
}
newsSliderMobile();

// let _preloader = $('[data-preloader]');
// $(_win).on('load', function () {
//     setTimeout(function () {
//         if(_preloader.length) {
//             _preloader.hide();
//         }
//         // if($('.fp-enabled').length) {
//         //     fullpage_api.reBuild();
//         // }
//     }, 1500);
// });


$('document').ready(function ($) {
    function digitalClock() {
        function _instanceof(left, right) {
            if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
                return !!right[Symbol.hasInstance](left);
            } else {
                return left instanceof right;
            }
        }

        function _classCallCheck(instance, Constructor) {
            if (!_instanceof(instance, Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }

        var setDate =
            /*#__PURE__*/
            function () {
                function setDate(elem, hour, minute) {
                    _classCallCheck(this, setDate);

                    this.elem = elem;
                    this.hour = hour;
                    this.minute = minute;

                    //console.log(this.elem)
                    //console.log('M: ' + this.minute)
                }

                _createClass(setDate, [{
                    key: "clock",
                    value: function clock() {
                        var hour = this.hour * 30;
                        var minute = this.minute * 6;

                        document.querySelector(this.elem + ' .hour').style.transform = "rotate(".concat(hour, "deg)");
                        document.querySelector(this.elem + ' .minute').style.transform = "rotate(".concat(minute, "deg)");

                    }
                }]);

                return setDate;
            }();

        var itemList = document.querySelectorAll('.item-location');

        itemList.forEach(function(item, index){
            var h = $(item).find('.hour').text();
            var m = $(item).find('.minute').text();

            $(item).attr('data-item', index);
            new setDate('*[data-item="' + index + '"]', h, m).clock();

        });

    }

    digitalClock();
});

$(document).on('click', '.js-popup', function (e) {
    var wrapEl = $('.popup-wrap');
    var top = $(this).position().top;
    var left = $(this).position().left;

    var parentTop = $('.map').offset().top;
    var parentLeft = $('.map').offset().left;

    var elTop = top - parentTop;
    var elLeft = left - parentLeft;

    wrapEl.css({
        top: elTop + 33,
        left: elLeft - wrapEl.width() - 90
    })


    var dataCity = $(this).data('city');

    console.log(dataCity)
    $('.popup-content .list-item').hide();
    $('.popup-content .list-item[data-show=' + dataCity + ']').show();

    wrapEl.show();

    var dataCity = $('.popup-content .list-item').data('city');


});

$(document).on('click', function (e) {
    if ($(e.target).closest('.popup-wrap .list-item, .js-popup').length === 0) {
        $('.popup-content .list-item, .popup-wrap').hide();
    }
});

