import { useState } from 'react'
import './App.css'

function App() {
  const [cells, setCells] = useState<String[]>(['a', 'b', 'c'])

  const changeCellContent = (newCellValue: string, indexToUpdate:number) => {
    setCells( (prevCells) => 
      prevCells.map( (cell, i) => i===indexToUpdate ? newCellValue : cell )
    )
  }

  const handlePlusClicked = (index:number) => {
    setCells(prevCells => [
      ...prevCells.slice(0, index+1),
      '_',
      ...prevCells.slice(index+1)
    ])
  }

  const combinedString = cells.join(' ')

  return (
    <div className="App">
      <section className='cells'>
      {cells.map( (cell,index) => (
        <div key={index} className='cell'>
          <input onChange={ (e) => changeCellContent(e.currentTarget.value,index) } value={cell}></input>
          
          { index < (cells.length-1) ? <span className='plus' onClick={()=>handlePlusClicked(index)}> </span> : '' }
        </div>
      ))}
      </section>
      <div>
        {combinedString}
      </div>
    </div>

  )
}

export default App
