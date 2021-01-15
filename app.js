window.addEventListener('load', () => {
  let long;
  let lat;
  let TemperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let TemperatureDescription = document.querySelector('.temperature-Description');
  let HumidityDescription = document.querySelector('.humidity-description');
  let PressureDescription = document.querySelector('.pressure-description');
  let tempIcon = document.querySelector('.temp-icon');
  let Latitude = document.querySelector('.lat-description');
  let longitude = document.querySelector('.long-description');
  let TemperatureSection = document.querySelector('.degree-section');
  let TemperatureSpan = document.querySelector('.degree-section span');


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      //const key = "a7f8cc2ef895b542d5eb1916a6527a7f";
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a7f8cc2ef895b542d5eb1916a6527a7f`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { name } = data;
          const { temp } = data.main;
          const { description, id } = data.weather[0];
          const { humidity, pressure } = data.main;
          const { lat, lon } = data.coord;

          //formula celcius
          let celcius = (temp - 273);

          //Temperature chenge celsius from farenheit

          TemperatureSection.addEventListener('click', () => {
            if (TemperatureSpan.textContent === "F") {
              TemperatureSpan.textContent = "C"

              TemperatureDegree.textContent = Math.floor(celcius);

            }
            else {
              TemperatureSpan.textContent = "F"
              TemperatureDegree.textContent = temp;
            }
          })

          //Temperature chenge celsius from farenheit ends


          //Set DOM elements from the api

          locationTimezone.textContent = name;
          TemperatureDegree.textContent = temp;
          TemperatureDescription.textContent = description;
          HumidityDescription.textContent = humidity;
          PressureDescription.textContent = pressure;
          longitude.textContent = lon;
          Latitude.textContent = lat;

          if (id<250){
            tempIcon.src = './icons/storm.svg' ;
          }
          else if (id < 350){
            tempIcon.src = '.icons/cloudy.svg' ;
          }
          else if (id<550){
            tempIcon.src = './icons/rain.svg';
          }
          else if (id<650){
            tempIcon.src = './icons/snowflakes.svg' ;
          }
          else if (id<800){
            tempIcon.src = './icons/atmosphere.svg' ;
          }
          else if (id===800){
            tempIcon.src = './icons/sun.svg' ;
          }
          else if(id>800){
            tempIcon.src = './icons/clouds-computing.svg' ;
          }

        });
    });


  }

});