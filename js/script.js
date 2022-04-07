const validateForm = ()=> {
    const form = document.getElementById("contact");
    form.noValidate = true;
    form.addEventListener('submit', function handleFormSubmit(event) {
      event.preventDefault();
        const isValid = form.reportValidity();
      if (isValid) {
        const formData = getFormData('contact')
          if(formData.tosAgreement === "on") {
              formData.tosAgreement = 'true'
          }
          const response= sendData(JSON.stringify(formData))
          form.reset()
      }
    });
}

const sendData = async(body) => {
    try {
        const response = await fetch('http://bukablelandingtest-env.eba-phpmau24.eu-north-1.elasticbeanstalk.com/v1/customer', {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
        });
        const result = await response.json();
        return result
    }catch (e) {
        console.error('Ошибка отправки данных')
    }
}
const getFormData = (selector) => Object.fromEntries(new FormData(document.getElementById(selector)))


$(document).ready(function (){

    validateForm()
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:3
            }
        }
    });

    $("#scroll").click(function (){
        $('html, body').animate({
            scrollTop: $("#contact").offset().top
        }, 2000);
    });

    $('#nav li').click(function() {
        let active = $(this).data('link');
        $('p.content').toggle();
        const select = document.querySelector('#contact select').getElementsByTagName('option');
        for (let i = 0; i < select.length; i++) {
            if (select[i].value === active) select[i].selected = true;
        }
        console.log(active);
        console.log(select);
    });

})


$(document).ready(function(){
  $(".owl-carousel").owlCarousel();
});

 $('.owl-carousel').owlCarousel({
    loop:true,
    margin:5,
    nav:false,
    responsiveClass:true,
    autoplay:true,
    autoplayTimeout:2500,
    responsive:{
        0:{
            items:1,
        },
        600:{
            items:2
        },
        1000:{
            items:4
        }
    }
});

