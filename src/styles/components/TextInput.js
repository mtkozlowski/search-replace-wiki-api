import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: block;
  padding: 0.6rem 0 0.5rem;
`;

const StyledInput = styled.input`
  display: block;
  height: 3rem;
  padding: 0.6rem 1rem 0.5rem;
  margin: 1rem auto 1rem;
  width: 100%;
  border-width: 0 0 1px 0;
  border-color: rgb(99 77 77 / 30%);
  box-shadow: 0px -1px 5px 1px rgb(99 77 77 / 10%);
`;

const TextInput = ({ displayText, inputName, onChange }) => {
  const inputId = Math.random();
  return (
    <>
      <StyledLabel htmlFor={inputId}>{displayText}</StyledLabel>
      <StyledInput name={inputName} id={inputId} onChange={onChange} />
    </>
  );
};

TextInput.propTypes = {
  displayText: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  onChange: PropTypes.element.isRequired,
};

export default TextInput;
