import React, { useState, useEffect } from 'react';
import useDebounce from './utils/useDebounce';

import Layout from './styles/components/Layout';
import TextInput from './styles/components/TextInput';
import Button from './styles/components/Button';
import ResultsList from './styles/components/ResultsList';
import Form from './styles/components/Form';
import { getDataFromWiki } from './utils/utils';

function App() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [wikiData, setWikiData] = useState([]);
  const [replacePhrase, setReplacePhrase] = useState('');
  const [disableReplace, setDisableReplace] = useState(false);

  const debouncedSearchPhrase = useDebounce(searchPhrase, 1000);

  useEffect(() => {
    if (debouncedSearchPhrase) {
      getDataFromWiki(debouncedSearchPhrase).then((results) => {
        setWikiData(results);
      });
    } else {
      setWikiData([]);
    }
  }, [debouncedSearchPhrase]);

  useEffect(() => {
    setDisableReplace(searchPhrase === '');
  });

  const handleSearchFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchPhrase || searchPhrase === '') return;

    const data = await getDataFromWiki(searchPhrase);
    setWikiData(data);
  };

  const handleReplaceFormSubmit = (event) => {
    event.preventDefault();

    const regex = new RegExp(`\\b${searchPhrase}\\b`, 'i');

    const index = wikiData.findIndex(({ snippet }) => {
      return regex.test(snippet);
    });
    if (index === -1) return;

    const newData = Array.from(wikiData);
    const edge = newData[index];
    const newText = edge.snippet.replace(regex, replacePhrase);
    const newItem = {
      ...edge,
      snippet: newText,
    };

    newData.splice(index, 1, newItem);
    setWikiData(newData);
  };

  const handleReplaceAll = () => {
    const regex = new RegExp(`\\b${searchPhrase}\\b`, 'gi');

    const newData = wikiData.map((edge) => {
      return {
        ...edge,
        title: edge.title.replace(regex, replacePhrase),
        snippet: edge.snippet.replace(regex, replacePhrase),
      };
    });

    setWikiData(newData);
  };

  return (
    <Layout>
      <Form onSubmit={handleSearchFormSubmit}>
        <fieldset>
          <TextInput
            displayText="Search phrase:"
            inputName="search"
            onChange={({ target: { value } }) => setSearchPhrase(value)}
          />
          <Button type="submit" name="submit" />
        </fieldset>
      </Form>
      <Form onSubmit={handleReplaceFormSubmit}>
        <fieldset disabled={disableReplace}>
          <TextInput
            displayText="Replace with:"
            inputName="search"
            onChange={({ target: { value } }) => setReplacePhrase(value)}
          />
          <Button type="submit" name="replace" value="Replace" />
          <Button
            type="button"
            name="replaceAll"
            value="Replace All"
            onClick={handleReplaceAll}
          />
        </fieldset>
      </Form>
      <ResultsList results={wikiData} searchPhrase={searchPhrase} />
    </Layout>
  );
}

export default App;
