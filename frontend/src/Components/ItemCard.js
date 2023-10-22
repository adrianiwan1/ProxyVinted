import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

function ItemCard({ item }) {

    return (
        <Card className="m-3 flex flex-column p-1" style={{ width: '20rem' }} >
            <div className="p-2 d-flex">
                <img className="img-fluid rounded" style={{ width: "30px", height: "30px", objectFit: "cover" }} src={item.user?.photo?.url}>
                </img>
                <div className="ms-2">
                    {item.user.login}
                </div>
            </div>
            <Card.Img variant="top"  style={{ objectFit: "cover", height: '200px', width: '100%'}} src={item.photo.url} />
            {/* <Card>
                <Card.Img
                    variant="top"
                    className="img-fluid"
                    style={{ maxHeight: '200px', width: '100%' }}
                    src={item.photo.url}
                />
            </Card> */}
            <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontSize: "28px", color: '#FFFFFF' }}>{item.title}</Card.Title>
                <Card.Text>
                    <div>
                        <div className="mt-1" style={{ fontSize: "22px" }}>{item.price} €</div>
                        <div style={{ fontSize: "17px", color: "green" }}>{item.total_item_price} €, w tym <svg style={{ fill: "green" }} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M420-340h120v-100h100v-120H540v-100H420v100H320v120h100v100Zm60 260q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z" /></svg></div>
                        <div>{item.size_title}</div>
                        <div>{item.brand_title}</div>
                    </div>
                </Card.Text>
                <div className="mt-auto card-button">
                    <Link to={'/' + item.id} >
                        <Button variant="primary" className="col-12" >
                            Szczegóły
                        </Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ItemCard;
