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

export async function getDataFromWiki(searchPhrase) {
  const url = buildUrl(searchPhrase);
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

export function stripHtml(snippet) {
  const regex = /(?:<span class="searchmatch">)(\w+)(?:<\/span>)/gi;
  return snippet.replace(regex, '$1');
}

export const decodeHtml = (encodedText) => {
  const shadowTextarea = document.createElement('textarea');
  shadowTextarea.innerHTML = encodedText;
  return shadowTextarea.value;
};
