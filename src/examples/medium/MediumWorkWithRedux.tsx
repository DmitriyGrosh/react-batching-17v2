import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";

import { getInitialComments } from "../../store/comments";

const MediumWorkWithRedux = () => {
	const { comments, isLoading } = useAppSelector((state) => state.comments)
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getInitialComments());
	}, []);

	console.log('==========>render');
	return (
		<>
			{isLoading ? (
				<span>Loading...</span>
			) : (
				<table>
					<thead>
					<tr>
						<td>ID</td>
						<td>Имя</td>
						<td>E-mail</td>
						<td>Текст</td>
					</tr>
					</thead>
					<tbody>
					{comments.map((el, index) => (
						<tr key={`${el.id}-${index}`}>
							<td>{el.postId}</td>
							<td>{el.name}</td>
							<td>{el.email}</td>
							<td>{el.body}</td>
						</tr>
					))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default MediumWorkWithRedux;
