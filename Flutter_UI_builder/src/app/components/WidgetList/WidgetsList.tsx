"use client";
import { ReactElement, useEffect, useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
} from "react-bootstrap";
import "./widgetList.css";

export function WidgetsList({
  widgets,
  setWidgets,
  onBlockSelected,
}: WidgetListProps): JSX.Element {
  function parseBlock(block: Block) {
    return (
      <Accordion>
        <AccordionHeader onClick={() => onBlockSelected(block)}>
          {block.name}
        </AccordionHeader>

        <AccordionBody>
          {block.children.map((child) => parseBlock(child))}
          {block.widgetParams()?.map((param) => (
            <Button className="widgetPropAdd">+ {param.name}</Button>
          ))}
        </AccordionBody>
      </Accordion>
    );
  }
  if (widgets.length > 0) {
    const Scaffold = widgets.find((v) => v.name == "Scaffold");
    console.log(widgets);
    let baseBlock = new Block(Scaffold!, "Scaffold");
    return (
      <div>
        <datalist id="widgets">
          {widgets.map((widget: any) => (
            <option>{widget.name}</option>
          ))}
        </datalist>

        {/* <input type="text" name="addWidget" id="addWidget" list="widgets" /> */}
        {parseBlock(baseBlock)}
      </div>
    );
  }

  return <></>;
}
