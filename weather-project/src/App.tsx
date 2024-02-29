import './App.css'
import Home from './Home'


function App() {

  //  //again react componant to reload -> (because of usestate)
  // // component(currently) -> <Home/> 
  // const [component, setComponenet,] = useState(<Home />)


  // function setMenu(menu: any) {
  //   console.log("In methord");

  //   switch (menu) {
  //     case 'home': {
  //       setComponenet(<Home />);
  //       console.log("home method");
  //       break;
  //     }
  //     case 'result': {
  //       setComponenet(<result />);
  //       console.log("case intro");
  //       break;
  //     }
  //   }
  // }

  return (
   <Home/>
  )
}

export default App