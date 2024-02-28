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
    <div className={styles.base}>
      <NavigationBar/>
      <div className={styles.body}>
        <div className={styles.section}>
          <WidgetsList
            widgets={widgets}
            setWidgets={setWidgets}
            onBlockSelected={(block) => {
              setSelectedBlock(block);
            }}
          />
        </div>
        <div className={styles.building_base}>
          <iframe id="flutterview" src={`${config.host}:9998/`}></iframe>
        </div>
        <div className={styles.section}>
          <ParametersList selectedBlock={selectedBlock} />
        </div>
      </div>
    </div>
  );
}
