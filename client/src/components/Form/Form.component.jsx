import React, { useState } from 'react';
import TextInput from './TextInput/TextInput.component';
import ButtonInput from './ButtonInput/ButtonInput.component';

import './Form.style.scss';

const Form = ({ data, handleSubmit, loading }) => {
  const [state, setState] = useState({
    userName: data ? data.userName : '',
    givenName: data ? data.givenName : '',
    surName: data ? data.surName : '',
    DOB: data ? data.DOB : '',
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(state);
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={onSubmit}>
        <TextInput
          name="userName"
          value={state.userName}
          onChange={onChange}
          placeholder="Enter the username"
          label="username"
        />
        <TextInput
          name="givenName"
          value={state.givenName}
          onChange={onChange}
          placeholder="Enter the given name"
          label="given name"
        />
        <TextInput
          name="surName"
          value={state.surName}
          onChange={onChange}
          placeholder="Enter the surname"
          label="surname"
        />
        <TextInput
          name="DOB"
          value={state.DOB}
          onChange={onChange}
          placeholder="Enter the date of birth"
          label="date of birth"
        />
        <ButtonInput type="submit" loading={loading}>
          SAVE
        </ButtonInput>
      </form>
    </div>
  );
};

export default Form;
