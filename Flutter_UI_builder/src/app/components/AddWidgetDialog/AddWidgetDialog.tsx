import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import './AddWidgetDialog.css';
export default function AddWidgetDialog({ onSubmit, show, setShow, widgets }: AddWidgetDialogProps) {

  const [filterQuery, setFilterQuery] = useState('');

  function handleCancel() {
    setShow(false);
  }

  function handleSubmit(name:string) {
    onSubmit(name)
    setShow(false);
  }

  return (
    <Modal show={show}>
      <Modal.Header>Add Widget</Modal.Header>
      <Modal.Body>
        <input placeholder="search here...." type="text" list="widgets" id="widgetsInput" onChange={(e) => setFilterQuery(e.target.value)} />
        <div className="widBtnList">
          {widgets.filter((wid) => (
            wid.name.toLowerCase()
              .includes(filterQuery.toLowerCase()))
          ).sort((a,b)=>a.name.length - b.name.length).map((wid) => <><Button className="widgetButton" onClick={()=>handleSubmit(wid.name)}>{wid.name}</Button><br /></>)}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button variant="danger" onClick={handleCancel}>Cancel</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
