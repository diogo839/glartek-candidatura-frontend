import React, {FC, useEffect} from 'react';
import Header from "../header/header";
import axios from "axios";
import {Button, Card, Col, Container, Row, Form} from "react-bootstrap";
import {MdOutlineFavorite, MdOutlineFavoriteBorder} from "react-icons/md";
import weatherCity from "../../types/weathercity";
import "./styles.css";
import BigWidget from "../BigWidget/BigWidget";
import ConvertUnixTime from "../../utils/UtcToDate";


function Dashboard() {


    const [weatherCity, setWeatherCity] = React.useState<weatherCity[]>([]);
    const [filteredCity, setFilteredCity] = React.useState<weatherCity[]>([]);
    const [favs, setFavs] = React.useState<string[]>(localStorage.getItem("FavCities")?.split(",") || []);
    const [menu, setMenu] = React.useState<string>("cities");


    function filtering(Name: string) {
        if (Name === "") {
            setFilteredCity(weatherCity);
        } else {
            const filtered = weatherCity.filter((city) => {
                return city.Name.toLowerCase().includes(Name.toLowerCase());
            });
            setFilteredCity(filtered);
        }
    }
    useEffect(() => {
        const ac = new AbortController();
        var config = {
            method: 'get',
            url: 'http://' + import.meta.env.VITE_APP_ENDPOINT + '/api/weather',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
        };

        axios(config)
            .then(function (response) {
                setWeatherCity(response.data.weatherCity);
                setFilteredCity(response.data.weatherCity);
            })
            .catch(function (error) {
                console.log(error);
                localStorage.removeItem("token");
                localStorage.removeItem("FavCities");
                localStorage.removeItem("name");
                window.location.href = "/";
            });
        return () => ac.abort();
    }, []);


    function updateFavCities(city: string) {
        var data = JSON.stringify({
            "cityId": city
        });

        var config = {
            method: 'put',
            url: 'http://'+import.meta.env.VITE_APP_ENDPOINT+'/api/',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem("token") ,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("FavCities", response.data.FavCities);
                setFavs(response.data.FavCities);
            })
            .catch(function (error) {

                localStorage.removeItem("token");
                localStorage.removeItem("FavCities");
                localStorage.removeItem("name");
                window.location.href = "/";

            });
    }



    return (
        <Header>
            <h1>Ola seja Bem vindo {localStorage.getItem("name")}  </h1>
            { weatherCity.length > 0 ?
            <BigWidget weatherCity={weatherCity}/>:<></>
            }
            <br/>
            <Container>
                <Row>
                    <Col>
                        <Button onClick={() => {
                            setMenu("cities")
                        }
                        }>Cidades
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={() => {
                            setMenu("favs")

                        }
                        }>Favoritos
                        </Button>
                    </Col>
                </Row>
                <br/>
                <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="cidade"  onChange={(e)=>{filtering(e.target.value)}}/>
      </Form.Group>
                </Form>
                <hr/>

                <Row>
                    {filteredCity.map((city) => {
                        if(favs.includes(city.CityId) && menu === "favs" || menu==="cities"){
                        return(<Col xs={3} key={city.CityId}>

                                <Card className={"card"}>
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <h5 className={"card-title"}><a href={"/Dashboard/"+city.CityId+"/"+city?.Name}>{city.Name}</a></h5></Col>
                                            <Col>
                                                <img src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
                                                     style={{maxHeight: "100%", maxWidth: "90%"}}/>
                                            </Col>
                                            <Col style={{alignContent: "end"}}>
                                                {favs.includes(city.CityId) ?
                                                    <MdOutlineFavorite className={"FavButton"} onClick={() => {
                                                        updateFavCities(city.CityId)
                                                    }}/> :
                                                    <MdOutlineFavoriteBorder className={"FavButton"} onClick={() => {
                                                        updateFavCities(city.CityId)
                                                    }}/>}
                                            </Col>

                                        </Row>
                                        <p className={"card-text"}>{city.description}</p>
                                        <p className={"card-text"}>Temperatura: {city.Weather}ºC</p>
                                        {ConvertUnixTime(city.sunrise, "Nascer do sol")}
                                        {ConvertUnixTime(city.sunset, "Pôr do sol")}


                                    </Card.Body>
                                </Card>
                            <br/>
                        </Col>)}})}
                </Row>
            </Container>


        </Header>
    );
}

export default Dashboard;
