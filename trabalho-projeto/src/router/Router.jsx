import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Digimon from "../pages/Digimon";
import Digimon2 from "../pages/Digimon2";

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Digimon/>} />
                <Route path="/profile" element={<Digimon2/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
