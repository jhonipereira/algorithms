import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [grid, setGrid] = useState<number[][]>([
		[0, 3, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
	]);

  const setGridValue = (rowIndex: number, colIndex: number, value: number) => {
    const newGRid = [...grid]
    newGRid[rowIndex][colIndex] = value
    setGrid(newGRid)
  }

  const solvePuzzle = async () => {
    let puzzleAsString = ''

    for(let row = 0; row < grid.length; row++){
      for( let col = 0; col < grid[row].length; col++){
        const value = grid[col][row]
        puzzleAsString += value === 0 ? '.' : value;
      }
    }

    
    const response = await fetch('http://0.0.0.0:9090/http://127.0.0.1:5000', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        sudoku: [puzzleAsString]
      })
    })
    const json = await response.json();
    const solution = json.data[0].solution;
    const newGrid = new Array(9).fill('').map( () => new Array(9).fill(0))

    if(solution){
      for(let row = 0; row < newGrid.length; row++){
        for( let col = 0; col < newGrid[row].length; col++){
          newGrid[col][row] = parseInt( solution.charAt(row * newGrid.length + col) );
        }
      }
    }

    setGrid(newGrid);
  }

	return (
		<div className="App">
			<div className="grid">
				{grid.map((row, rowIndex) => (
					<div key={rowIndex} className="row">
						{row.map((number, colIndex) => (
							<div key={colIndex} className="cell">
                <input type="text" value={number} onChange={(e)=>setGridValue(rowIndex, colIndex, parseInt(e.target.value) || 0)} />
              </div>
						))}
					</div>
				))}
			</div>

      <button onClick={solvePuzzle}>Solve Puzzle</button>
		</div>
	);
}

export default App;
