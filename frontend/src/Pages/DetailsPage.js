import React, { useState, useEffect } from "react";
import NavbarComponent from '../Components/Navbar.js';
import Footer from '../Components/Footer.js';
import { useParams, Link } from "react-router-dom";
import { Card, Button, Nav } from 'react-bootstrap';

function DetailsPage({ itemDetails }) {

    const [foundItems, setFoundItems] = useState([])

    const [item, setItemDetail] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:5000/api/item?itemId=' + id)
            const json = await res.json()
            setItemDetail(json?.item || [])
        })()
    }, [])

    return (
        <div className="home">
            <NavbarComponent setFoundItems={setFoundItems} />

            <div className="d-flex flex-wrap justify-content-center mt-5 mb-5">
                <Card className="flex me-3 flex-column p-1" style={{ width: '20rem' }} >
                    <div className="p-2 d-flex">
                        <img className="img-fluid rounded" style={{ width: "30px", height: "30px", objectFit: "cover" }} src={item?.user?.photo?.url}>
                        </img>
                        <div className="ms-2">
                            {item?.user.login}
                        </div>
                    </div>
                    <Card.Img variant="top" style={{ objectFit: "cover", height: '400px' }} src={item?.photos?.[0]?.url} />
                    <Card.Body className="d-flex flex-column">
                        <Card.Title style={{ fontSize: "28px", color: '#FFFFFF' }}>{item?.title}</Card.Title>
                        <Card.Text>
                            <div>
                                <div className="mt-1" style={{ fontSize: "22px" }}>{item?.price?.amount} €</div>
                                <div style={{ fontSize: "17px", color: "green" }}>{item?.total_item_price} €, w tym <svg style={{ fill: "green" }} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M420-340h120v-100h100v-120H540v-100H420v100H320v120h100v100Zm60 260q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z" /></svg></div>
                                <div>{item?.size_title}</div>
                                <div>{item?.brand_title}</div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '40rem' }}>
                    <Card.Header>
                        <Card.Title className="m-2">Szczegóły</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className="d-flex flex-wrap justify-content-between">
                            <div className="ms-1 mt-2" style={{ width: "50%" }}>

                                <div className="m-2">
                                    <h4 className="mt-1">Opis</h4>
                                    <div>{item?.description}</div>
                                </div>

                                <div className="m-2 mt-2">
                                    <h4 className="mt-3">Cena</h4>
                                    <div className="mt-1"><b>Cena:</b> {item?.price?.amount} €</div>
                                    <div className="mt-1"><b>Cena z ochroną:</b> {item?.total_item_price} €</div>
                                </div>

                                <div className="m-2">
                                    <h4 className="mt-3">O Użytkowniku</h4>
                                    <div className="mt-1"><b>Nawzwa użytkownika:</b> {item?.user?.login}</div>
                                    <div className="mt-1"><b>Ostatnio online:</b> {item?.user?.last_loged_on}</div>
                                    <div className="mt-1"><b>Metody płatności:</b> <div class="text-capitalize">{item?.user?.accepted_pay_in_methods?.map(method => method?.code.replaceAll('_', ' ').toLowerCase()).join(', ')}</div></div>
                                </div>

                            </div>
                            <div className="me-3 mt-2">

                                <div className="m-2">
                                    <h4 className="mt-3">O Produkcie</h4>
                                    <div className="mt-1"><b>Rozmiar:</b> {item?.size}</div>
                                    <div className="mt-1"><b>Marka:</b> {item?.brand}</div>
                                    <div className="mt-1"><b>Kolor:</b> {item?.color1}</div>
                                </div>

                                <div className="m-2">
                                    <h4 className="mt-3">Lokalizacja</h4>
                                    <div className="mt-1"><b>Państwo:</b> {item?.country}</div>
                                    <div className="mt-1"><b>Miasto:</b> {item?.city}</div>
                                </div>

                            </div>

                        </Card.Text>
                        <Link to={'https://www.vinted.pl/items/' + item?.id}>
                            <Button className="m-3" variant="primary">View on Vinted</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
            <Footer />
        </div>
    );
}

export default DetailsPage;
