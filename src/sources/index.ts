export interface IField {
	name: string;
	defaultValue: string;
	dirty: boolean;
	touch: boolean;
	error: boolean;
	focus: boolean;
	disable: boolean;
	ref?: HTMLInputElement;
}

const countries = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cura?ao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'R?union', 'Romania', 'Russia', 'Rwanda', 'Saint Barth?lemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'S?o Tom? and Pr?ncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];
const values1 = [
	{
		name: 'email',
		defaultValue: '',
		dirty: false,
		touch: false,
		error: false,
		focus: true,
		disable: false,
		ref: undefined,
	},
	{
		name: 'firstName',
		defaultValue: '',
		dirty: false,
		touch: false,
		error: false,
		focus: false,
		disable: false,
		ref: undefined,
	},
	{
		name: 'lastName',
		defaultValue: '',
		dirty: false,
		touch: false,
		error: false,
		focus: false,
		disable: false,
		ref: undefined,
	},
	{
		name: 'state',
		defaultValue: 'Bavaria',
		dirty: true,
		touch: true,
		error: false,
		focus: false,
		disable: true,
		ref: undefined,
	},
	{
		name: 'city',
		defaultValue: 'Ahorn',
		dirty: true,
		touch: true,
		error: false,
		focus: false,
		disable: false,
		ref: undefined,
	},
	{
		name: 'password',
		defaultValue: '',
		dirty: false,
		touch: true,
		error: false,
		focus: false,
		disable: false,
		ref: undefined,
	},
	{
		name: 'confirm',
		defaultValue: '',
		dirty: false,
		touch: true,
		error: false,
		focus: false,
		disable: false,
		ref: undefined,
	}
];

export const getCountries = (): Promise<string[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(countries);
		}, 1000);
	})
};

export const getFields = (country: string): Promise<string[]> => {
	const fields1 = ['firstName', 'email', 'password', 'confirm', 'lastName'];
	const fields2 = ['firstName', 'email', 'lastName'];
	return new Promise((resolve) => {
		setTimeout(() => {
			const random = Math.floor(Math.random() * 2);

			resolve(random === 1 ? fields1 : fields2);
		}, 1000);
	})
};

export const getFields2 = (): Promise<IField[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(values1);
		}, 2000);
	})
};

export const setFields = (data: IField[]): Promise<boolean> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, 1000);
	});
}

export const setRegister = <T extends {}>(data: T): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const keys = Object.keys(data);

			if (keys.length > 5) {
				resolve(true);
			} else {
				reject(false);
			}
		}, 1000);
	});
}

export const createDeal = (data: any): Promise<number> => new Promise((resolve) => {
	setTimeout(() => resolve(1000), 100);
});

export const sleep = (duration: number) => {
	const start = new Date().getTime();
	let end = start;
	while (end < start + duration) {
		end = new Date().getTime();
	}
};

