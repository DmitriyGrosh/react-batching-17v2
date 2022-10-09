import React, { useState } from "react";

const Simple = () => {
	const [count, setCount] = useState<number>(0);
	const [flag, setFlag] = useState<boolean>(false);

	const fetchSomething = async () => {
		return await new Promise((resolve) => setTimeout(resolve, 1000));
	};

	const handleClick = () => {
		setCount((c) => c + 1);
		setFlag((f) => !f);
	}

	const renderClick = () => {
		fetchSomething().then(() => {
			setCount((c) => c + 1);
			setFlag((f) => !f);
		});
	}

	console.log('==========>render');
	return (
		<div>
			<button onClick={handleClick}>Next</button>
			<br />
			<br />
			<button onClick={renderClick}>Render Twice</button>
			<h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
		</div>
	);
};

export default Simple;
