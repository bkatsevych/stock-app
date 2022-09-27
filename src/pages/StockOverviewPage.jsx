import React from "react";
import Autocomplete from "../components/Autocomplete";
import StockList from "../components/StockList";

const StockOverviewPage = () => {
    return (
        <div>
            I am a StockOverviewPage
            <Autocomplete />
            <StockList />
        </div>
    );
};

export default StockOverviewPage;
