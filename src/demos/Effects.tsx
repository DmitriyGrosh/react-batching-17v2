import React, { useState, useEffect, useLayoutEffect } from 'react';
import { sleep } from "../sources";

const Effects = () => {
	const [width, setWidth] = useState<number>(2);

	useEffect(() => {
	  sleep(3000);
	  if (width === 1) {
	    setWidth(4);
	  }

	  if (width === 4) {
	    setWidth(10);
	  }
	}, [width]);

	// useLayoutEffect(() => {
	// 	sleep(3000);
	// 	if (width === 0) {
	// 		setWidth(1);
	// 	}
	// 	if (width === 1) {
	// 		setWidth(10);
	// 	}
	// }, [width]);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<button onClick={() => setWidth(1)}>Click</button>
			<div style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				<div style={{
					width: `${width * 10}%`,
					height: `${width * 10}%`,
					background: `rgba(206, 72, 184, 1)`,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
					<span>width {width}</span>
				</div>
			</div>
		</div>
	);
};

export default Effects;
