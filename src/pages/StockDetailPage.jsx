import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../api/finnHub";

const StockDetailPage = () => {
    const { symbol } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date();
            const currentTime = Math.floor(date.getTime() / 1000);
            let oneDay;

            if (date.getDate === 6) {
                oneDay = currentTime - 2 * 24 * 60 * 60;
            } else if (date.getDate === 0) {
                oneDay = currentTime - 3 * 24 * 60 * 60;
            } else {
                oneDay = currentTime - 24 * 60 * 60;
            }
            const oneWeek = currentTime - 7 * 24 * 60 * 60;
            const oneYear = currentTime - 365 * 24 * 60 * 60;

            try {
                const responses = await Promise.all([
                    finnHub.get("/stock/candle", {
                        params: {
                            symbol,
                            from: oneDay,
                            to: currentTime,
                            resolution: 30,
                        },
                    }),
                    finnHub.get("/stock/candle", {
                        params: {
                            symbol,
                            from: oneWeek,
                            to: currentTime,
                            resolution: 60,
                        },
                    }),
                    finnHub.get("/stock/candle", {
                        params: {
                            symbol,
                            from: oneYear,
                            to: currentTime,
                            resolution: "W",
                        },
                    }),
                ]);
                console.log(responses);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return <div>I am a StockDetailPage {symbol} </div>;
};

export default StockDetailPage;
