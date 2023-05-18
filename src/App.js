import './App.css';
import Search from './components/search';
import Weather from './components/weather';
import Cities from './components/cities';
import { useEffect, useState } from 'react';

function App() {

  const [cityName, setCityName] = useState("Rome")

  useEffect (() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid={de1c92f8b378d4f9884d41ab4acedc9d&units=metric
  }`)
    .then ((res) =>{
      if(res.status === 200 ){
        return res.json();
      } else {
        throw new Error ("No se pudo consultar");
      }
    })
    .then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="bg_img">
      <header>
        <Search></Search>
        <Cities></Cities>
        <Weather></Weather>
      </header>
    </div>
  );
}

export default App;
