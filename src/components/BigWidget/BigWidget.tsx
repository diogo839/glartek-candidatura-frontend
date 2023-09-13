import React, {FC, useEffect} from 'react';
import { BigWidgetWrapper } from './BigWidget.styled';
import Weathercity from "../../types/weathercity";
import {Card, Col, Container, Row, Spinner} from "react-bootstrap";
import ConvertUnixTime from "../../utils/UtcToDate";
import {Link} from "react-router-dom";



function BigWidget(props: any) {

    const [city, setCity] = React.useState<Weathercity>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    useEffect(() => {
        const ac = new AbortController();

        getUserCity();

        console.log(location);
        return () => ac.abort();
    },[]);

function getUserCity() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_APP_GOOGLE_API_KEY}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'OK') {
                  const addressComponents = data.results[0].address_components;
            let city = '';
            for (const component of addressComponents) {
              if (component.types.includes('locality')) {
                city = component.long_name;
                break;
              }
            }

            if (city) {
                let fulfilled = false;
                props.weatherCity.forEach((element: any) => {
                    if(element.Name === city){
                        setCity(element);
                        fulfilled = true;
                    }
                });
                if(!fulfilled){
                    setCity(props.weatherCity[0])
                }

            } else {
              setCity(props.weatherCity[0])
            }
          }else{
                setCity(props.weatherCity[0])
          }
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching geolocation data:', error);
          setCity(props.weatherCity[0])
            setLoading(false);
        });
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}


    return (
            <div className="BigWidget">
                <div className="BigWidget__header">
                    <Container>
                        {!loading?
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <h3 className={"card-title"}><a href={"/Dashboard/"+city?.CityId+"/"+city?.Name}>{city?.Name}</a></h3></Col>
                                        <Col>
                                            <img src={`https://openweathermap.org/img/wn/${city?.icon}@2x.png`}
                                                 alt={"icon"} style={{maxHeight: "90%", maxWidth: "10%"}}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p className={"card-text"}>Temperatura: {city?.Weather}ºC</p>
                                        </Col>
                                        <Col>
                                            <p className={"card-text"}>{city?.description}</p>
                                        </Col>
                                    </Row>
                                      <Row>
                                        <Col>
                                            {ConvertUnixTime(city.sunrise, "Nascer do sol")}
                                        </Col>
                                        <Col>
                                            {ConvertUnixTime(city.sunset, "Pôr do sol")}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            :<Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>}
                        </Container>
                </div>
            </div>);
}

export default BigWidget;
