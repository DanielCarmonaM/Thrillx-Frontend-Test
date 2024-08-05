//mega menu
$(document).ready(function () {
    $(".nav-link").hover(
        function () {
            if ($(this).text() === "Services") {
                $(".mega-menu").stop(true, true).slideDown(300);
            }
        },
        function () {
            if (!$(".mega-menu").is(":hover")) {
                $(".mega-menu").stop(true, true).slideUp(300);
            }
        }
    );

    $(".mega-menu").hover(
        function () {
            $(this).stop(true, true).slideDown(300); // Asegúrate de que esté visible mientras se está sobre él
        },
        function () {
            $(this).stop(true, true).slideUp(300); // Oculta el menú cuando el cursor sale de él
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
        animateNumber(this, 0, endValue, 2000); // Animar durante 2000ms
    });
});
//swiper carousel 
$(document).ready(function () {
    var sections = $('.section-4-left');
    var imageContainer = $('.section-4-right');
    var bulletsContainer = $('.swiper-pagination');
    var lastScrollTop = 0;

    // Crear bullets para la paginación
    sections.each(function (index) {
        var bullet = $('<div class="swiper-pagination-bullet"></div>');
        bulletsContainer.append(bullet);
    });

    var bullets = $('.swiper-pagination-bullet');

    $(window).on('scroll', function () {
        var scrollTop = $(this).scrollTop();
        var windowHeight = $(window).height();

        // Verifica si la imagen y los bullets deben aparecer
        if (scrollTop >= $('.section-4').offset().top - windowHeight / 2 &&
            scrollTop < $('.section-4').offset().top + $('.section-4').height()) {
            
            var sectionOffset = $('.section-4-left').offset().top + ($('.section-4-left').outerHeight() / 2);
            
            if (scrollTop >= sectionOffset - windowHeight / 2) {
                imageContainer.css('opacity', 1);
                bulletsContainer.css('opacity', 1);
            } else {
                imageContainer.css('opacity', 0);
                bulletsContainer.css('opacity', 0);
            }
        } else {
            imageContainer.css('opacity', 0);
            bulletsContainer.css('opacity', 0);
        }

        // Cambia la imagen de fondo y el bullet activo
        sections.each(function (index) {
            var sectionOffset = $(this).offset().top - windowHeight / 2;

            if (scrollTop >= sectionOffset) {
                var bgImage = $(this).data('bg');
                imageContainer.css('background-image', 'url(' + bgImage + ')');

                sections.css('opacity', 0);
                $(this).css('opacity', 1);

                bullets.removeClass('swiper-pagination-bullet-active');
                bullets.eq(index).addClass('swiper-pagination-bullet-active');
            }
        });

        lastScrollTop = scrollTop;
    });
})
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

//acordeon s-6
document.addEventListener("DOMContentLoaded", function() {
    var accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(function(header) {
        header.addEventListener("click", function() {
            var accordionItem = this.parentElement;
            accordionItem.classList.toggle("active");
        });
    });
});















































