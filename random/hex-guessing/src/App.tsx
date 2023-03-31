import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const getRandomColor = () => {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

  const color = new Array(6).fill('').
    map( () => digits[Math.floor(Math.random() * digits.length) ] )
  .join('')

  return `#${color}`
}

enum Result{
  Correct, Wrong
}

function App() {

  const [color, setColor] = useState<string>("")
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<Result | undefined>(undefined)
  

  const generateColors = () => {
    const correctColor = getRandomColor()
    setColor(correctColor)
    setAnswers([correctColor, getRandomColor(), getRandomColor()].sort(() => .5 - Math.random()))
  }

  useEffect( () => {
    generateColors()
  }, [])

  const handleClick = (answer:string) => {
    if(answer === color){
      setResult(Result.Correct)
      generateColors()
    }
    else{
      setResult(Result.Wrong)
    }
  }

  return (
    <div className="App">
      <div>
        <div className="guess-me" style={{ background: color}}></div>
      {answers.map( (answer) => (
        <button onClick={()=>handleClick(answer)} key={answer}>{answer}</button>
        ) 
        )}

        { result === Result.Wrong && <div className='wrong'>Wrong!</div>}
        { result === Result.Correct && <div className='correct'>Correct!</div>}
      </div>
    </div>
  )
}

export default App
