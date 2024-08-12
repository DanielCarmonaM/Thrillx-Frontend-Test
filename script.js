
// Mega Menu
$(document).ready(function () {
    // Mega Menu
    $(".nav-link").hover(
        function () {
            if ($(this).text() === "Services") {
                $(this).css('font-weight', 'bold'); // Aplica bold al texto
                $(".mega-menu").stop(true, true).slideDown(300);
            }
        },
        function () {
            if ($(this).text() === "Services") {
                $(this).css('font-weight', 'normal'); // Reestablece el font-weight
            }
        }
    );

    $(".mega-menu").hover(
        function () {
            $(this).stop(true, true).slideDown(300);
            $(".nav-link:contains('Services')").css('font-weight', 'bold'); // Asegura que el texto siga bold
        },
        function () {
            $(this).stop(true, true).slideUp(300);
            $(".nav-link:contains('Services')").css('font-weight', 'normal'); // Reestablece el font-weight
        }
    );

    $(".navbar-toggler").click(function () {
        $(".mobile-menu").show().addClass("slideIn").removeClass("slideOut");
    });

    $(".close-btn").click(function () {
        $(".mobile-menu").addClass("slideOut").removeClass("slideIn");
        setTimeout(function () {
            $(".mobile-menu").hide();
        }, 300);
    });
});


//increasing numbers animation

$(document).ready(function () {
    function animateNumber(element, start, end, duration) {
        $({ count: start }).animate({ count: end }, {
            duration: duration,
            easing: 'swing',
            step: function () {
                $(element).text(Math.floor(this.count) + '%');
            },
            complete: function () {
                $(element).text(this.count + '%');
            }
        });
    }

    $('.stat-number').each(function () {
        let endValue = $(this).data('number');
        animateNumber(this, 0, endValue, 2000); 
    });
});
//swiper carousel 
$(document).ready(function () {
    var sections = $('.section-4-left');
    var imageContainer = $('.section-4-right');
    var bulletsContainer = $('.swiper-pagination');

    // create pagination bullets
    sections.each(function (index) {
        var bullet = $('<div class="swiper-pagination-bullet"></div>');
        bulletsContainer.append(bullet);
    });

    var bullets = $('.swiper-pagination-bullet');

    function updateImageAndBullets(scrollTop, windowHeight) {
        var sectionTop = $('.section-4').offset().top;
        var sectionHeight = $('.section-4').height();
        var sectionBottom = sectionTop + sectionHeight;
        var previousSectionBottom = $('.section-3').offset().top + $('.section-3').height();

        if (scrollTop >= sectionTop && scrollTop < sectionBottom - windowHeight) {
            // Fix image and bullets inside section 4
            imageContainer.css({
                'position': 'fixed',
                'top': '50%',
                'transform': 'translateY(-50%)',
                'opacity': 1
            });

            bulletsContainer.css({
                'position': 'fixed',
                'top': ($(window).width() <= 768) ? '45%' : '50%', 
                'transform': 'translateY(-50%)',
                'opacity': 1
            });

            // For mobile 
            if ($(window).width() <= 768) {
                imageContainer.css({
                    'top': '27%',
                    'left': '0%'
                });

                bulletsContainer.css({
                    'top': '42%' 
                });
            }

            // Change active image and bullet
            sections.each(function (index) {
                var sectionOffset = $(this).offset().top - windowHeight / 2;

                if (scrollTop >= sectionOffset) {
                    var bgImage = $(this).data('bg');
                    imageContainer.css('background-image', 'url(' + bgImage + ')');

                    bullets.removeClass('swiper-pagination-bullet-active');
                    bullets.eq(index).addClass('swiper-pagination-bullet-active');

                    sections.css('opacity', .1);
                    $(this).css('opacity', 1);
                }
            });
        } else {
            if (scrollTop < sectionTop) {
                imageContainer.css({
                    'position': 'absolute',
                    'top': '48px',
                    'transform': 'translateY(0)',
                    'right': ($(window).width() > 768) ? '143px' : 'auto' 
                });

                bulletsContainer.css({
                    'position': 'absolute',
                    'top': ($(window).width() <= 768) ? '66.5px' : '66.5px', 
                    'left': 'auto', //desktop
                    'transform': 'translateY(0%)'
                });

                // Mobile image fit 
                if ($(window).width() <= 768) {
                    imageContainer.css({
                        'max-height': '216px',
                        'width': '100%',
                        'object-fit': 'cover'
                    });
                }
            } else if (scrollTop < previousSectionBottom) {
                bulletsContainer.css({
                    'position': 'absolute',
                    'top': ($(window).width() <= 768) ? '1675.33px' : (sectionTop - bulletsContainer.height()) + 'px',
                    'left': 'auto',
                    'transform': 'translateY(0%)' 
                });
            } else {
                imageContainer.css({
                    'position': 'absolute',
                    'top': (sectionHeight - imageContainer.height()) + 'px',
                    'transform': 'translateY(0)',
                    'right': ($(window).width() > 768) ? '143px' : 'auto' // right: 143px on desktop at the end of the section
                });

                bulletsContainer.css({
                    'position': 'absolute',
                    'top': '1693.33px', //For desktop when reaching the end
                    'left': 'auto',
                    'transform': 'translateY(0%)' 
                });

                // For Mobile
                if ($(window).width() <= 768) {
                    imageContainer.css({
                        'top': '1276px',
                        'max-height': '216px',
                        'width': '100%',
                        'object-fit': 'cover'
                    });
                }
            }
            bulletsContainer.css('opacity', 1);
        }
    }

    // Initial image and active bullet
    var firstSectionBg = sections.first().data('bg');
    imageContainer.css({
        'background-image': 'url(' + firstSectionBg + ')',
        'height': '406px',
        'opacity': 1,
        'right': ($(window).width() > 768) ? '143px' : 'auto' //  left: 50% on desktop on page load
    });
    bulletsContainer.css({
        'opacity': 1,
        'position': 'absolute',
        'top': ($(window).width() <= 768) ? '3%' : '3%', // For mobile on page load
        'left': 'auto',
        'transform': 'translateY(0%)'
    });
    bulletsContainer.find('.swiper-pagination-bullet').first().addClass('swiper-pagination-bullet-active');

    // Starting opacity of first slide
    sections.first().css('opacity', 1);

    // Update image and bullets on scroll
    $(window).on('scroll', function () {
        var scrollTop = $(this).scrollTop();
        var windowHeight = $(window).height();
        updateImageAndBullets(scrollTop, windowHeight);
    });

    // Update on page load
    updateImageAndBullets($(window).scrollTop(), $(window).height());
});


//dynamic text on button section 5
$(document).ready(function () {
    function updateButtonText() {
        if ($(window).width() <= 768) {
            $('.section-5-button').text('Partner With Us');
        } else {
            $('.section-5-button').text('View Services');
        }
    }

    updateButtonText();
    $(window).resize(updateButtonText);
});

//accordion s-6
document.addEventListener("DOMContentLoaded", function() {
    var accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(function(header) {
        header.addEventListener("click", function() {
            var accordionItem = this.parentElement;
            accordionItem.classList.toggle("active");
        });
    });
});































































































