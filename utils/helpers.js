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

module.exports = { generateQueryParams };
