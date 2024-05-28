"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./widgetList.css";
import Block from "@/app/Block";
import AddWidgetDialog from "../AddWidgetDialog/AddWidgetDialog";
import Compiler from "@/app/utils/Compiler";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgClipboard } from "react-icons/cg";

type WidgetListProps = {
  widgets: Widget[];
  onBlocksChange: (block: Block) => void;
  onBlockSelected: (block: Block) => void;
  baseBlock:Block,
  setBaseBlock:Dispatch<SetStateAction<Block>>
};

export function WidgetsList({
  widgets,
  onBlockSelected,
  onBlocksChange,
  baseBlock,
  setBaseBlock
}: WidgetListProps): JSX.Element {
  let [selectedBlock, setSelectedBlock] = useState<Block>();
  let [propname, setPropName] = useState("");
  let [showDialog, setShowDialog] = useState(true);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  
    useEffect(() => {
      onBlocksChange(baseBlock);
    }, [baseBlock]);
  
  if (widgets.length <= 0) {
    return <></>;
  }
  function toggleExpanded(ids: string[]) {
    setExpandedNodes(ids);
  }

  function copyWidgetCode(block: Block) {
    let code = Compiler.compileBlock(block);
    navigator.clipboard.writeText(code);
  }

  function parseBlock(block: Block, parent: string = "") {
    let children = block.children;
    let widgetListParams = block.widgetListParams();

    return (
      <TreeItem
        label={`${block.name} - ${block.widget.name}`}
        className={
          expandedNodes.includes(`${block.name}_${parent}`)
            ? "text-yellow-600"
            : "text-white"
        }
        onClick={() => {
          onBlockSelected(block);
        }}
        nodeId={`${block.name}_${parent}_${block.widget.name}`}
        icon={
          <CgClipboard
            className="hover:scale-[1.1]"
            onClick={() => {
              copyWidgetCode(block);
              alert("Copied Dart Code to Clipboard");
            }}
          />
        }
      >
        {widgetListParams?.map((param, i) => (
          <TreeItem
          key={i}
            className="text-white"
            nodeId={parent + block.name + param.name}
            label={param.name}
          >
            {children
              .filter((child) => child.name == param.name)
              .map((child) => parseBlock(child, block.name))}
            <TreeItem
              label="+ Add"
              nodeId={block.name + parent + param.name + "_add_child"}
              className="widgetPropAdd text-green-500"
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
        {block.widgetParams(true)?.map((param,i) => (
          <TreeItem
          key={i}
            nodeId={parent + block.name + "_" + param.name}
            label={param.name + (param.required ? "*" : "")}
            icon={<IoMdAddCircleOutline />}
            className="text-blue-500"
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
    <div className="bg-gray-800 h-full text-gray-300 p-4">
      {selectedBlock && (
        <AddWidgetDialog
          onSubmit={(widget) => handleWidgetAddition(widget)}
          show={showDialog}
          setShow={setShowDialog}
          widgets={widgets}
        />
      )}
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
