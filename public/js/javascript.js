$(document).ready(function () {
        $('ul.nav > li').click(function (e) {
            $('ul.nav > li').removeClass('active');
            $(this).addClass('active');
        });
        $('.toggle').click(function(){
            $('html, body').animate({
                scrollTop: $( $(this).attr('href') ).offset().top
            }, 500);
            return false;
        });

        $('.nav .toggle').on('click', function(){
          if (window.innerWidth <= 768) {
            $('.btn-navbar').click();
            $('.navbar-toggle').click()
          }
        });

        $('.nav-pills a:not(".external")').click(function (e) {
          e.preventDefault()
          $(this).tab('show')
        })
    });
