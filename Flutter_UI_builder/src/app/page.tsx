"use client"

import WidgetList from './WidgetsList';
import styles from './page.module.css'

import { Container, Navbar } from 'react-bootstrap';
export default function Home() {
  return (
    <div className={styles.base}>
      <Navbar expand="lg" className="bg-body-dark">
        <Container>
          <Navbar.Brand href="google.com">Test Title</Navbar.Brand>
        </Container>
      </Navbar>
      <div className={styles.body}>
        <div className={styles.section}><WidgetList /></div>
        <div className={styles.building_base}>
          <iframe src="http://localhost:8080/"></iframe></div>
        <div className={styles.section}></div>

      </div></div>
  );
}
