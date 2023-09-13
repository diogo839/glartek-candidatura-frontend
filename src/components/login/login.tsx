import React, {FC, useRef} from 'react';
import {LoginWrapper} from './login.styled';
import Header from "../header/header";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import "./styles.css";
import axios from "axios";


function Login() {
    const [error, setError] = React.useState("");

    const email = useRef(null);
    const password = useRef(null);

    function LoginUser() {

        var config = {
            method: 'get',
            url: 'http://'+import.meta.env.VITE_APP_ENDPOINT+`/api/?email=${email.current.value}&password=${password.current.value}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        axios(config)
            .then(function (response) {

                setError("")
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("FavCities", response.data.favCities);
                localStorage.setItem("name", response.data.name);
                window.location.href = "/Dashboard";
            })
            .catch(function (error) {
                console.log(error.response);
                setError(error.response.data.error);
            });

    }

    return (
        <Header>
            <Container>
                <Card className={"cardCustom"}>
                    <Card.Body >
                        <Card.Title>Login</Card.Title>
                        <Card.Text>
                            <label htmlFor="email">Email
                                <input id={"email"} type={"email"} ref={email}/>
                            </label>
                            <label htmlFor="password">Password
                                <input id={"password"} type={"password"} ref={password}/>
                            </label>

                            <p style={{color: "red"}}>{error}</p>
                            <a href={"/Register"}>Ainda não estas registrado?</a>
                            <Button variant="primary" onClick={LoginUser}>
                                Login
                            </Button>

                        </Card.Text>
                    </Card.Body>

                </Card>
            </Container>

        </Header>

    );
}

export default Login;
