import "./App.css";
import "./input.css"
import { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import sky from './sky.png'

function App() {
  // const [cityName, setCityName] = useState("Rome")

  // useEffect (() => {
  //   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid={de1c92f8b378d4f9884d41ab4acedc9d&units=metric
  // }`)
  //   .then ((res) =>{
  //     if(res.status === 200 ){
  //       return res.json();
  //     } else {
  //       throw new Error ("No se pudo consultar");
  //     }
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  const [query, setQuery] = useState("Chicago");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const inputRef = useRef(null);

  const getPhoto = async () => {
    if (query.trim() !== "") {
      await fetch(
        `https://api.pexels.com/v1/search?query=${query}&page=1&per_page=1`,
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

  return (
  <div className="">
    <div class="container mx-auto lock m-10 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="w-9/10">
      {data.length > 0 && (
        <div className="h-[500px] w-10/12 mx-auto flex justify-center"
          key={data[0].id}
          style={{
            backgroundImage: `url(${data[0].src.large})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <h1 className="title">{query}</h1>
        </div>
      )}
    </div>

    <div class="p-6 flex flex-col">


      <div className="container flex flex-row m-auto justify-center mb-10">
        <TextField id="filled-basic" label="Buscar ciudad" variant="filled" defaultValue={query} inputRef={inputRef}/>
        <Button onClick={handleButtonClick} variant="contained" color="secondary">
        Buscar
        </Button>
     </div>
     <div className="w-10/12 mx-auto justify-left flex container">
     <h5 class="mb-5 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-left">
      Condiciones actuales para {query}
    </h5>
     </div>

      <div className="w-10/12 mx-auto justify-center flex container flex-col lg:flex-row bg-slate-100 rounded-2xl drop-shadow-xl ">
      <div className="text-center container lg:w-[50%] flex justify-center items-center">
      <img className="" src="https://openweathermap.org/img/wn/01d@2x.png" alt="imagen"/>
      <h1 className="">Despejado</h1>
</div>

        <div className="container flex flex-col lg:flex-row lg:w-[50%] justify-around" style={{
            backgroundImage: `url(${sky})`}}>
              <div className="bg-slate-50 h-[100px] place-self-center w-[70%] my-5 lg:w-[20%] rounded-lg border-solid flex flex-col justify-center text-center">
                  <p>Humedad</p>
                  <h2>12%</h2>
              </div>
              <div className="bg-slate-50 h-[100px] place-self-center w-[70%] my-5 lg:w-[20%] rounded-lg border-solid flex flex-col justify-center text-center">
                  <p>Viento</p>
                  <h2>12 km/h</h2>
              </div>
              <div className="bg-slate-50 h-[100px] place-self-center w-[70%] my-5  lg:w-[20%] rounded-lg border-solid flex flex-col justify-center text-center">
                  <p>Sensacion</p>
                  <h2>20 C</h2>
              </div>
        </div>

      </div>
  </div>
</div>
    </div>
  );
}

export default App;
