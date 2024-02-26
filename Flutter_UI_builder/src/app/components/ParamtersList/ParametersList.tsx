import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Form, Col, Accordion } from "react-bootstrap"; // Import Bootstrap components as needed
import "./ParametersList.css";

/**
 * TODOS:
 * add switch for boolean parameters
 * add a color selector ( https://www.npmjs.com/package/react-colorful )
 * map parameter change to change values in actual Block
 */

let enums: EnumList;

export function ParametersList({ selectedBlock }: ParamtersListProps) {
  const [accordionKey, setAccordionKey] = useState<string | null>(null);

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
        elClass !== "List<Widget>" &&
        elClass !== "bool"
      ) {
        jsxCode.push(
          <Accordion key={propertyKey} defaultActiveKey={accordionKey}>
            <Accordion.Item eventKey={propertyKey}>
              <Accordion.Header
                className="accordian_header"
                onClick={() => setAccordionKey(propertyKey)}
              >
                <b>{property.name}</b>
              </Accordion.Header>
              <Accordion.Body>
                {renderPropertyInput(property, propertyKey)}
                {property.type.params && property.type.params.length > 0 && (
                  <ul>{ParseProps(property.type.params, propertyKey)}</ul>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
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
        <Form.Select
          defaultValue={
            (property.value && (property.value as string).split(".")[1]) ?? ""
          }
          onChange={(e) =>
            changeProp(key, property.type.class + "." + e.target.value)
          }
        >
          <option key="None">None/Custom</option>
          {enums[property.type.class].map((enumVal) => (
            <option key={enumVal}>{enumVal}</option>
          ))}
        </Form.Select>
      );
    }

    if (
      ["bool", "int", "double", "String"].indexOf(property.type.class) != -1
    ) {
      jxList.push(
        <Form.Control
          onChange={(e) => changeProp(key, e.target.value)}
          id={property.name}
          type="text"
        />
      );
    }

    if (elClass === "bool") {
      jxList.push(<Form.Check type="checkbox" label={`${property.name}`} />);
    }

    return jxList;
  }

  useEffect(() => {
    fetch("./Fetcher/enums.json").then((data) =>
      data.json().then((json) => {
        enums = json as EnumList;
      })
    );
  }, []);

  return (
    selectedBlock != null && (
      <div className="ParametersList">
        <h1>{selectedBlock.widget.name}</h1>
        <Col className="paramsCollapsable">
          <Form>
            <ul>{ParseProps(selectedBlock.widget.params)}</ul>
          </Form>
        </Col>
      </div>
    )
  );
}
