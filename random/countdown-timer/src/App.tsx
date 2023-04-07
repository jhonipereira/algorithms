import { useEffect, useState } from 'react'
import './App.css'
import { useRef } from 'react';

const useCountdown = (onDone, initialTimeInSecond) => {
const [timeLeft, setTimeLeft] = useState(initialTimeInSecond);
const timeLeftRef = useRef(initialTimeInSecond)
const intervalRef = useRef(null)

  const initialize = () => {
    intervalRef.current = setInterval(()=> {
      const newPrevTime = timeLeftRef.current - 1
      setTimeLeft(newPrevTime)
      if(newPrevTime <= 0){
        onDone();
        // clearInterval(newPrevTime)
        clearInterval(intervalRef.current)
        setTimeLeft(0);
        timeLeftRef.current = 0;
      }else{
        setTimeLeft(newPrevTime);
        timeLeftRef.current -= 1;
      }
      
      },1000)
  }

  useEffect(()=>{
    initialize()

    return () => {
      clearInterval(intervalRef.current)
    }
  },[])


  return { 
    secondsLeft: timeLeftRef.current,
    reset: () => {
      timeLeftRef.current = initialTimeInSecond
      initialize();
    }
  }


}

function App() {
  const {secondsLeft} = useCountdown(()=>{
    console.log('done');
  }, 5)

  return (
    <div className="App">
      {secondsLeft}

      <button onClick={reset}>reset</button>
    </div>
  )
}

export default App
