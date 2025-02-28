import WeatherApp from "./components/WeatherApp"; // Custom WeatherApp component to display weather data

export default function Home() {
  return (
    <div>
      {/* Rendering WeatherApp component which handles weather display and logic */}
      <WeatherApp />
    </div>
  );
}