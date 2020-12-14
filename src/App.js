import React from 'react';
// import axios from 'axios';
import Layout from './styles/components/Layout';
import TextInput from './styles/components/TextInput';
import Button from './styles/components/Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Search', response: [] };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { value } = this.state;
    let url = 'https://en.wikipedia.org/w/api.php?origin=*';

    const params = {
      action: 'query',
      list: 'search',
      format: 'json',
      srsearch: value,
      srlimit: 10,
    };

    Object.keys(params).forEach((key) => {
      url += `&${key}=${params[key]}`;
    });

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          response: response.query.search,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { response } = this.state;
    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            displayText="Type any text you want to search for at Wikipedia:"
            inputName="search"
            onChange={this.handleChange}
          />
          <Button type="submit" name="submit" />
          {response.map((entry) => {
            return (
              <div key={entry.pageid}>
                <h3>{entry.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: entry.snippet }} />
              </div>
            );
          })}
        </form>
      </Layout>
    );
  }
}

export default App;
