export interface IComment {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

export interface IPhotos {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

export interface IUser extends IComment{
	verified: string;
	country: string;
}

export interface IAddittionalSearch {
	name?: string;
	email?: string;
	country?: string;
	verified?: string;
}

export type TSearch = keyof IAddittionalSearch;

