import './Home.css';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';
import Details from './components/details';
import Video from './assets/video.mp4'

function Home() {
    const [weatherData, setWeatherData] = useState(null);
    const [weatherForeCastData, setWeatherForeCastData] = useState(null);
    const apiKey = "5a3b5d0257934ff585884032242802";
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [searchVal, setSearchVal] = useState("Panadura");
    const { handleSubmit, register, formState: { errors } } = useForm();

    const submit = (data) => {
        console.log(data);
    }

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchVal}`);
                const data = await response.json();
                console.log(data)
                //         error: {code: 1006, message: 'No matching location found.'

                if (data.error && data.error.code == 1006) {
                    console.log("No matching location found.");

                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No matching location found.",
                        footer: 'Enter Valid Location'
                    });
                    document.getElementById('city').value = "";
                } else {
                    setWeatherData(data);
                }



            } catch (error) {

                console.error("Error fetching weather data:", error);
            }

            try {
                const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchVal}`);
                const data = await response.json();
                console.log(data)
                //         error: {code: 1006, message: 'No matching location found.'
                if (!(data.error && data.error.code == 1006)) {
                    setWeatherForeCastData(data);
                }




            } catch (error) {

                console.error("Error fetching weather data:", error);
            }
        };

        fetchData();
    }, [apiKey, searchVal]);


    getLocation();
    function getLocation() {
        if (isFirstTime) {
            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }

    }

    function showPosition(position) {
        console.log(position.coords.latitude + "," + position.coords.longitude);
        setSearchVal(position.coords.latitude + "," + position.coords.longitude);
        setIsFirstTime(false);
    }

    return (
        <div className='container-fluid'>
            <div className="bgVideo">
                <video src={Video} autoPlay muted loop></video>
            </div>
            <div className='row'>
                <div className='col-lg-9'>
                    <div className="col-md-6 p-lg-5 mx-auto my-5 content" >
                        <h1 className="title display-4 fw-bold text-light $enable-shadows">Weather App</h1>
                        <h3 className="title2 fw-normal text-warning mb-3 ms-2">Enter Your City Name ?</h3>

                        <div className="container">
                            <div className="row">
                                <div className="input-group has-validation col-lg-12 ">
                                    <span className="input-group-text"><i className="bi bi-globe-americas"></i></span>
                                    <input type="text" {...register("city", { required: true })} className="form-control" id="city" placeholder="City/Town/Village" required>
                                    </input>
                                    {errors.city && <div className='col-lg-12 text-danger'> <span> City Not Provided &#x2191; 	&#129300;</span> </div>}
                                </div>
                                <div className='col-lg-6'>
                                </div>
                                <div className='col-lg-6 mt-2'>
                                    <button onClick={handleSubmit(submit)} className=" title3 w-100 btn btn-md btn-primary" type="submit">Find Weather</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='col-lg-10 outer-container'>
                {weatherData && (
                    <Details
                        cityName={weatherData.location.name}
                        countryName={weatherData.location.country}
                        region={weatherData.location.region}
                        temeperatureC={weatherData.current.temp_c}
                        temeperatureF={weatherData.current.temp_f}
                        weatherCondition={weatherData.current.condition.text}
                        windSpeedKph={weatherData.current.wind_kph}
                        windSpeedMph={weatherData.current.wind_mph}
                        humidity={weatherData.current.humidity}
                        image={weatherData.current.condition.icon}
                        time={weatherData.location.localtime}
                    />
                )}
            </div>

            <div className="row m-0 bg-transparent ">
                <div><p></p></div>
                {weatherForeCastData && weatherForeCastData.forecast.forecastday[0].hour.map((todo) => (
                    <div className='col-lg-3 '>
                        <Details
                            cityName={todo.time}
                            countryName={weatherData.location.name}
                            region={weatherData.location.region}
                            temeperatureC={todo.temp_c}
                            temeperatureF={todo.temp_f}
                            weatherCondition={todo.condition.text}
                            windSpeedKph={todo.wind_kph}
                            windSpeedMph={todo.wind_mph}
                            humidity={todo.humidity}
                            image={todo.condition.icon} />
                    </div>
                ))}
            </div>
        </div>
    )
};
export default Home;