console.log('File connected');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message = document.querySelector('#message');

message.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    message.textContent = 'Loading...'

    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {

            if (data.error) {
                message.textContent = 'Error: ' + data.error;
            }
            else {
                const displayData = `Temperature at ${data.location} is ${data.temperature} degrees`;
                message.textContent = displayData;
            }
        })
    })
})




