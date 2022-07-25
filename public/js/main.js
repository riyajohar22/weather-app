// const async = require("hbs/lib/async");

const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const description = document.getElementById('description');
const feels_like = document.getElementById('feels_like');
const temp_min = document.getElementById('temp_min');
const temp_max= document.getElementById('temp_max');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');
const speed = document.getElementById('speed');
const main = document.getElementById('main');

const datahide = document.querySelector('.middle_layer');
const datahide1 = document.querySelector('.bottom_layer');


const getInfo = async(event)=>{
    event.preventDefault();
    // alert('hii');
    let cityVal = cityName.value;
    if(cityVal==""){
        city_name.innerText = `Plz write the name before you search`;
        datahide.classList.add('data_hide');
        datahide1.classList.add('data_hide');
    }
    else{
        try{ 
            
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=a42f0cc249bc3f9edd8e9d29b28da74a`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
         
            // console.log(data);
            // console.log(arrData);
            // console.log(arrData[0].name);
            
                city_name.innerText=`${arrData[0].name},${arrData[0].sys.country}`;
                temp_real_val.innerText = arrData[0].main.temp;
                // temp_status.innerText = arrData[0].weather[0].main;
                description.innerText = `Desctiption : ${arrData[0].weather[0].description}`;
                feels_like.innerText = `feels_like : ${arrData[0].main.feels_like}`
                temp_min.innerText = `Minimum Temperature : ${arrData[0].main.temp_min}`
                temp_max.innerText = `Maximum Temperature : ${arrData[0].main.temp_max}`
                pressure.innerText = `Pressure : ${arrData[0].main.pressure}`
                humidity.innerText = `Humidity : ${arrData[0].main.humidity}`
                speed.innerText = `Wind Speed : ${arrData[0].wind.speed} ` 
                main.innerText = `Main : ${arrData[0].weather[0].main}`
                

                const tempMood = arrData[0].weather[0].main;
                // console.log(tempMood);

                //condition to check sunny or cloudy
                if(tempMood=="Clear"){
                    temp_status.innerHTML=
                       "<i class='fas fa-sun' style='color:#eccc68;'</i>";
                }else if(tempMood=="Clouds"){
                    temp_status.innerHTML=
                    "<i class='fas fa-cloud' style='color:#f1f2f6;'</i>";
                }else if(tempMood=="Rain"){
                    temp_status.innerHTML =
                    "<i class='fas fa-cloud-rain' style='color:#f1f2f6;'</i>";
                }else{
                    temp_status.innerHTML=
                    "<i class='fas fa-sun' style='color:#eccc68;'</i>";
                }

                datahide.classList.remove('data_hide');
                datahide1.classList.remove('data_hide');
            
        }
        catch{
            city_name.innerText = `Plz enter the city name properly`;
            datahide.classList.add('data_hide');
            datahide1.classList.add('data_hide');
        }


    }
}

submitBtn.addEventListener('click',getInfo);