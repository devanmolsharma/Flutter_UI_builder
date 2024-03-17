import { useState } from "react"
import './styles.css'
type Params = {
  names: string[],
  onChange: (newTab: string) => void
}

let TabsGroup = ({ names, onChange }: Params) => {

  const [selected, setSelected] = useState(names[0]);

  return <div className="w-[400px] p-2" >
    <div className="relative right-0" >
      <ul className="relative flex flex-wrap p-1 list-none rounded-lg bg-gray-200 text-slate-700" data-tabs="tabs" role="list" >
        {names.map((name) => <li className={`z-30 flex-auto text-center rounded-lg ${selected == name ? 'selected' : ''}`} >
          <a className="z-30 flex items-center justify-center w-full p-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer bg-inherit"
            data-tab-target="" onClick={() => {
              onChange(name);
              setSelected(name);
            }} role="tab" aria-selected="true" >
            <span className="ml-1" > {name} </span>
          </a>
        </li>)}
      </ul >
    </div >
  </div >
}


export default TabsGroup;