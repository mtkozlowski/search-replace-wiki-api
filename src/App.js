import React from 'react';
import Layout from './styles/components/Layout';
import TextInput from './styles/components/TextInput';
import Button from './styles/components/Button';
import ResultsList from './styles/components/ResultsList';
import Form from './styles/components/Form';
import { buildUrl, getDataFromWiki } from './utils/utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPhrase: '',
      wikiData: [],
      replacePhrase: '',
    };

    this.handleSearchPhraseChange = this.handleSearchPhraseChange.bind(this);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);

    this.handleReplacePhraseChange = this.handleReplacePhraseChange.bind(this);
    this.handleReplaceFormSubmit = this.handleReplaceFormSubmit.bind(this);
  }

  handleSearchPhraseChange(event) {
    this.setState({
      searchPhrase: event.target.value,
    });
  }

  async handleSearchFormSubmit(event) {
    event.preventDefault();

    const { searchPhrase } = this.state;
    const url = buildUrl(searchPhrase);

    const data = await getDataFromWiki(url);

    this.setState({
      wikiData: data,
    });
  }

  handleReplacePhraseChange(event) {
    this.setState({
      replacePhrase: event.target.value,
    });
  }

  handleReplaceFormSubmit(event) {
    event.preventDefault();

    const { wikiData, replacePhrase, searchPhrase } = this.state;

    const index = wikiData.findIndex(({ snippet }) => {
      return snippet.includes(searchPhrase);
    });

    if (index === -1) return;

    wikiData[index].snippet = wikiData[index].snippet.replace(
      searchPhrase,
      replacePhrase,
    );

    this.setState({
      wikiData,
    });
  }

  render() {
    const { wikiData, searchPhrase } = this.state;
    const replaceDisabled = searchPhrase.length === 0;

    return (
      <Layout>
        <Form onSubmit={this.handleSearchFormSubmit}>
          <fieldset>
            <TextInput
              displayText="Search phrase:"
              inputName="search"
              onChange={this.handleSearchPhraseChange}
            />
            <Button type="submit" name="submit" />
          </fieldset>
        </Form>
        <Form onSubmit={this.handleReplaceFormSubmit}>
          <fieldset disabled={replaceDisabled}>
            <TextInput
              displayText="Replace with:"
              inputName="search"
              onChange={this.handleReplacePhraseChange}
            />
            <Button type="submit" name="replace" value="Replace" />
            <Button type="button" name="replaceAll" value="Replace All" />
          </fieldset>
        </Form>
        <ResultsList results={wikiData} searchPhrase={searchPhrase} />
      </Layout>
    );
  }
}

export default App;
