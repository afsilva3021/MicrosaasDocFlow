import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">DocFlow</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Início</Nav.Link>
            <Nav.Link as={Link} to="/modelos">Modelos</Nav.Link>
            <Nav.Link as={Link} to="/documentos">Modelos</Nav.Link>
          </Nav>
          <Nav>
            <Button
              as={Link}
              to="/login"
              variant="outline-primary"
              className="me-2"
            >
              Login
            </Button>
            <Button
              as={Link}
              to="/cadastro"
              variant="primary"
            >
              Cadastrar
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;