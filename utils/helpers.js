const generateQueryParams = (city, tags, q) => {
  let queryParams = {
    query_city: city,
  };

  if (tags) {
    const tagsArr = tags.split(' ').map((tag) => tag.replace('-', ' '));
    queryParams = {
      ...queryParams,
      tags: { $all: [...tagsArr] },
    };
  }

  if (q) {
  }

  return queryParams;
};

module.exports = { generateQueryParams };
