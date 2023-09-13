import React, {FC, useEffect} from 'react';
import {DetailPageWrapper} from './detailPage.styled';
import Header from "../header/header";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import axios from "axios";
import {weather} from "../../types/weather";
import {AiOutlineArrowLeft} from "react-icons/ai";
import "./styles.css"

function DetailPage() {
    const {CityId, Name} = useParams();
    const [menu, setMenu] = React.useState<string>("info");
    const [weathers, setWeathers] = React.useState<weather[]>([]);
    useEffect(() => {
        const ac = new AbortController();
        var config = {
            method: 'get',
            url: 'http://' + import.meta.env.VITE_APP_ENDPOINT + '/api/weather/history/?cityId=' + CityId,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
        };

        axios(config)
            .then(function (response) {
                setWeathers(response.data.weatherData);
            })
            .catch(function (error) {

                localStorage.removeItem("token");
                localStorage.removeItem("FavCities");
                localStorage.removeItem("name");
                window.location.href = "/";
            });
        return () => ac.abort();
    }, []);
    return (
        <Header>
            <Container>
                    {weathers.length>0?
                <Card >
                    <Card.Title>
                        <Row>
                            <Col xs={1} style={{ justifyContent: "center"}}>
                                <a href={"/Dashboard"}><AiOutlineArrowLeft  className={"BackButton"} ></AiOutlineArrowLeft></a>
                            </Col>
                            <Col xs={10}>
                                 <h1>{Name}</h1>
                            </Col>
                        </Row>

                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        <Row>
                            <Col>
                                <Button onClick={
                                    () => {
                                        setMenu("info")
                                    }
                                }>Dados Gerais</Button>
                            </Col>
                            <Col>
                                <Button onClick={
                                    () => {
                                        setMenu("history")
                                    }
                                }>Historico</Button>
                            </Col>
                        </Row>
                    </Card.Subtitle>
                    {menu ==="info"?
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Text>
                                {weathers[0].weather[0].description}
                                </Card.Text>
                            </Col>
                            <Col>
                                <img src={`https://openweathermap.org/img/wn/${weathers[0].weather[0].icon}@2x.png`}
                                                     style={{maxHeight: "90%", maxWidth: "10%"}}/>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Temperatura</Card.Title>
                                        <Card.Text>
                                            <Row>
                                                <Col>
                                                    <p>Actual</p>
                                                    {weathers[0]?.main.temp} Cº
                                                    <p>Maxima</p>
                                                    {weathers[0]?.main.temp_max} Cº
                                                </Col>
                                                <Col>
                                                    <p>Parece</p>
                                                    {weathers[0]?.main.feels_like} Cº
                                                    <p>Minima</p>
                                                    {weathers[0]?.main.temp_min} Cº
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Vento</Card.Title>
                                        <Card.Text>
                                            <Row>
                                                <Col>
                                                    <p>Velocidade</p>
                                                    {weathers[0]?.wind.speed} m/s
                                                    <p>Pressão</p>
                                                    {weathers[0].main.pressure} hPa
                                                    <p>Nuvens</p>
                                                    {weathers[0].clouds.all} %
                                                </Col>
                                                <Col>
                                                    <p>Direção</p>
                                                    {weathers[0]?.wind.deg} º
                                                    <p>Humidade</p>
                                                    {weathers[0]?.main.humidity} %
                                                    <p>Visibilidade</p>
                                                    {weathers[0].visibility} m
                                                </Col>

                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                        </Row>
                    </Card.Body>
                        : <Card>
                        {weathers.map((weather)=>{

                              return  <Card>
                            <Card.Body>

                                    <Card.Text>
                                        <Row>
                                            <Col>
                                                <h4>{Name}</h4>
                                            </Col>

                                            <Col>
                                                <p>Temperatura</p>
                                                {weather.main.temp} Cº
                                            </Col>
                                            <Col>
                                                <p>Data</p>
                                                {weather.dt_txt}
                                            </Col>
                                            <Col>
                                                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                                     style={{maxHeight: "90%", maxWidth: "40%"}}/>
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                            </Card>


                        })}
                            </Card>}

                </Card>
                        :<></>}
            </Container>
        </Header>
    );
}

export default DetailPage;
