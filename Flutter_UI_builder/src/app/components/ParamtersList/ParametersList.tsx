import "./ParametersList.css";
import json from '../../../../public/Fetcher/enums.json'
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { RiSettings4Line, RiSettings2Fill } from "react-icons/ri";
import TabsGroup from "../TabsGroup/TabsGroup";
import { useState } from "react";



export function ParametersList({ selectedBlock, onExit }: ParamtersListProps) {
  const enums: EnumList = json;
  const [propCategory, setPropCategory] = useState<'Values' | 'Colors' | 'Events' | 'Toggles' | 'Inputs'>('Inputs')

  function changeProp(id: string, value: null | string) {
    const indices = id.split("_");
    let newParams = selectedBlock.widget.params.map((p: Property) => {
      if (p.name == indices[0]) {
        return setValue(p, indices.slice(1), value);
      }
      else return p;
    });

    const wid = selectedBlock.widget;
    wid.params = newParams;

    selectedBlock.widget = wid;
    console.log(wid);

  }

  function setValue(property: Property, ids: string[], value: string | null) {
    if (ids.length == 0) {
      property.value = value;
    } else {
      property.type.params?.map((_prop) => {
        if (_prop.name == ids[0]) {
          return setValue(_prop, ids.slice(1), value);
        } else return _prop;
      });
    }

    return property;
  }

  function ParseProps(
    widgetProperties: Properties,
    parentKey: string | null = null
  ) {
    if (widgetProperties == null) return <div></div>;
    let generalProps: Record<string, JSX.Element[]> = {
      'enums': [],
      'toggles': [],
      'colors': [],
      'functions': [],
      'expandables': [],
      'others': [],
    };

    widgetProperties.forEach((property) => {
      const propertyKey = parentKey
        ? `${parentKey}_${property.name}`
        : property.name;
      const elClass = property.type.class;
      if (
        elClass !== "Widget" &&
        elClass !== "List<Widget>"
      ) {

        let child = renderPropertyInput(property, propertyKey);

        if (property.enum) {
          generalProps['enums'].push(child as any as JSX.Element);
        }
        else if (property.type.class === 'bool') {
          generalProps['toggles'].push(child as any as JSX.Element);
        }
        else if (property.name.toLocaleLowerCase().endsWith('color')) {
          generalProps['colors'].push(child as any as JSX.Element);
        }
        else if (property.type.isFunction) {
          generalProps['functions'].push(child as any as JSX.Element);
        }
        else {
          generalProps['others'].push(child as any as JSX.Element);
        }


        if (property.type.params && property.type.params.length > 0) {
          generalProps['expandables'].push(
            <TreeItem className="relative" key={propertyKey} label={property.name} nodeId={propertyKey || ''}>
              {ParseProps(property.type.params, propertyKey) as any}
            </TreeItem>)
        }
      }
    });

    return generalProps;
  }

  function renderPropertyInput(property: Property, key: string) {
    const elClass = property.type.class;

    let jxList = [];

    if (property.enum) {
      jxList.push(
        <div className="flex items-center space-x-2">
          <span>{property.name}:</span>
          <select
            onChange={(e) => changeProp(key, property.type.class + "." + e.target.value)}
            className="border rounded-md p-1 text-black w-32"
          >
            <option value="None">None</option>
            {enums[property.type.class].map((enumVal) => (
              <option
                key={enumVal}
                value={enumVal}
                selected={property.type.class + "." + enumVal === property.value}
              >
                {enumVal}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (["int", "double", "String"].indexOf(property.type.class) !== -1) {
      jxList.push(
        <>
          <label htmlFor={key}>{property.name}: </label>
          <input
            onChange={(e) => changeProp(key, e.target.value)}
            id={key}
            type="text"
            placeholder={property.type.class}
            defaultValue={`${property.value || ""}`}
            className="border rounded-lg p-1 w-32 m-2 text-black"
          />
        </>
      );
    }

    if (property.name.toLowerCase().endsWith("color")) {
      jxList.push(
        <div className="flex items-center space-x-2">
          <label htmlFor={key}>{property.name}:</label>
          <input
            onChange={(e) => changeProp(key + "_value", e.target.value.replace("#", "0xff"))}
            id={key}
            type="color"
            className="rounded-full w-8 border h-8"
          />
        </div>
      );
    }

    if (property.type.isFunction) {
      jxList.push(
        <textarea
          defaultValue={(property.value as string) || ""}
          onChange={(e) => changeProp(key, e.target.value)}
          id={property.name}
          className="border rounded-lg p-1 w-[80%] m-1 text-black"
          placeholder={`Do what on ${property.name.match(/[A-Z][a-z]+/g)?.join(' ').toLowerCase()}?`}
        />
      );
    }

    if (elClass === "bool") {
      jxList.push(
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={key}
            onChange={(e) => changeProp(key, e.target.checked ? "true" : "false")}
            className="rounded-md p-1"
            placeholder={property.name}
          />
          <label htmlFor={key}>{property.name}</label>
        </div>
      );
    }

    return jxList;
  }

  const typeMap = { 'Values': 'enums', 'Colors': 'colors', 'Events': 'functions', 'Toggles': 'toggles', 'Inputs': 'others' }
  let props = ParseProps(selectedBlock.widget.params) as any;

  return (
    selectedBlock != null && (
      <div className="ParametersList bg-gray-800 h-[100%] w=[100%] text-gray-400 py-6 relative">
        <div className="absolute top-6 right-4 bg-red-700 p-3 rounded-full text-gray-200 hover:cursor-pointer hover:scale-[1.1]" onClick={() => onExit()}><span className="absolute top-[-2px] right-2">x</span></div>
        <h1 className="text-lg m-1">Properties</h1>
        <TabsGroup names={['Inputs','Values', 'Colors', 'Events', 'Toggles']} onChange={(newTab) => { setPropCategory(newTab as "Values" | "Colors" | "Events" | "Toggles" | "Inputs") }} />
        <TreeView className="propsView overflow-x-scroll h-[80vh]" defaultCollapseIcon={<RiSettings2Fill />} defaultExpandIcon={<RiSettings4Line />}>
          {props[typeMap[propCategory]].map((E:any)=><div>{E}</div>)}
        </TreeView>
      </div>
    )
  );
}
