"use client";
import { useState } from "react";
import "./widgetList.css";
import Block from "@/app/Block";
import AddWidgetDialog from "../AddWidgetDialog/AddWidgetDialog";
import Compiler from "@/app/utils/Compiler";
import config from "@/app/config";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgClipboard } from "react-icons/cg";

export function WidgetsList({
  widgets,
  setWidgets,
  onBlockSelected,
}: WidgetListProps): JSX.Element {
  if (widgets.length <= 0) {
    return <></>;
  }

  let [baseBlock, setBaseBlock] = useState(new Block(widgets.find((v) => v.name == "Scaffold")!, 'Scaffold'));
  let [selectedBlock, setSelectedBlock] = useState<Block>();
  let [propname, setPropName] = useState("");
  let [showDialog, setShowDialog] = useState(true);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  function toggleExpanded(ids: string[]) {
    setExpandedNodes(ids);
  }

  function copyWidgetCode(block: Block) {
    let code = Compiler.compileBlock(block);
    navigator.clipboard.writeText(code)
  }

  function parseBlock(block: Block, parent: string = "") {
    let children = block.children;
    let widgetListParams = block.widgetListParams();

    return (
      <TreeItem
        label={`${block.name} - ${block.widget.name}`}
        onClick={() => {
          onBlockSelected(block);
        }}
        nodeId={`${block.name}_${parent}`}
        icon={<CgClipboard onClick={
          () => {copyWidgetCode(block);
          alert('Copied Dart Code to Clipboard')}
        } />}
      >
        {widgetListParams?.map((param) => (
          <TreeItem
            nodeId={parent + block.name + param.name}
            label={param.name}
          >
            {children
              .filter((child) => child.name == param.name)
              .map((child) => parseBlock(child, block.name))}
            <TreeItem
              label="add"
              nodeId={block.name + parent + param.name + "_add_child"}
              className="widgetPropAdd"
              onClick={() => {
                setPropName(param.name);
                setSelectedBlock(block);
                setShowDialog(true);
              }}
            ></TreeItem>
          </TreeItem>
        ))}
        {children
          .filter(
            (child) =>
              !widgetListParams?.map((param) => param.name).includes(child.name)
          )
          .map((child) => parseBlock(child))}
        {block.widgetParams(true)?.map((param) => (
          <TreeItem
            nodeId={parent + block.name + "_" + param.name}
            label={param.name + (param.required ? "*" : "")}
            icon={<IoMdAddCircleOutline />}
            className="widgetPropAdd"
            onClick={() => {
              setPropName(param.name);
              setSelectedBlock(block);
              setShowDialog(true);
            }}
          ></TreeItem>
        ))}
      </TreeItem>
    );
  }

  function handleWidgetAddition(widgetName: string) {
    selectedBlock?.addChild(
      propname,
      widgets.find((widget) => widget.name == widgetName)!
    );
    const temp = baseBlock;
    setBaseBlock(temp.clone());
  }

  return (
    <div>
      {selectedBlock && (
        <AddWidgetDialog
          onSubmit={(widget) => handleWidgetAddition(widget)}
          show={showDialog}
          setShow={setShowDialog}
          widgets={widgets}
        />
      )}
      <button
        onClick={() => {
          let compiled = Compiler.compileBlock(baseBlock);
          fetch(config.host + ":8080/update", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              newCode: compiled,
            }),
          });

          setTimeout(() => {
            fetch(config.host + ":8080/render").then((_) => {
              var iframe = document.getElementById(
                "flutterview"
              ) as HTMLIFrameElement;
              iframe.src = iframe.src;
            });
          }, 2000);
        }}
      >
        Compile!
      </button>
      <TreeView
        expanded={expandedNodes}
        defaultCollapseIcon={<MdOutlineExpandMore />}
        defaultExpandIcon={<MdOutlineKeyboardArrowRight />}
        onNodeToggle={(_, ids) => toggleExpanded(ids)}
      >
        {parseBlock(baseBlock)}
      </TreeView>
    </div>
  );
}
