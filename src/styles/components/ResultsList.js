import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Highlighter from 'react-highlight-words';

const StyledEntry = styled.li`
  border-bottom: 1px solid grey;
`;

const ResultLits = ({ results, searchPhrase }) => {
  const elements = results.map((entry) => {
    return (
      <StyledEntry key={entry.pageId}>
        <h3>{entry.title}</h3>
        <p>
          <Highlighter
            highlightClassName="searchmatch"
            searchWords={[searchPhrase]}
            autoEscape
            textToHighlight={entry.snippet}
          />
        </p>
      </StyledEntry>
    );
  });

  return (
    <>
      <ul>{elements}</ul>
    </>
  );
};

ResultLits.propTypes = {
  results: PropTypes.instanceOf(Array),
  searchPhrase: PropTypes.string,
};

ResultLits.defaultProps = {
  results: [],
  searchPhrase: '',
};

export default ResultLits;
