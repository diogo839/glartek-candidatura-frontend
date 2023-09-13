import React, {FC, useRef} from 'react';
import {RegisterWrapper} from './Register.styled';
import Header from "../header/header";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import * as process from "process";


function Register() {
    const [error, setError] = React.useState("");
    const name = useRef(null);
const email = useRef(null);
const password = useRef(null);
    function Register() {
        var data = JSON.stringify({
            "name": name.current.value,
            "email": email.current.value,
            "password":password.current.value
        });

        var config = {
            method: 'post',
            url: "http://"+import.meta.env.VITE_APP_ENDPOINT+'/api/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
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
                    <Card.Body>
                        <Card.Title>Registar</Card.Title>
                        <Card.Text>
                            <label htmlFor="name">Name
                                <input id={"name"} type={"text"} ref={name}/>
                            </label>
                            <br/>
                            <label htmlFor="email">Email
                                <input id={"email"} type={"email"} ref={email}/>
                            </label>

                            <br/>
                            <label htmlFor="password">Password
                                <input id={"password"} type={"password"} ref={password}/>
                            </label>

                            <br/>
                            <p style={{color: "red"}}>{error}</p>

                            <Button variant="primary" onClick={Register}>
                                Register
                            </Button>
                        </Card.Text>
                    </Card.Body>

                </Card>
            </Container>

        </Header>

    );
}

export default Register;
