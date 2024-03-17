"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { WidgetsList } from "./components/WidgetList/";
import { ParametersList } from "./components/ParamtersList";
import Block from "./Block";
import config from "./config";
import NavigationBar from "./components/NavigationBar/NavigationBar";

export default function Home() {
  const [widgets, setWidgets] = useState([] as Widget[]);
  const [selectedBlock, setSelectedBlock] = useState<Block>();

  useEffect(() => {
    fetch("./Fetcher/elements.json").then((res) =>
      res.json().then((json) => {
        setWidgets(json);
      })
    );
  }, []);

  return (
    <div className="h-[95vh] bg-gray-800 flex-column">
      <NavigationBar />
      <div className='flex w-full h-full'>
        <div className='flex-1'>
          <WidgetsList
            widgets={widgets}
            setWidgets={setWidgets}
            onBlockSelected={(block) => {
              setSelectedBlock(block);
            }}
          />
        </div>
        <div className='h-full flex-[3] p-4 bg-gray-800'>
          <iframe className="w-full h-full rounded" id="flutterview" src={`${config.host}:9998/`}></iframe>
        </div>
        {selectedBlock && <div className={styles.section}>
          <ParametersList selectedBlock={selectedBlock} onExit={()=>setSelectedBlock(undefined)}/>
        </div>}
      </div>
    </div>
  );
}
