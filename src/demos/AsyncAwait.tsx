import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	CircularProgress,
	TextField,
} from "@mui/material";
import { createDeal, sleep } from "../sources";
import RenderCounter from "./RenderCounter";

const AsyncAwait = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [deal, setDeal] = useState<number>(0);
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(false);

	const onClick = async (formData: any) => {
		sleep(3000);
		setLoading(true);
		sleep(3000);
		setSubmitButtonDisabled(false);

		const deal = await createDeal(formData);

		sleep(3000);
		setSubmitButtonDisabled(true);
		sleep(3000);
		setDeal(deal);
		sleep(3000);
		setLoading(false);
	};

	// useEffect(() => {
	// 	sleep(3000);
	// 	setCounter((prev) => prev + 100);
	// 	console.log('==========>submitButtonDisabled', submitButtonDisabled);
	// }, [submitButtonDisabled]);

	return (
		<Box
			width="100%"
			height="100%"
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			gap="20px"
		>
			<button className="click-button" onClick={onClick}>Click</button>
			{loading ? (<CircularProgress color="inherit" size={100} />) : (
				<Box className="deal-text">
					{deal}
				</Box>
			)}
			<span className="deal-text">{deal}</span>
			<TextField 
				type="submit"
				disabled={!submitButtonDisabled}
				className="async-await-button"
			>
				Отправить
			</TextField>
			<RenderCounter name="async await" />
		</Box>
	);
};

export default AsyncAwait;
