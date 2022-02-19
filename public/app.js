const citysearch = document.getElementById('citysearch');

const city = document.getElementById('city');

const country = document.getElementById('country');

const temp = document.getElementById('temp');

const pressure = document.getElementById('pressure');

const humidity = document.getElementById('humidity');

const description = document.getElementById('description')

const locationsearch = document.getElementById('locationsearch');

const recentsearch = document.getElementById('recentsearch');

const mastersearch = document.getElementById('mastersearch')

const API_KEY = 'a2a0af2252a1544f7d45cffd6fa9fa49';

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

const DEFAULT_CITY = 'khulna,bd';


window.onload = function(){
	navigator.geolocation.getCurrentPosition(s=>{
		getWeatherData(null, s.coords)
	}, e=> {
		getWeatherData()
	})

	axios.get('/api/History')
		.then(({ data }) => {
			if (data.length > 0) {
				updateHistory(data)
			} else {
				recentsearch.innerHTML = 'There is no History'
				console.log('There is nothing')
			}
		})
		.catch(e => {
			console.log(e)
			alert('Error app 1')
		})


	citysearch.addEventListener('keypress', function(e){
		if(e.key === 'Enter'){
			if(e.target.value){
				getWeatherData(e.target.value, null, weather => {
					e.target.value = ''
					axios.post('/api/History', weather)
						.then(({ data }) => updateHistory(data))
						.catch(e => {
							console.log(e)
							alert('Error occured app 2')
						})
					
				})
				
			} else {
				alert('Please provide a valid city name')
			}
		}
	})
}

function getWeatherData(city = DEFAULT_CITY, coords, cb){

	let url = BASE_URL;

	city === null ?
		url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}` :
		url = `${url}&q=${city}`


	axios.get(url)
		.then(({data}) => {
			console.log(data)

			let weather = {
				name: data.name,
				country: data.sys.country,
				main: data.weather[0].main,
				description: data.weather[0].description,
				temp: data.main.temp,
				pressure: data.main.pressure,
				humidity: data.main.humidity
			}
			setWeather(weather)
			if(cb) cb(weather)
		})
		.catch(e => {
			console.log(e)
		})
}

function setWeather(weather){
	temp.innerHTML = weather.temp
	pressure.innerHTML = weather.pressure
	city.innerHTML = weather.name
	country.innerHTML = weather.country
}

function updateHistory(history) {
	recentsearch.innerHTML = ''
	history = history.reverse()

	history.forEach(h => {
		let tempHistory = mastersearch.cloneNode(true)
		tempHistory.id = ''
		tempHistory.getElementsByClassName('city')[0].innerHTML = h.name
		tempHistory.getElementsByClassName('country')[0].innerHTML = h.country
		tempHistory.getElementsByClassName('temp')[0].innerHTML = h.temp
		tempHistory.getElementsByClassName('pressure')[0].innerHTML = h.pressure
		tempHistory.getElementsByClassName('humidity')[0].innerHTML = h.humidity
		tempHistory.getElementsByClassName('description')[0].innerHTML = h.description

		recentsearch.appendChild(tempHistory)
		
	})

}