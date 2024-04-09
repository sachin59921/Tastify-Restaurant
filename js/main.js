(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);


fetch('http://localhost:3000/api/menuItems')
.then(response => response.json())
    .then(menuItems => {
        // Get the container element
        const container = document.getElementById('menuItemsContainer');

        // Iterate over each menu item
        menuItems.forEach(item => {
            // Create HTML elements for the item
            const itemElement = document.createElement('div');
            itemElement.classList.add('col-lg-6');
            itemElement.innerHTML = `
                    <div class="d-flex align-items-center">
                        <img class="flex-shrink-0 img-fluid rounded" src="http://localhost:3000/${item.image}" alt="" style="width: 80px;">
                        <div class="w-100 d-flex flex-column text-start ps-4">
                            <h5 class="d-flex justify-content-between border-bottom pb-2">
                                <span>${item.name}</span>
                                <span class="text-primary">Rs ${item.price}</span>
                            </h5>
                            <small class="fst-italic">${item.description}</small>
                        </div>
                    </div>
                `;
            menuItemsContainer.appendChild(itemElement);
        });
    })
    .catch(error => {
        console.error('Error fetching menu items:', error);
    });


    reservation.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(reservation);
    for (const [key, value] of formData) {
        console.log(key,value);
      }
    let data = {};
    formData.forEach((value, key) => data[key] = value);

    fetch('http://localhost:3000/api/reserve',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
    })
    .then((res) => {console.log(res.json());}).
    then(() => formData.reset());
});