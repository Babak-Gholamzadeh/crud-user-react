import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Form from '../../components/Form/Form.component';
import SpinningDialog from '../../components/SpinningDialog/SpinningDialog.component';
import ErrorDialog from '../../components/ErrorDialog/ErrorDialog.component';
import { useApi, APIs } from '../../api';
import normalizeDate from '../../utils/normalize-date';

import './EditUser.style.scss';

const EditUserPage = ({
  match: {
    params: { userId },
  },
}) => {
  const [currentUserState, getOneUser] = useApi(APIs.GET_ONE_USER);
  const [updateState, updateOneUser] = useApi(APIs.UPDATE_ONE_USER);
  const history = useHistory();

  useEffect(() => {
    getOneUser(userId);
  }, []);

  const handleSubmit = (formData) => {
    updateOneUser(userId, formData);
  };

  if (updateState.data) {
    history.push('/');
  }

  if (currentUserState.error) {
    return <ErrorDialog>{currentUserState.error.message}</ErrorDialog>;
  }
  if (updateState.error) {
    return <ErrorDialog>{updateState.error.message}</ErrorDialog>;
  }
  if (currentUserState.loading || updateState.loading) {
    return <SpinningDialog />;
  }

  return (
    <div className="edit-user-page page-container">
      <h1 className="page-title">Edit user</h1>
      <Form
        data={
          currentUserState.data && {
            ...currentUserState.data.data,
            DOB: normalizeDate(currentUserState.data.data.DOB),
          }
        }
        handleSubmit={handleSubmit}
        loading={updateState.loading}
      />
    </div>
  );
};

export default EditUserPage;
