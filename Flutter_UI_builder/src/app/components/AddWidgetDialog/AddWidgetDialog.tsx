import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function AddWidgetDialog({onSubmit,show, setShow}:AddWidgetDialogProps) {

  function handleCancel(){
    setShow(false);
  }

  function handleSubmit(){
    onSubmit((document.getElementById('widgetsInput')as HTMLInputElement).value)
    setShow(false);
  }

  return (
    <Modal show={show}>
      <Modal.Header>Add Widget</Modal.Header>
      <Modal.Body>
        <input type="text" list="widgets" id="widgetsInput" />
      </Modal.Body>
      <Modal.Footer>
        <div>
            <Button variant="danger" onClick={handleCancel}>Cancel</Button>
             &nbsp;
            <Button onClick={handleSubmit}>Add</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
