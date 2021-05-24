import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../../components/Form/Form.component';
import SpinningDialog from '../../components/SpinningDialog/SpinningDialog.component';
import ErrorDialog from '../../components/ErrorDialog/ErrorDialog.component';
import { useApi, APIs } from '../../api';

import './CreateUser.style.scss';

const CreateUserPage = () => {
  const [{ error, data, loading }, createOneUser] = useApi(
    APIs.CREATE_ONE_USER
  );
  const history = useHistory();

  const handleSubmit = (formData) => {
    createOneUser(formData);
  };

  if (data) {
    history.push('/');
  }

  if (error) {
    return <ErrorDialog>{error.message}</ErrorDialog>;
  }
  if (loading) {
    return <SpinningDialog />;
  }

  return (
    <div className="create-user-page page-container">
      <h1 className="page-title">Create New User</h1>
      <Form handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreateUserPage;
