window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription=document.querySelector('.temperature-description');
    let temperatureDegree=document.querySelector('.temperature-degree');
    let locationTimezone=document.querySelector('.location-timezone');
    let Icon=document.querySelector('.icons');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const api = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&days=1&key=e3ce543b242141de941a30386d48d39a`;
            fetch(api).then(response => {
                    return response.json();
            }).then(data =>{
                // console.log(data);
                const {city_name} = data;
                const {temp}=data.data[0];
                const {description,icon}=data.data[0].weather;
                //Set DOM Elements
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = city_name;
                Icon.src="icons/"+icon+".png";
                var x,i;
                x=document.querySelectorAll('.show');
                for (i = 0; i < x.length; i++) {
                    x[i].style.opacity = "1";
                }
                document.querySelector('.h1After').style.opacity="0";
            });

        });
    }
    else{
        alert("Your Device isn't Supported :(");
    }
});