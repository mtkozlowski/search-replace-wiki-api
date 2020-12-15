export function buildUrl(searchPhrase) {
  let url = 'https://en.wikipedia.org/w/api.php?origin=*';

  const params = {
    action: 'query',
    list: 'search',
    format: 'json',
    srsearch: searchPhrase,
    srlimit: 10,
  };

  Object.keys(params).forEach((key) => {
    url += `&${key}=${params[key]}`;
  });

  return url;
}

export async function getDataFromWiki(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const datas = data.query.search.map(({ pageid, title, snippet }) => ({
      pageId: pageid,
      title,
      snippet,
    }));

    return datas;
  } catch (err) {
    return new Error(err);
  }
}
