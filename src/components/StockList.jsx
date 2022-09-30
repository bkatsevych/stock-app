import React, { useContext, useEffect, useState } from "react";
import finnHub from "../api/finnHub";
import { BsFillCaretUpFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { WatchListContext } from "../context/watchListContext";
import { useNavigate } from "react-router-dom";

const StockList = () => {
    const [stock, setStock] = useState([]);
    const { watchList, deleteStock } = useContext(WatchListContext);
    const navigate = useNavigate();

    const changeColor = (change) => {
        return change > 0 ? "success" : "danger";
    };

    const renderIcon = (change) => {
        return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
    };

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    watchList.map((stock) => {
                        return finnHub.get("/quote", {
                            params: {
                                symbol: stock,
                            },
                        });
                    })
                );

                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol,
                    };
                });

                if (isMounted) {
                    setStock(data);
                }
            } catch (e) {}
        };
        fetchData();

        return () => (isMounted = false);
    }, [watchList]);

    const handleStockSelect = (symbol) => {
        navigate(`detail/${symbol}`);
    };

    return (
        <>
            <table className="table hover mt-5">
                <thead style={{ color: "rgb(79, 89, 102)" }}>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Last</th>
                        <th scope="col">Chg</th>
                        <th scope="col">Chg%</th>
                        <th scope="col">High</th>
                        <th scope="col">Low</th>
                        <th scope="col">Open</th>
                        <th scope="col">Pclose</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map((stockData) => {
                        return (
                            <tr
                                key={stockData.symbol}
                                onClick={() =>
                                    handleStockSelect(stockData.symbol)
                                }
                                className="table-row"
                                style={{ cursor: "pointer" }}
                            >
                                <th scope="row">{stockData.symbol}</th>
                                <td>{stockData.data.c}</td>
                                <td
                                    className={`text-${changeColor(
                                        stockData.data.d
                                    )}`}
                                >
                                    {stockData.data.d}{" "}
                                    {renderIcon(stockData.data.d)}
                                </td>
                                <td
                                    className={`text-${changeColor(
                                        stockData.data.dp
                                    )}`}
                                >
                                    {stockData.data.dp}
                                    {renderIcon(stockData.data.dp)}
                                </td>
                                <td>{stockData.data.h}</td>
                                <td>{stockData.data.l}</td>
                                <td>{stockData.data.o}</td>
                                <td>
                                    {stockData.data.pc}{" "}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteStock(stockData.symbol);
                                        }}
                                        className="btn btn-danger btn-sm ml-3 d-inline-block delete-button"
                                    >
                                        Remove from list
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default StockList;
