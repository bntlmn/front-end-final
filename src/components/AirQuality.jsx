import React, { useState, useEffect } from 'react';

function httpGetAsync(url, callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      callback(xmlHttp.responseText);
    }
  };
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

const AirQuality = ({ latitude, longitude }) => {
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      const apiKey = 'abde7388-355c-4644-a812-8717a0a2f108';
      const url = `http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${apiKey}`;
      httpGetAsync(url, (response) => {
        const data = JSON.parse(response);
        setAirQualityData(data);
      });
    }
  }, [latitude, longitude]);

  return (
    <div>
      {airQualityData ? (
        <div>
            <h3>Weather and Air Quality Data</h3>
            <p><strong>Temperature:</strong> {airQualityData.data.current.weather.tp}°C</p>
            <p><strong>Humidity:</strong> {airQualityData.data.current.weather.hu}%</p>
            <p><strong>Wind Speed:</strong> {airQualityData.data.current.weather.ws} m/s</p>
            <p><strong>Air Quality Index (AQI):</strong> {airQualityData.data.current.pollution.aqius}</p>
            <p><strong>Main Pollutant:</strong> {airQualityData.data.current.pollution.mainus}</p>
        </div>
      ) : (
        <p>Loading air quality and weather data...</p>
      )}
    </div>
  );
};

export default AirQuality;