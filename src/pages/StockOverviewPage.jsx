import React from "react";
import Autocomplete from "../components/Autocomplete";
import StockList from "../components/Stocklist";

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
