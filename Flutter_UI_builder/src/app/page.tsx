"use client"
//references types='./types'
import { useEffect, useState } from 'react';
import WidgetList from './WidgetsList';
import styles from './page.module.css'
import Block from './Block';

import { Container, Navbar } from 'react-bootstrap';
import ParametersList from './ParametersList';

export default function Home() {
  const [widgets, setWidgets] = useState([] as Widget[]);
  useEffect(() => {
    fetch('./Fetcher/elements.json').then((res) => res.json().then((json) => {
      setWidgets(json);
    }))
  }, [])

  return (
    <div className={styles.base}>
      <Navbar expand="lg" className="bg-body-dark">
        <Container>
          <Navbar.Brand href="#">UI Builder</Navbar.Brand>
        </Container>
      </Navbar>
      <div className={styles.body}>
        <div className={styles.section}><WidgetList widgets={widgets} setWidgets={setWidgets} /></div>
        <div className={styles.building_base}>
          <iframe src="http://localhost:8080/"></iframe></div>
        <div className={styles.section}>
          <ParametersList selectedBlock={widgets && (new Block(widgets.find((v) => v.name == 'Scaffold')!))} />
        </div>
      </div></div>
  );
}
