const form = document.getElementById("contact");
const cookie = document.getElementById('cookie');

new Vue({
    el: '#register',
    data: {
        type: '',
        name: '',
        email: '',
        tosAgreement: false,
        button: 'Join Waitlist',
        send: false,
        loading: false,
        error_type: false,
        error_email: false,
        error_names: false,
        error_agree: false,
        email_invalid: false,
        result: ''
    },
    computed: {
        isValid () {
            return this.type && this.name && this.email && this.tosAgreement
        }
    },
    methods: {
        onChange(event){
            console.log(event.target.value);
        },
        validEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        Send () {

            if (this.isValid) {
                this.button = ' Loading... ';
                setTimeout(function () {
                    this.send = true
                }.bind(this), 2000)
            }

            if(!this.tosAgreement) {
                this.error_agree = true;
            }
            if(!this.type) {
                this.error_type = true;
            }
            if(!this.name) {
                this.error_names = true;
            }            
            if(!this.email) {
                this.error_email = true;
            } else if (!this.validEmail(this.email)) {
                this.email_invalid = true;
            } else {
                this.email_invalid = false;
            }

        },
        async save () {
            if (!this.isValid) return false;

            this.loading = true;

            const formData = getFormData('contact');

            var header = new Headers();
            header.append("Content-Type", "application/json");
            
            var raw = JSON.stringify(formData);
            console.log('result:', raw);

            var requestOptions = {
                method: 'POST',
                headers: header,
                body: raw,
                mode: 'cors',
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
            };
            
            const response = await fetch(
                "http://bukablelandingtest-env.eba-phpmau24.eu-north-1.elasticbeanstalk.com/v1/customer", 
                requestOptions
            ).finally(() => this.loading = false);
            
            const result = await response.json();
            return result;
        }
    }
});

const getFormData = (selector) => Object.fromEntries(new FormData(document.getElementById(selector)));

function onMemorySelect()
{
    localStorage.setItem('cookie', 'true');
    if(localStorage.getItem('cookie') === 'true') {
        cookie.classList.add('hidden');
    }
}

if(localStorage.getItem('cookie') === 'true') {
    cookie.classList.add('hidden');
}
// const validateForm = () => {

//     const form = document.getElementById("contact");
//     const result = document.getElementById('result');
//     form.noValidate = true;
//     form.addEventListener('submit', function handleFormSubmit(event) {
//     event.preventDefault();

//     const isValid = form.reportValidity();
//         if (isValid) {
//             const formData = getFormData('contact')
//             if(formData.type === 'Who are you?') {
//                 alert('Choose who you want to sign up for');
//             }
//             if(formData.name === "") {
//                 alert('Write your name');
//             }
//             if(formData.email === "") {
//                 alert('Write your email');
//             } else if (validateEmail(formData.email) === false) {
//                 alert('This address is not an email address');
//             }
//             if(formData.tosAgreement === "on") {
//                 formData.tosAgreement = 'true'
//                 console.log('formData', formData);
//                 sendData(formData);
//                 result.innetHTML = '<p>Success!</p>';
//                 form.reset();
//             }
            
//         }
//     });
// }


const sendData = async (body) => {
    try {
        var header = new Headers();
        header.append("Content-Type", "application/json");
        
        var raw = JSON.stringify(body);
        
        var requestOptions = {
            method: 'POST',
            headers: header,
            body: raw,
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
        };
        
        const response = await fetch("http://bukablelandingtest-env.eba-phpmau24.eu-north-1.elasticbeanstalk.com/v1/customer", requestOptions);
        const result = await response.json();
        console.log('result:', result);
        error.innetHTML = '<pre>'+JSON.stringify(result, null, 4)+'</pre>';
        return result
    }catch (e) {
        console.error('???????????? ???????????????? ????????????')
    }
}



$(document).ready(function (){

    //validateForm();
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        responsive:{
            0:{
                items:1
            },
            400: {
                items:1
            },
            600:{
                items:1
            },
            900:{
                items:1
            },
            1000:{
                items:3
            }
        }
    });

    window.addEventListener('scroll', function() {
        let modal = document.getElementById('modalmenu');
        let el = document.querySelectorAll('.modal-backdrop');
        if(window.pageYOffset >= 100) {
            modal.style.display = 'none';
            el[0].remove();
        };
    });



    $("a.hex").click(function() {
        //$("body").removeAttr("style");
        //document.body.classList.remove("modal-open");
        //document.body.style.removeAttribute;
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, {
            duration: 200,
            easing: "swing"
        });
        return false;
    });  
    
	(function setCookie() {
		const d = new Date();
		const exdays = 5;
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		const expires = "expires="+d.toUTCString();
		const urlSearchParams = new URLSearchParams(window.location.search);
		const Cookie = Object.fromEntries(urlSearchParams.entries());
		const currentURL = location.protocol + '//' + location.host + location.pathname;
		const doublePrices = () => 
			Object.entries(Cookie).map(([key, value]) => 
				document.cookie = key + "=" + value + ";" + expires + ";path=/");
				document.cookie = "current_url=" + currentURL + ";" + expires + ";path=/"
		doublePrices();
	}());



	function getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

})

