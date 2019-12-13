import React, { Component } from 'react'
import { Navbar, Nav, FormControl, Button, Form, Jumbotron } from "react-bootstrap";

class DemoApp extends Component {

    navbar = () => {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        )
    }

    render() {
        return (
            <div>
                {this.navbar()}
                <div className="container-fluid">
                    <Jumbotron>
                        <h1>React Apollo Notifications Example</h1>
                        <p>
                            GraphQL and React are awesome!
                        </p>
                        <p>
                            <Button variant="primary">Learn more</Button>
                        </p>
                    </Jumbotron>
                </div>
            </div>
        )
    }
}

export default DemoApp
