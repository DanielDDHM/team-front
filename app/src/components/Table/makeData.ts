import namor from 'namor';

const range = (len: number) => {
	const arr = [];
	for (let i = 0; i < len; i += 1) {
		arr.push(i);
	}
	return arr;
};

const newPerson = () => {
	return {
		firstName: namor.generate({ words: 1, numbers: 0 }),
		lastName: namor.generate({ words: 1, numbers: 0 }),
		age: Math.floor(Math.random() * 30),
	};
};

// @ts-ignore
export default function makeData(...lens) {
	// @ts-ignore
	const makeDataLevel = (depth = 0) => {
		const len = lens[depth];
		return range(len).map((d) => ({
			...newPerson(),
			subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
		}));
	};

	return makeDataLevel();
}
