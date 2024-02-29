import App from './App';
import './Home.css'
import resul from './resul';
import { useState } from 'react';

function home() {
    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     const firstNameInput = document.getElementById("city") as HTMLInputElement | null
    //     //  optional-chaining operator
    //     const value = firstNameInput?.value; // no more errors.
    //     console.log(value);
    //     console.log(event.currentTarget);
    // };

    // const [component, setComponenet,] = useState(<App />)

    // function setMenu(menu: any) {
    //     console.log("In methord");

    //     switch (menu) {
    //         case 'home': {
    //             setComponenet(<App />);
    //             console.log("home method");
    //             break;
    //         }
    //         case 'resul': {
    //             setComponenet(<resul />);
    //             console.log("case intro");
    //             break;
    //         }
    //     }
    // }

    return (
        <div className='container'>
            <div className='row card1'>
                <div className="name-content col-lg-6 col-md-4 col-sm-2">
                    <div className="card">
                        {/* <img src="" className="card-img-top" alt="..."/> */}
                        <div className="card-body">
                            <h5 className="card-title">Weather App</h5>
                            <div className="input-group flex-nowrap">
                                <input type="text" id='city' className="form-control" placeholder="Enter City" aria-label="Username" aria-describedby="addon-wrapping" />
                            </div>
                            <p className="card-text">Enter City you want </p>
                            <button 
                            // onClick={() => {
                            //     console.log("resul");
                            //     setMenu('resul')
                            // }}
                            >Go</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* {component} */}
        </div>
    )
}
export default home