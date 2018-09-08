const url = `https://api.openweathermap.org/data/2.5/weather?id=6697993&units=metric&appid=a6825f71c27c7eeae7da4b299f840fc4`
const city = document.getElementById(`location`);
const temperature = document.getElementById(`temp`);
const details = document.getElementById(`details`);
const image = document.getElementById("icon");
fetch(url).then(result => result.json()).then(json => {
    city.textContent = `${json.name}, ${json.sys.country}`;
    temperature.innerHTML = `${json.main.temp}&deg;C - ${json.weather[0].main}`;
    details.textContent = json.weather[0].description;
    icon.src = `https://openweathermap.org/img/w/${json.weather[0].icon}.png`;
})
// http://openweathermap.org/img/w/10d.png