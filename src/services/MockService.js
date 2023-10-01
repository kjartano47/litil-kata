export const fetchData = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const mockData = new Array(1000).fill(50);
			resolve(mockData);
		}, 1000); // Simulate a 5-second delay
	});
};
