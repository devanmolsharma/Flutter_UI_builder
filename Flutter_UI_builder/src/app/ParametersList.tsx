import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Form, Col, Accordion } from "react-bootstrap"; // Import Bootstrap components as needed
import "./ParametersList.css"
import Block from "./Block";


type Props = { selectedBlock: Block };
type EnumList = { [key: string]: string[] };
var enums: EnumList;



export default function ParametersList({ selectedBlock }: Props) {

    const selectedWidget  = selectedBlock.widget;
    const [accordionKey, setAccordionKey] = useState<string | null>(null);

    function ParseProps(widgetProperties: Properties, parentKey: string | null = null) {
        if (widgetProperties == null) return <div></div>;
        let jsxCode: any = [];

        widgetProperties.forEach((property) => {
            const propertyKey = parentKey ? `${parentKey}_${property.name}` : property.name;
            const elClass = property.type.class;
            if (elClass !== "Widget" && elClass !== "List<Widget>" && elClass !== "bool") {
                jsxCode.push(
                    <Accordion key={propertyKey} defaultActiveKey={accordionKey}>
                        <Accordion.Item eventKey={propertyKey}>
                            <Accordion.Header className="accordian_header" onClick={() => setAccordionKey(propertyKey)}>
                                <b>{property.name}</b>
                            </Accordion.Header>
                            <Accordion.Body>
                                {renderPropertyInput(property)}
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

    function renderPropertyInput(property: Property) {
        const elClass = property.type.class;

        let jxList = []

        if (property.enum) {
            jxList.push(
                <Form.Select>
                    <option key="None">None/Custom</option>
                    {enums[property.type.class].map((enumVal) => (
                        <option key={enumVal}>{enumVal}</option>
                    ))}
                </Form.Select>
            );
        }

        if (["bool", "int", "double", "String"].indexOf(property.type.class) != -1) {
            jxList.push(<Form.Control id={property.name} type="text" />);
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

    return selectedWidget != null && (
        <div className="ParametersList">
            <h1>{selectedWidget.name}</h1>
            <Col className="paramsCollapsable">
                <Form>
                    <ul>{ParseProps(selectedWidget.params)}</ul>
                </Form>
            </Col>
        </div>
    );
}
