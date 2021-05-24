import React, { useState } from 'react';
import EditButton from './EditButton/EditButton.component';
import DeleteButton from './DeleteButton/DeleteButton.component';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog.component';
import SpinningDialog from '../SpinningDialog/SpinningDialog.component';
import ErrorDialog from '../ErrorDialog/ErrorDialog.component';
import { useApi, APIs } from '../../api';
import normalizeDate from '../../utils/normalize-date';

import './List.style.scss';

const List = ({ data, updateList, startNumber }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [removeItemId, setRemoveItemId] = useState();
  const [deleteUserState, deleteOneUser] = useApi(APIs.DELETE_ONE_USER);

  const showConfirmOnRemoveItem = (id) => {
    setRemoveItemId(id);
    setDialogIsOpen(true);
  };

  const removeItem = () => {
    deleteOneUser(removeItemId);
  };

  if (deleteUserState.data) {
    updateList();
  }

  if (deleteUserState.error) {
    return <ErrorDialog>{deleteUserState.error.message}</ErrorDialog>;
  }
  if (deleteUserState.loading) {
    return <SpinningDialog/>;
  }

  const noRow = <div className="no-item">There is nothing here</div>;

  const header = (
    <div className="row header">
      <div className="cell number">#</div>
      <div className="cell user-name">User Name</div>
      <div className="cell given-name">Given Name</div>
      <div className="cell sur-name">Surname</div>
      <div className="cell date-of-birth">Date of Birth</div>
      <div className="cell action">Action</div>
    </div>
  );

  const rows =
    data &&
    data.map(({ id, userName, givenName, surName, DOB }, index) => (
      <div className="row" key={id}>
        <div className="cell number">{startNumber + (index + 1)}</div>
        <div className="cell user-name">{userName}</div>
        <div className="cell given-name">{givenName}</div>
        <div className="cell sur-name">{surName}</div>
        <div className="cell date-of-birth">{normalizeDate(DOB)}</div>
        <div className="cell action">
          <EditButton to={`/edit-user/${id}`}/>
          <DeleteButton onDelete={showConfirmOnRemoveItem.bind(null, id)}/>
        </div>
      </div>
    ));

  return (
    <>
      <div className="list-wrapper">
        {data && data.length ? (
          <>
            {header}
            {rows}
            <ConfirmDialog
              isOpen={dialogIsOpen}
              handleClose={setDialogIsOpen.bind(null, false)}
              hanldeConfirm={removeItem}
            />
          </>
        ) : (
          noRow
        )}
      </div>
    </>
  );
};

export default List;
