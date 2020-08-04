let long;
let lat;
let temperatureDescription=document.querySelector('.temperature-description');
let temperatureDegree=document.querySelector('.temperature-degree');
let locationTimezone=document.querySelector('.location-timezone');
let Icon=document.querySelector('.icons');
let degreeSection=document.querySelector('.temperature-degree');
const degreeSpan=document.querySelector('.temperature span');
let check=0;

function myfunc(latvalue,longvalue){
    const api = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latvalue}&lon=${longvalue}&days=1&key=e3ce543b242141de941a30386d48d39a`;
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
        let fahrenheit=(9/5)*temp + 32;
        //Change Temperature
        degreeSection.addEventListener('click', ()=>{
            if(degreeSpan.textContent==="F"){
                degreeSpan.textContent="C";
                degreeSection.textContent=temp;
            }
            else{
                degreeSpan.textContent="F";
                degreeSection.textContent=fahrenheit;
            }
        });
    });
}

window.addEventListener('load', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            myfunc(position.coords.latitude,position.coords.longitude);
        });
    }
    else{
        alert("Your Device isn't Supported :(");
    }
});

document.querySelector('#search').addEventListener('click',()=>{
    $('#result').html('');
    var searchField=$('#textbox').val();
    var expression= new RegExp(searchField,"i");
    $.getJSON('cities_20000.json',function(data){
        $.each(data,function(key,value){
            if(value.city_name.search(expression) != -1 && check===0){
                check=1;
                myfunc(value.lat,value.lon);
            }
         
        });
        if(check===0)
            {
                $('#result').append('No Results Found');
            }
    });
});
