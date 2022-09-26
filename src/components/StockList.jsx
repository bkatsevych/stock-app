import React, { useEffect, useState } from "react";
import finnHub from "../api/finnHub";

const StockList = () => {
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await finnHub.get(
                    "/quote?symbol=MSFT&token=ccoq0cqad3i91ts898r0ccoq0cqad3i91ts898rg"
                );
                console.log(response);
            } catch (e) {}
        };
        fetchData();
    }, []);

    return <div>I am the StockList</div>;
};

export default StockList;
