const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', e => {
    e.preventDefault()

    const location = search.value

    if(location.length === 0){
        msgOne.textContent = "This field can not be empty"
        return;
    }

    msgOne.textContent = "loading..."
    msgTwo.textContent = ""

    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(resp => resp.json()
            .then(data => {
                if(data.err){
                    msgOne.textContent = data.err
                } else {
                    msgOne.textContent = data.weather
                    msgTwo.textContent = data.location
                }
            })
        )


})