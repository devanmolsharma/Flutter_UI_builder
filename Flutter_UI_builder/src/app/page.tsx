"use client";

import styles from "./page.module.css";

import { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";

import { WidgetsList } from "./components/WidgetList/";
import { ParametersList } from "./components/ParamtersList";

import Block from "./Block";
import AddWidgetDialog from "./components/AddWidgetDialog/AddWidgetDialog";

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
      <Navbar expand="lg" className="bg-body-dark">
        <Container>
          <Navbar.Brand href="#">UI Builder</Navbar.Brand>
        </Container>
      </Navbar>
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
          <iframe src="http://localhost:8080/"></iframe>
        </div>
        <div className={styles.section}>
          <ParametersList selectedBlock={selectedBlock} />
        </div>
      </div>
    </div>
  );
}
