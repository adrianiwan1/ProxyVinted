import React, { useState } from "react";
import NavbarComponent from '../Components/Navbar.js';
import Footer from '../Components/Footer.js';

function DetailsPage({ itemDetails }) {

    console.log(itemDetails.details)

    return (
        <div className="A">
            <NavbarComponent />
            <div className="d-flex flex-wrap justify-content-center mt-5">
                {itemDetails.details.title}
            </div>
            <Footer />
        </div>
    );
}

export default DetailsPage;
