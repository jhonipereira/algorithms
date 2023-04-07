import { useState, useEffect } from "react";
import "./App.css";

function Grid(props) {
	const size = props.size ?? 3;
	const rows = Array.from({ length: size });

	return (
		<section>
			{rows.map((_, row) => (
				<div key={row} className="wrapper">
					{rows.map((_, col) => (
						<div
							key={col}
							onClick={(e) => props.onClick(e)}
							className="tile"
						></div>
					))}
				</div>
			))}
		</section>
	);
}

function App() {
	const [clickedTiles, setClickedTiles] = useState([]);
	const size = 3;
	const totalTiles = size * size;

	const handleClick = (e) => {
		e.target.classList.add("selected");
		if (!clickedTiles.includes(e.target)) {
			setClickedTiles([...clickedTiles, e.target]);
		}
	};

	useEffect(() => {
		if (clickedTiles.length >= totalTiles) {
			const interval = setInterval(() => {
				const tile = clickedTiles.shift(); //pop for stack / shift for queue
				tile?.classList.remove("selected");
				if (clickedTiles.length === 0) {
					clearInterval(interval);
				}
			}, 300);
		}
	}, [clickedTiles]);

	return (
		<div className="App">
			<Grid size={size} onClick={handleClick}></Grid>
		</div>
	);
}

export default App;
