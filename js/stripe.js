var stripeKey = 'pk_test_EdJlSPmqO0xEFAdt8HkGrdKb00l3XuP2ov';
var stripe = Stripe(stripeKey);
var elements = stripe.elements();
var card = elements.create('card', {
    style: {
        base: {
            color: 'black',
            fontSize: '20px',
            iconColor: 'black',
        },
    },
    hidePostalCode: true,
});

card.mount('#card-element');

card.on('focus', () => {
    console.log('user is in form');
});

card.addEventListener('change', function (event) {
    var errors = document.getElementById('errors');

    if (event.error) {
        errors.textContent = event.error.message;
    } else {
        errors.textContent = '';
    }
});

var form = document.querySelector('#card-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    stripe
        .createToken(card)
        .then((result) => {
            if (result.error) {
                // Error
            } else {
                alert(result.token.id);
            }
        });
});
