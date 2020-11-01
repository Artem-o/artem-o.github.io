
// Hamburger
window.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.header__nav'),
    link = document.querySelectorAll('.header__link'),
    btn = document.querySelectorAll('.header__btn'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger__active');
        nav.classList.toggle('header__nav__active');
    });

    link.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger__active');
            nav.classList.toggle('header__nav__active');
        });
    });

    btn.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger__active');
            nav.classList.toggle('header__nav__active');
        });
    });
});

$(document).ready(function(){
    // Carousel
    $('.carousel__inner').slick({
        adaptiveHeight: false,
        speed: 900,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 846,
                settings: {
                    dots: true,
                    arrows: false,
                }
            }
        ]
    });

    // Autos/btn
    $('.cars__btn').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.cars__list').eq(i).toggleClass('cars__list_active');
        });
    });

    // Modal
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    // Close modal
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks').fadeOut('slow');
    });

    // Validation
    function valideForms(form) {
        $(form).validate({
            rules: {
                name: 'required',
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
              name: "Bitte geben Sie Ihren Namen an",
              phone: "Bitte geben Sie Ihren Telefonnummer an",
              email: {
                required: "Wir benötigen Ihre E-Mail-Adresse, um Sie zu kontaktieren",
                email: "Ihre E-Mail-Adresse muss das Format name@domain.com haben"
              }
            }
        });
    }
    valideForms('#consultation-form');
    valideForms('#consultation form');

    
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation').fadeOut();
            $('.overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and pageup
    $(window).scroll(function() {
        if($(this).scrollTop() > 1200) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    $('a[href^="#"]').click(function() {
        const _href = $(this).attr('href');
        $('html, body').animate({scrollTop: $(_href).offset().top+'px'});
        return false;
    });

    new WOW().init();

});

