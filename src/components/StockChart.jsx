import React, { useState } from "react";
import Chart from "react-apexcharts";

const StockChart = ({ chartData, symbol }) => {
    const [dateFormat, setDateFormat] = useState("24h");
    const { day, week, year } = chartData;

    const determineTimeFormat = () => {
        switch (dateFormat) {
            case "24h":
                return day;
            case "7d":
                return week;
            case "1y":
                return year;
            default:
                return day;
        }
    };

    const color =
        determineTimeFormat()[determineTimeFormat().length - 1].y -
            determineTimeFormat()[0].y >
        0
            ? "#26c281"
            : "#ed3419";

    const options = {
        colors: [color],
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px",
            },
        },
        chart: {
            id: "stock data",
            animations: {
                speed: 1300,
            },
        },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false,
            },
        },
        tooltip: {
            x: {
                format: "MMM dd HH:MM",
            },
        },
    };

    const series = [
        {
            name: symbol,
            data: determineTimeFormat(),
        },
    ];

    const renderBtnSelect = (button) => {
        const classes = "btn m-1 ";
        if (button === dateFormat) {
            return classes + "btn-primary";
        } else {
            return classes + "btn-outline-primary";
        }
    };

    return (
        <div className="p-4 shadow-sm bg-white">
            <Chart options={options} series={series} type="area" width="100%" />
            <div>
                <button
                    onClick={() => setDateFormat("24h")}
                    className={renderBtnSelect("24h")}
                >
                    24h
                </button>
                <button
                    onClick={() => setDateFormat("7d")}
                    className={renderBtnSelect("7d")}
                >
                    7d
                </button>
                <button
                    onClick={() => setDateFormat("1y")}
                    className={renderBtnSelect("1y")}
                >
                    1y
                </button>
            </div>
        </div>
    );
};

export default StockChart;
