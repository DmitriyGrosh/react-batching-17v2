import React, {
	ChangeEvent,
	Dispatch,
	FC,
	SetStateAction,
	useCallback,
} from "react";
import { debounce } from "lodash";

import { IAddittionalSearch } from "../../interfaces";

interface IUserSearch {
	setPagesAddittionalSearch: Dispatch<SetStateAction<IAddittionalSearch>>;
	type: 'email' | 'name';
}

const UserSearch: FC<IUserSearch> = ({ setPagesAddittionalSearch, type }) => {
	const debouncedSearch = useCallback(
		debounce((value: string) => {
			setPagesAddittionalSearch((prev) => ({
				...prev,
				[type]: value,
			}));
		}, 500),
		[]
	);

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		debouncedSearch(event.target.value);
	};

	return (
		<input
			onChange={handleSearch}
			placeholder={type === 'email' ? 'поиск по почте' : 'поиск по имени'}
			type="text"
		/>
	);
};

export default UserSearch;
