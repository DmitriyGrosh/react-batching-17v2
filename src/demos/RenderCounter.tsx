import React, { useRef, FC } from 'react';

interface IRenderCounter {
	name: string;
}

const RenderCounter: FC<IRenderCounter> = ({ name }) => {
	const counter = useRef(0);
	counter.current += 1;
	console.log(`==========>render ${name}`, counter.current)
	return null;
};

export default RenderCounter;
