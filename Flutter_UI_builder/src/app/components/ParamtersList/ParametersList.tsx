import "./ParametersList.css";
import json from '../../../../public/Fetcher/enums.json'
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { RiSettings4Line, RiSettings2Fill } from "react-icons/ri";
/**
 * TODO:
 * set property to true on checkbox checked
 */
export function ParametersList({ selectedBlock }: ParamtersListProps) {
  const enums: EnumList = json;

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
    let jsxCode: any = [];

    widgetProperties.forEach((property) => {
      const propertyKey = parentKey
        ? `${parentKey}_${property.name}`
        : property.name;
      const elClass = property.type.class;
      if (
        elClass !== "Widget" &&
        elClass !== "List<Widget>"
      ) {
        jsxCode.push(
          <TreeItem key={propertyKey} label={property.name} nodeId={propertyKey || ''}>
            {renderPropertyInput(property, propertyKey)}
            {property.type.params && property.type.params.length > 0 && (
              ParseProps(property.type.params, propertyKey)
            )}
          </TreeItem>
        );
      }
    });

    return jsxCode;
  }

  function renderPropertyInput(property: Property, key: string) {
    const elClass = property.type.class;

    let jxList = [];

    if (property.enum) {
      jxList.push(
        <select
          onChange={(e) =>
            changeProp(key, property.type.class + "." + e.target.value)
          }
        >
          <option key="None">None/Custom</option>
          {enums[property.type.class].map((enumVal) => (
            <option key={enumVal} value={enumVal} selected={property.type.class + "." + enumVal == property.value}>{enumVal}</option>
          ))}
        </select>
      );
      // return jxList;
    }

    if (
      ["int", "double", "String"].indexOf(property.type.class) != -1
    ) {
      jxList.push(
        <input
          onChange={(e) => changeProp(key, e.target.value)}
          id={property.name}
          type="text"
          defaultValue={`${property.value || ''}`}
        />
      );
      return jxList;
    }

    if (property.name.toLowerCase().endsWith('color')) {

      jxList.push(
        <input
          onChange={(e) => changeProp(key + '_value', e.target.value.replace('#', '0xff'))}
          id={property.name}
          type="color"
        />
      )
      return jxList;

    }

    if (
      property.type.isFunction
    ) {
      jxList.push(
        <input defaultValue={(property.value as string) || ''}
          onChange={(e) => changeProp(key, e.target.value)}
          id={property.name}
          type="text"
        />
      );
      return jxList;
    }

    if (elClass === "bool") {
      console.log('Boolean');

      jxList.push(<input type="checkbox" />, ` ${property.name}`);
      return jxList;
    }

    return jxList;

  }

  return (
    selectedBlock != null && (
      <div className="ParametersList">
        {/* <h1>{selectedBlock.widget.name}</h1> */}
        <TreeView className="propsView" defaultCollapseIcon={<RiSettings2Fill />} defaultExpandIcon={<RiSettings4Line />}>{ParseProps(selectedBlock.widget.params)}</TreeView>
      </div>
    )
  );
}
