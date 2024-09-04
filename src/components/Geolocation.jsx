import React, { useState, useEffect } from 'react';
import AirQuality from './AirQuality';

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

const Geolocation = () => {
  const [ip, setIp] = useState('');
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    // Fetch the user's IP address using ipify API
    const ipUrl = 'https://api.ipify.org?format=json';
    httpGetAsync(ipUrl, (response) => {
      const data = JSON.parse(response);
      setIp(data.ip);
    });
  }, []);

  const handleInputChange = (e) => {
    setIp(e.target.value);
  };

  const fetchGeoData = () => {
    if (ip) {
      const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=d21ed7f63dca46ca932320b7e89da06e&ip_address=${ip}`;
      httpGetAsync(url, (response) => {
        const data = JSON.parse(response);
        setGeoData(data);
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter IP address"
        value={ip}
        onChange={handleInputChange}
      />
      <button onClick={fetchGeoData}>Get Location Information</button>

      {geoData && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h3>Geolocation Data:</h3>
            <p><strong>IP Address:</strong> {geoData.ip_address}</p>
            <p><strong>Country:</strong> {geoData.country}</p>
            <p><strong>Region:</strong> {geoData.region}</p>
            <p><strong>City:</strong> {geoData.city}</p>
            <p><strong>Latitude:</strong> {geoData.latitude}</p>
            <p><strong>Longitude:</strong> {geoData.longitude}</p>
          </div>

          <div style={{ marginLeft: '10px' }}>
            <AirQuality latitude={geoData.latitude} longitude={geoData.longitude} />
          </div>
        </div>
      )}

      <p><br/>This application is brought to you by the use of the following API providers
      <br/><strong><i>AbstractApi</i></strong>
      <br/><strong><i>IQAir</i></strong>
      <br/><strong><i>IPify</i></strong></p>
    </div>
  );
};

export default Geolocation;