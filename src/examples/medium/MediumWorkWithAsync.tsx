import React, { useEffect, useState } from 'react';

import { get5000Photos, get5000Comments } from "../../sources";
import { IComment } from "../../interfaces";

const MediumWorkWithAsync = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [comments, setComments] = useState<IComment[]>([]);
	const [photos, setPhotos] = useState<any[]>([]);

	useEffect(() => {
		// const initData = async () => {
		// 	setIsLoading(true);
		//
		// 	const c = await get5000Comments();
		// 	const p = await get5000Photos();
		// 	setComments(c);
		// 	setPhotos(p)
		// 	setIsLoading(false)
		// };

		const initUsers = () => {
			setIsLoading(true);

			get5000Comments()
				.then((res) => setComments(res))
				.finally(() => setIsLoading(false));
		};

		const initPhotos = () => {
			setIsLoading(true);

			get5000Photos()
				.then((res) => setPhotos(res as any[]))
				.finally(() => setIsLoading(false));
		}

		initUsers();
		initPhotos();

		// initData();
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
						{comments.map((el, index) => {
							const isPhotos = photos.filter((photo) => photo.id === el.id);

							return (
								<tr key={index.toString(36)}>
									<td>{el.postId}</td>
									<td>{el.name}</td>
									<td>{el.email}</td>
									<td>{el.body}</td>
									<td><img src={isPhotos.length ? isPhotos[0].url : ''} alt="photo" /></td>
								</tr>
							)
						})}
						</tbody>
					</table>
			)}
		</>
	);
};

export default MediumWorkWithAsync;;
