import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {ChangeSet, useUpdateChangeSetMutation, AllDataDocument, ChangeSetFieldsFragment} from './hooks';
import { FormControl, Modal, TextField, Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
  }
}));

type AddChangeSetModalProps = {
  currentBaseHash: string,
  changeSets: ChangeSetFieldsFragment[]
}

const AddChangeSetModal = (props: AddChangeSetModalProps) => {
  const classes = useStyles(props);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setName("");
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  // FIXME: fix types.
  const [updateChangeSet, { loading, error }] = useUpdateChangeSetMutation(
    {
      // @ts-ignore
      update(cache, { data: { updateChangeSet } }) {
        // @ts-ignore
        const { changeSets } = cache.readQuery({ query: AllDataDocument });
        cache.writeQuery({
          query: AllDataDocument,
          data: { changeSets: changeSets.concat([updateChangeSet]) },
        });
      }
    }
  );

  const handleUpdateChangeSet = () => {
    updateChangeSet({variables: {changeSet: {
      id: name,
      baseHash: props.currentBaseHash,
      actions: []
    }}})
  };

  return (
      <div>
        <button type="button" onClick={handleOpen}>
          Add ChangeSet
        </button>
        <Modal
          open={open}
          onClose={handleClose}
        > 
          <div>
            {!error && loading && <CircularProgress />}
            {error && !loading && <div>{error}</div>}
            {!error && !loading && 
              <React.Fragment>
                <h2 id="simple-modal-title">Add Change Set</h2>

                <FormControl>
                  <TextField
                    id="name"
                    label="Change Set Name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    margin="normal"
                  />
                </FormControl>
                <FormControl>
                  <Button variant="contained" color="primary" onClick={handleUpdateChangeSet}>
                    Add
                  </Button>
                </FormControl>
              </React.Fragment>
          }
        </div>
      </Modal>
    </div> 
  );
}

export default AddChangeSetModal;