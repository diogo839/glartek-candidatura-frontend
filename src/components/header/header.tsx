import React, {FC, useEffect} from 'react';
import {HeaderWrapper} from './header.styled';
import styles from './styles.css';
import {Col, Container, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {GoSignOut} from "react-icons/go";
import {Link} from "react-router-dom";

function Header(props: any) {
    useEffect(() => {
        if (!localStorage.hasOwnProperty("token") ) {
            if (window.location.pathname !== "/" && window.location.pathname !== "/Register")
            window.location.href = "/";
        } else if (localStorage.hasOwnProperty("token") && window.location.pathname === "/" || window.location.pathname === "/Register") {
            window.location.href = "/Dashboard";
        }


    }, []);

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("FavCities");
        localStorage.removeItem("name");
    }

    return (
        <div>
            <header>
                <Row>
                    <Col xs={3}>

                        <a href={"/Dashboard"} style={{textDecoration: "none"}} ><h1 className={styles.header} style={{marginLeft: "7%"}}>My Weather</h1></a>
                    </Col>
                    <Col xs={8}>
                    </Col>
                    {localStorage.getItem("token") ?
                        <Col xs={1}>
                                <a href={"/"} onClick={logout}><GoSignOut className={"sighOut"}/></a>
                        </Col> : null
                    }

                </Row>

            </header>
            <main className="main">{props.children}</main>
        </div>

    );
}

export default Header;
