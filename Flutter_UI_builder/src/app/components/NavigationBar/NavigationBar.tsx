import config from "@/app/config";
import { Container, NavDropdown, Navbar } from "react-bootstrap";

export default function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-body-dark">
      <Container>
        <Navbar.Brand href="#"></Navbar.Brand>
        <NavDropdown title="Build">
          <NavDropdown.Item
            onClick={() => {
              location.href = config.host + ":8080/build/apk";
            }}
          >
            Apk
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              location.href = config.host + ":8080/build/aab";
            }}
          >
            Aab
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              location.href = config.host + ":8080/build/linux";
            }}
          >
            Linux
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              location.href = config.host + ":8080/build/web";
            }}
          >
            Web
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}
