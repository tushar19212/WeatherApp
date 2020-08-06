let long;
let lat;
let temperatureDescription=document.querySelector('.temperature-description');
let temperatureDegree=document.querySelector('.temperature-degree');
let locationTimezone=document.querySelector('.location-timezone');
let maxTemp=document.querySelector('.max');
let minTemp=document.querySelector('.min');
let Icon=document.querySelector('.icons');
let degreeSection=document.querySelector('.temperature-degree');
const degreeSpan=document.querySelector('.temperature span');
let check=0;
let celsius;
let days = [];
let temps = [];

async function getData(latvalue,longvalue){
    const api = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latvalue}&lon=${longvalue}&days=10&key=00126960a606435b88e10e9fbab75b1b`;
    const response = await fetch(api);
    const data = await response.json(); 
    console.log(data);
    for(let i=0;i<10;i++)
    {
        days.push(data.data[i].valid_date);
        temps.push(data.data[i].temp);
    }
    console.log(days);
    console.log(temps);
}

function myfunc(latvalue,longvalue){
    const api = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latvalue}&lon=${longvalue}&days=1&key=e3ce543b242141de941a30386d48d39a`;
    fetch(api).then(response => {
            return response.json();
    }).then(data =>{
        const {city_name} = data;
        const {temp, min_temp, max_temp}=data.data[0];
        celsius=temp;
        const {description,icon}=data.data[0].weather;
        //Set DOM Elements
        temperatureDegree.textContent = temp;
        minTemp.textContent = min_temp;
        maxTemp.textContent = max_temp;
        temperatureDescription.textContent = description;
        locationTimezone.textContent = city_name;
        // minTemp.textContent = 
        Icon.src="icons/"+icon+".png";
        var x,i;
        x=document.querySelectorAll('.show');
        for (i = 0; i < x.length; i++) {
            x[i].style.opacity = "1";
        }
        document.querySelector('.h1After').style.opacity="0";
        document.querySelector('.heading').classList.add('translateY');
       
    });
}

window.addEventListener('load', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lat=position.coords.latitude;
            long=position.coords.longitude;
            myfunc(lat,long);
            chartIt();
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
                chartIt();
            }
            if(check=0)
            {
                $('#result').append('No Results Found');
            }
        });
    });
});

degreeSection.addEventListener('click', ()=>{
    if(degreeSpan.textContent==="F"){
        degreeSpan.textContent="C";
        degreeSection.textContent=celsius;
    }
    else{
        degreeSpan.textContent="F";
        degreeSection.textContent=((9/5)*celsius + 32).toFixed(1);
    }
});
async function chartIt(){
    await getData(lat,long);
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Temperature of next 10 Days',
                data: temps,
                borderWidth: 2, 
                fill: false,
                borderColor: 'white'
            }]
        },
        scaleFontColor: 'white',
        options: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: 'white'
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return value + "°";
                        },
                        fontColor: 'white',
                        fontSize: 20
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'white'
                    }
                }]
            }
        }
    });
}
