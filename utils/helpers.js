const generateQueryParams = (city, queries) => {
	let queryParams = {
		query_city: city,
	};

	if (queries) {
		const filtersRegex = /angular|react|front end|back end|javascript|vue|typescript|node/gi;

		const tagsFilter = queries.match(filtersRegex);

		if (tagsFilter) {
			queryParams = {
				...queryParams,
				tags: { $all: [...tagsFilter] },
			};
		}

		const searchFilter = queries.replace(filtersRegex, '').trim();

		if (searchFilter) {
			queryParams = {
				...queryParams,
				$text: { $search: searchFilter },
			};
		}
	}

	console.log(queryParams);

	return queryParams;
};

const getDateDiff = (d1, d2) => {
	const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
	const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());

	return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
};

module.exports = { generateQueryParams, getDateDiff };
