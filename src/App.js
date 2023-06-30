import React from "react";
import Navigation from "./Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/*" element={<Navigation />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
