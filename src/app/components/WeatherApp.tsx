// The "use client" directive indicates that this component is client-side only in Next.js
"use client";

import { useState, useEffect } from 'react'; // Import React state and effect hooks
import { Card, CardContent } from '@/components/ui/card'; //import ui cart compoment for styling 
import { Input } from '@/components/ui/input'; // import ui input for search box styling
import { Button } from '@/components/ui/button'; //import ui button for submit search
import { Search } from 'lucide-react'; // Import search icon component

export default function WeatherApp() {
  //state for search input box when we enter any city name capture city name and pass in API for getting weather info of that city
  const [search, setSearch] = useState('');
  //state to store weather info getting from api
  const [weatherData, setWeatherData] = useState(null);
  //state for set city name for capture weathre information
  const [city, setCity] = useState('Karnal');
  //state for which Tab shoule be active today OR 7 Days
  const [activeTab, setActiveTab] = useState('today');
 
  //create list of city arrays for wather information
  const cities = ['Karnal','New Delhi', 'Mumbai', 'Chennai', 'Kolkata'];

  // Fetch weather data whenever city changes
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  //below function is used for fetch weather data from API
  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ad6b411327d14e358d374232252802&q=${cityName}&days=7`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
 
  //below function fetch city from input when user hit search button onclick
  const handleSearch = () => {
    if (search) {
      setCity(search); //set city name
    }
  };
  
  //function for get current time
  const getCurrentHour = () => {
    return new Date().getHours();
  };
 
  //function for display weather icon like rainy, sunny etc.
  const getWeatherIcon = (condition) => {
    if (condition.includes('rain')) return '🌧️';
    if (condition.includes('sunny')) return '☀️';
    if (condition.includes('cloud')) return '☁️';
    return '🌡️';
  };

  return (
    <div className="flex h-screen bg-gray-100"> {/* flex layout with gray backgound color full screen  */}
      <div className="w-1/4 bg-white p-4 shadow-lg"> {/* 25% width white background large shadow padding*/}
        <div className="mb-4"> {/* margin bottom */}
          <Input
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> {/* search inputr box */}
          <Button className="mt-2 w-full flex items-center justify-center" onClick={handleSearch}>
            <Search className="mr-2" /> Search
          </Button> {/* search button with onclick function*/}
        </div>
        {/* show city list and show  weather city wise with onclick*/}
        {cities.map((cityName, index) => (
          <Card key={index} className={`mb-2 ${city === cityName ? 'bg-blue-100' : ''}`} onClick={() => setCity(cityName)}>
            <CardContent className="flex justify-between items-center p-4"> {/*  flex layout text justify align center padding */}
              <div>
                <h3 className="font-bold">{cityName}</h3> {/* show city name*/}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex-1 p-6"> {/* flex-1: Flex with other data, p-6: Padding */}
        {weatherData && (
          <>
            <Card className="bg-blue-500 text-white mb-6 p-6"> {/* blue background white text margin bottom */}
              <CardContent> {/* card type layout*/}
                <h2 className="text-2xl font-bold">{weatherData.location.name}</h2> {/* display weather location name like city name Delhi etc*/}
                <p>Humidity: {weatherData.current.humidity}</p>{/* display weather humidity*/}
                <p className="text-4xl">{getWeatherIcon(weatherData.current.condition.text.toLowerCase())} {weatherData.current.temp_c}°C</p> {/* display weather temperate */}
              </CardContent>
            </Card>
             {/* below div is display today and 7 days weather */}
            <div className="mb-4"> {/*  margin bottom*/}
              <Button className={`mr-2 ${activeTab === 'today' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} onClick={() => setActiveTab('today')}>Today</Button>   {/* this button is show today's weather info when click on today */}
              <Button className={`${activeTab === 'next7days' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} onClick={() => setActiveTab('next7days')}>Next 7 Days</Button> {/* this button is show next7days weather info when click on next7days */}
            </div>
            {/* show today weather conent */}
            {activeTab === 'today' && (
              <div className="grid grid-cols-4 gap-4"> {/* grid layout 4 grid column to display weather info gap-4 is gap between every grid below is loop to show weather of every hour of today*/}
                {weatherData.forecast.forecastday[0]?.hour.filter((hour) => {
                  const hourTime = parseInt(hour.time.split(' ')[1].split(':')[0]);
                  return hourTime >= getCurrentHour() && hourTime <= 22;
                }).map((hour, index) => (
                  <Card key={index} className="text-center p-4"> {/* text align center padding*/}
                    <CardContent>
                      <p>{getWeatherIcon(hour.condition.text.toLowerCase())} {hour.temp_c}°C</p>
                      <p>{hour.time.split(' ')[1]}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
               {/* show next 7 days weather conent */}
            {activeTab === 'next7days' && (
              <div className="grid grid-cols-4 gap-4"> {/* grid layout 4 grid column to display weather info gap-4 is gap between every grid below is code for show next 7 dates weather in grid layout*/}
                {weatherData.forecast.forecastday.map((day, index) => (
                  <Card key={index} className="text-center p-4"> {/* text-center padding */}
                    <CardContent>
                      <p>{getWeatherIcon(day.day.condition.text.toLowerCase())} {day.day.avgtemp_c}°C</p>
                      <p>{day.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
