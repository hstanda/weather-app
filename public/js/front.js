const weatherForm = document.querySelector('form')
const search = document.querySelector('#location')
const forcast_div = document.querySelector('.forcast_div')
const message_one = document.querySelector('#message_one')
const message_two = document.querySelector('#message_two')

weatherForm.addEventListener('submit', (event)=> {
    event.preventDefault()
    url = '/weather?address='+search.value
    message_one.textContent = 'Loading...'
    message_two.textContent = ''
    fetch(url).then( (response)=>{
        response.json().then(({location,address,forecast, error=''} ={})=>{
            if(error){
                message_one.textContent = 'Error : '+ error
            }else{
                message_one.textContent = 'Location : '+ location
                message_two.textContent = 'Forecast : '+ forecast
            }
        })  
    })
})