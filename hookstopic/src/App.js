import logo from './logo.svg';
import './App.css';
import { useGlobaleContext } from './context';
import Home from './Home';
import About from './About';

function App() {
  const {name,Age} = useGlobaleContext()
  return (
    <>
      <h1>{name}</h1>
       {/* <h1>{lname}</h1> */}
      <h1>{Age}</h1> 

      <Home />
      <About />

    </>
  );
}

export default App;
