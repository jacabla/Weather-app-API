import "./App.css";
import "./input.css"
import { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import sky from './sky.png'

function App() {
  const [query, setQuery] = useState("Chicago");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const inputRef = useRef(null);
  const [temperature, setTemperature] = useState('');
  const [current, setCurrent] = useState('')
  const [icon, setIcon] = useState([]);
  const [feelsLike, setFeelsLike] = useState('');
  const [wind, setWind] = useState('');
  const [clouds, setClouds] = useState('')
  const [direction, setDirection] = useState('');
  const [updated, setUpdated] = useState('');
  const [localtime, setLocalTime] = useState('');
  const [queryError, setQueryError] = useState(false);
  
  const getWeather = async () => {
    await fetch(`http://api.weatherapi.com/v1/current.json?key=9b86b58e990f402a938234936231805&q=${query}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("No se pudo consultar");
        }
      })
      .then((dataW) => {
        setTemperature(dataW.current.temp_c);
        setCurrent(dataW.current.condition.text);
        setIcon(dataW.current.condition.icon);
        setFeelsLike(dataW.current.feelslike_c);
        setWind(dataW.current.wind_kph);
        setDirection(dataW.current.wind_dir);
        setClouds(dataW.current.cloud);
        setUpdated(dataW.current.last_updated);
        setLocalTime(dataW.location.localtime);
        setQueryError(false);
        console.log(dataW)
      })
      .catch((error) => {
        console.log(error);
        setQueryError(true);
      });
  };

  useEffect(() => {
    getWeather();
  }, [query]);
  
  const getPhoto = async () => {
    if (query.trim() !== "") {
      await fetch(
        `https://api.pexels.com/v1/search?query=${query}&page=1&per_page=40`,
        {
          headers: {
            Authorization:
              "FSsxJpOIHxRnX6RtRGOiVtkn3ZDxJIIqjJeJukp15pshI1heIWUp0xAO",
          },
        }
      )
        .then((resp) => resp.json())
        .then((res) => {
          setLoading(false);
          setData(res.photos);
        });
    }
  };

  useEffect(() => {
    getPhoto();
  }, [query]);

  const handleButtonClick = () => {
    const inputValue = inputRef.current.value;
    const formattedQuery = inputValue
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setQuery(formattedQuery);
  };

  const Image = () => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomImage = data[randomIndex];
      return randomImage.src.large;
    } else {
        return `url(https://th-thumbnailer.cdn-si-edu.com/gH3cK2SYKeRQymc6giwSaiIlbR0=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e5/a4/e5a485ed-dff1-4595-9c2d-2eb20e024408/stbbfq79-1495105583.jpg)`;
    }
  };
  

  return (
  <div className="container">
    <div class="mx-auto lock m-10 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="w-9/10">
      {data.length > 0 && (
        <div className="h-[200px] lg:h-[500px] w-10/12 mx-auto flex justify-center"
          key={data[0].id}
          style={{ backgroundImage: `url(${Image()})`, backgroundSize: "cover", backgroundPosition: "center", display: "flex",
            justifyContent: "center", alignItems: "center" }}>
            <h1 className="title">{query}</h1>
        </div>
      )}
      </div>
      <div class="p-6 flex flex-col">
        <div className="flex flex-row m-auto justify-center mb-10">
          <TextField id="filled-basic" label="Buscar ciudad" variant="filled" defaultValue={query} inputRef={inputRef}/>
          <Button onClick={handleButtonClick} variant="contained" color="secondary">
          Buscar
          </Button>
        </div>
        <div className="w-10/12 mx-auto flex flex-col lg:flex-row justify-left space-between container">
          <h5 className="mb-5 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center lg:text-left">
            Condiciones actuales para {query}.
          </h5>
          <h5 className="ml-auto mr-auto mb-5 lg:text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center lg:text-right">Hora local: {localtime}</h5>
        </div>
        <div className="w-10/12 mx-auto justify-center flex container flex-col lg:flex-row bg-slate-100 rounded-2xl drop-shadow-xl ">
          <div className="text-center lg:w-[40%] flex justify-center items-center">
            <img className="border-lg" src={icon} alt="imagen"/>
            <h1 className="">{current}</h1>
          </div>
          <div className="container flex flex-col lg:flex-row lg:w-[60%] justify-around" style={{backgroundImage: `url(${sky})`}}>
            <div className="bg-slate-50 h-[100px] place-self-center w-[70%] my-5 lg:w-[30%] rounded-lg border-solid flex flex-col justify-center text-center">
              <p>Temperatura</p>
                { temperature ? (
                  <h2>{temperature} &deg;C</h2>
                ) : null}
              <p>Sensacion</p>
                {feelsLike ? (
                  <h2>{feelsLike} &deg;C</h2> 
                ): null}
            </div>
            <div className="bg-slate-50 h-[100px] place-self-center w-[70%] my-5 lg:w-[30%] rounded-lg border-solid flex flex-col justify-center text-center">
              <p>Viento</p>
                {wind ? (
                  <p>{wind} km/h</p> 
                ) : null
                }
                {direction ? (
                  <div>{direction}</div>
                ) : null}
            </div>
            <div className="bg-slate-50 h-[100px] place-self-center w-[70%] my-5  lg:w-[30%] rounded-lg border-solid flex flex-col justify-center text-center">
              <p>Cobertura del <br></br> cielo</p>
                {clouds ? (
                  <h2>{clouds} % </h2> 
                ): "Dato no disponible"}
            </div>
          </div>
        </div>
      </div>
  </div>
  <div className="text-center "><p>ultima actualizacion {updated}</p></div>
</div>
);
}

export default App;
