import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'



/*function Home(){
  return(
    <h2>Welcome to Home Page</h2>
  )
}
function About(){
  return(
    <h2>Welcom to About Page</h2>
  )
}  

function Contact(){
  return(
    <h3>Email : garviidabas5@gmail.com</h3>
  )
}
  function App() {
  const [count, setCount] = useState(0)
    return (
      <BrowserRouter>
      <nav>
        <Link to ="/">Home</Link>
        <Link to ="/About">About</Link>
        <Link to ="/Contact">Contact</Link>
      </nav>
      <Routes>
        <Route path= "/" element = {<Home/>}/>
        <Route path= "/About" element = {<About/>}/>
        <Route path= "/Contact" element = {<Contact/>}/>
        </Routes>
      </BrowserRouter>
  )
  }*/
 /*
 function App(){
  const[counter, setCounter] = useState(0);
  /*function Increment()
  {
    alert("You have clicked on button")

  }*/
 
 /*   function Increment(){
  setCounter(counter + 1)
 }
 function Decrement(){
  if(counter==0) countinue
  setCounter(counter - 1)
 }
  return(
    <>
    <button onClick={Increment}>Increment</button>
    <button onClick={Decrement}>Decrement</button>
    <h3>Counter value is : {counter}</h3>
    </>
  )
 }*/
/*
function App(){
  const[count, setCount] = useState(0);
  useEffect(()=>{
    console.log("Rendering Component")
    setTimeout(() =>{
      setCount((count) => count + 1);
    }, 1000)
  }, [count]);
  return(
    <>
    <h3>I have rendered {count} times</h3>;
    </>
  )
}
*/
function App(){
  return(
    <></>
  )
}
export default App
/* 
Hooks are used, basically for State, Life Cycle of a Componenet -> Initialze, Mount, Update, 
Unmount - when u refresh the page all components get unmount.
- Use State 
- Use Effect
- Use Ref
- Custom hook 

use Effect run on every render when nothing is passed, runs only on first render when empty array is passed,
when we pass a dependency everytime counter changes then renderMatches.*/