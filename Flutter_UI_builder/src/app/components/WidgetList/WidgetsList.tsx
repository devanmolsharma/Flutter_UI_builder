"use client";
import { ReactElement, useEffect, useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
} from "react-bootstrap";
import "./widgetList.css";
import Block from "@/app/Block";
import AddWidgetDialog from "../AddWidgetDialog/AddWidgetDialog";
import Interpreter from "@/app/utils/Intepreter";

export function WidgetsList({
  widgets,
  setWidgets,
  onBlockSelected,
}: WidgetListProps): JSX.Element {
  if (widgets.length <= 0) {
    return <></>;
  }

  const Scaffold = widgets.find((v) => v.name == "Scaffold");
  let [baseBlock, setBaseBlock] = useState(new Block(Scaffold!, "Scaffold"));
  let [selectedBlock, setSelectedBlock] = useState<Block>();
  let [propname, setPropName] = useState("");
  let [showDialog, setShowDialog] = useState(true);

  function parseBlock(block: Block) {
    let children = block.children;
    let widgetParams = block.widgetListParams();

    return (
      <Accordion>
        <AccordionHeader
          onClick={() => {
            onBlockSelected(block);
            if (selectedBlock)
              console.log(Interpreter.compileBlock(selectedBlock));
          }}
        >
          {block.name} - {block.widget.name}
        </AccordionHeader>

        <AccordionBody>
          {widgetParams?.map((param) => (
            <Accordion>
              <AccordionHeader>{param.name}</AccordionHeader>
              <AccordionBody>
                {children
                  .filter((child) => child.name == param.name)
                  .map((child) => parseBlock(child))}
                <Button
                  className="widgetPropAdd"
                  onClick={() => {
                    setPropName(param.name);
                    setSelectedBlock(block);
                    setShowDialog(true);
                  }}
                >
                  + Widget
                </Button>
              </AccordionBody>
            </Accordion>
          ))}
          {children
            .filter(
              (child) =>
                !widgetParams?.map((param) => param.name).includes(child.name)
            )
            .map((child) => parseBlock(child))}
          {block.widgetParams(true)?.map((param) => (
            <Button
              className="widgetPropAdd"
              onClick={() => {
                setPropName(param.name);
                setSelectedBlock(block);
                setShowDialog(true);
              }}
            >
              + {param.name}
            </Button>
          ))}
        </AccordionBody>
      </Accordion>
    );
  }

  function handleWidgetAddition(widgetName: string) {
    selectedBlock?.addChild(
      propname,
      widgets.find((widget) => widget.name == widgetName)!
    );
    const temp = baseBlock;
    setBaseBlock(temp.clone());
    console.log(temp.buildTree());
  }

  return (
    <div>
      {selectedBlock && (
        <AddWidgetDialog
          onSubmit={(widget) => handleWidgetAddition(widget)}
          show={showDialog}
          setShow={setShowDialog}
        />
      )}
      <datalist id="widgets">
        {widgets.map((widget: any) => (
          <option>{widget.name}</option>
        ))}
      </datalist>

      {parseBlock(baseBlock)}
    </div>
  );
}
