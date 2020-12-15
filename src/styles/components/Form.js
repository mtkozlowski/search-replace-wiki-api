import styled from 'styled-components';
import { StyledLabel } from './TextInput';
import Button from './Button';

const Form = styled.form`
  fieldset {
    border-width: 0px;
    display: flex;
    align-items: flex-end;
    margin-bottom: 1rem;
  }

  fieldset[disabled] label {
    color: lightgrey;
  }

  ${StyledLabel} {
    flex: 1 1 60%;
  }

  ${Button} {
    flex: 0 1 auto;
    margin-left: 1rem;
  }
`;

export default Form;
