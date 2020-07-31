var input = document.querySelector('.input_text');
var view_weather= document.querySelector('.view');
var detect_weather= document.querySelector('.detect');
var city = document.querySelector('.city');
var icon=document.querySelector('.icon'); 
var description = document.querySelector('.description');
var temperature = document.querySelector('.temperature');
var feels_like = document.querySelector('.feels-like');
var humidity = document.querySelector('[data-humidity]');
var pressure = document.querySelector('[data-pressure]');
var windspeed = document.querySelector('[data-windSpeed]');
var API_KEY='b899e9396f3bdd8578546bc4c900e8ec';
var background=document.querySelector('.background')

view_weather.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid='+API_KEY)
.then(response => response.json())
.then(data => {

  getAndUpdateData(data);

})
.catch(err => alert("Please enter a valid city name"));
})


detect_weather.addEventListener('click',function(){
  if('geolocation'in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,errorView);
  }
})

function errorView(error) {
    if (error.code == error.PERMISSION_DENIED) {
      alert("Access to your location has been denied");
  
    }
}
function getWeather(latitude,longitude){
fetch("https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+API_KEY)
.then(response => response.json()).then(data => {

  getAndUpdateData(data);
} 
  )}

  function setPosition(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;
    getWeather(latitude,longitude);
  }
  function getAndUpdateData(data){
    var cityValue = data['name']+', '+data['sys']['country'];
    var temperatureValue = data['main']['temp'];
    var descriptionValue = data['weather'][0]['description'];
    var humidityValue= data['main']['humidity'];
    var feeslikeValue=data['main']['feels_like'];
    var windspeedValue=data['wind']['speed'];
    var pressureValue= data['main']['pressure'];
    var iconValue="<img src='http://openweathermap.org/img/wn/" +data['weather'][0]['icon'] +"@4x.png'>";
   
  
    input.value ="";
    city.innerHTML = cityValue;
    temperature.innerHTML =   Math.round( (temperatureValue-273) * 10) / 10 +" °C"; 	
    description.innerHTML = descriptionValue;
    humidity.innerHTML = humidityValue+" %";
    feels_like.innerHTML = "Feels like "+ Math.round( (feeslikeValue-273) * 10) / 10 +" °C"; 	
    windspeed.innerHTML = windspeedValue+" metres/sec";
    pressure.innerHTML = pressureValue+" hPa";
    icon.innerHTML = iconValue;

  }
  

  