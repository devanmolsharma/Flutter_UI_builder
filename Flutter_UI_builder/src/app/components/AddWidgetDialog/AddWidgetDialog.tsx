import { useState } from "react";
import './AddWidgetDialog.css'; // You may want to keep your custom CSS
// Make sure to import Tailwind CSS in your project

export default function AddWidgetDialog({ onSubmit, show, setShow, widgets }: AddWidgetDialogProps) {

  const [filterQuery, setFilterQuery] = useState('');

  function handleCancel() {
    setFilterQuery('');
    (document.getElementById('widgetsInput') as HTMLInputElement).value=''
    setShow(false);
  }

  function handleSubmit(name:string) {
    setFilterQuery('');
    (document.getElementById('widgetsInput') as HTMLInputElement).value=''
    onSubmit(name)
    setShow(false);
  }

  return (
    <div className={`fixed inset-0 overflow-y-auto ${show ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-800 rounded-lg text-left shadow-xl transform transition-all sm:max-w-lg w-full">
          <div className="bg-gray-800 p-4 rounded-t-lg">
            <h3 className="text-lg font-semibold">Add Widget</h3>
          </div>
          <div className="p-4">
            <input placeholder="Search here...." type="text" id="widgetsInput" className="border bg-gray-600 rounded-md p-2 w-full mb-4" onChange={(e) => setFilterQuery(e.target.value)} />
            <div className="space-y-2 h-[600px] overflow-scroll">
              {widgets.filter((wid) => (
                wid.name.toLowerCase().includes(filterQuery.toLowerCase()))
              ).sort((a,b)=>a.name.length - b.name.length).map((wid, index) => (
                <button key={index} className="block w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 text-left" onClick={()=>handleSubmit(wid.name)}>{wid.name}</button>
              ))}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-b-lg flex justify-end">
            <button className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
