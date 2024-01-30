"use client"
import { ReactElement, useEffect, useState } from "react";
type Props = {widgets:Widget[],setWidgets:Function}

function WidgetList({widgets,setWidgets}:Props):JSX.Element {
    
    return (<div>
        <datalist id="widgets">
            {widgets.map((widget: any) => <option>{widget.name}</option>)}
        </datalist>
        
        <input type="text" name="addWidget" id="addWidget" list="widgets" />
    </div>)
}

export default WidgetList;