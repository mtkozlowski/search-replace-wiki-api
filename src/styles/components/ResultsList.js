import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const StyledEntry = styled.li`
  border-bottom: 1px solid grey;
`;

const ResultLits = ({ results }) => {
  const elements = results.map((entry) => {
    return (
      <StyledEntry key={entry.pageId}>
        <h3>{entry.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: entry.snippet }} />
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
};

ResultLits.defaultProps = {
  results: [],
};

export default ResultLits;
