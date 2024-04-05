import './result.css';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';
import Details from './components/details';
import Video from './assets/video.mp4'
import { Link } from "react-router-dom";



function result() {
    const [weatherData, setWeatherData] = useState(null);
    const [weatherForeCastData, setWeatherForeCastData] = useState(null);
    const apiKey = "5a3b5d0257934ff585884032242802";
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [searchVal, setSearchVal] = useState("Jaffna");
    // const { handleSubmit, register, formState: { errors } } = useForm();

    // const submit = (data) => {
    //     console.log(data);
    //     setSearchVal(data.city);
    // }

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
                <div className='col-lg-12'>
                    <div className="row">
                        <div className="col-4">
                        <Link to="/">
                        <button type="button" class="btn btn-outline-info bu m-3"><i class="bi bi-arrow-90deg-left"></i></button>
                        </Link>
                        </div>
                        <div className="col-4"></div>
                        <div className="col-4"></div>
                        
                    </div>
                    <div className="row m-0 bg-black ">
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
            </div>

        </div>
    )
}
export default result
