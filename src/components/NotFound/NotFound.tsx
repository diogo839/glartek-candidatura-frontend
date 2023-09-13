import React, { FC } from 'react';
import {Card, Container} from "react-bootstrap";


function NotFound() {
  return (
    <div>
        <Container>
      <Card>
        <Card.Body>
            <Card.Title>404</Card.Title>
            <Card.Text>
                <p>Page not found</p>
                <a href={"/"}>Voltar ao menu principal</a>
            </Card.Text>
        </Card.Body>
        </Card>
        </Container>
    </div>
  );
}

export default NotFound;
