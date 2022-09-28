import React, { useEffect, useState } from "react";
import finnHub from "../api/finnHub";

const Autocomplete = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const renderDropdown = () => {
        const dropDownClass = search ? "show" : null;
        return (
            <ul
                style={{
                    height: "500px",
                    width: "100%",
                    overflowY: "scroll",
                    overflowX: "hidden",
                    cursor: "pointer",
                }}
                className={`dropdown-menu ${dropDownClass}`}
            >
                {results.map((result) => {
                    return (
                        <li key={result.symbol} className="dropdown-item">
                            {result.description} ({result.symbol})
                        </li>
                    );
                })}
            </ul>
        );
    };

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await finnHub.get("/search", {
                    params: {
                        q: search,
                    },
                });

                setResults(response.data.result);
            } catch (e) {}
        };

        if (search.length > 0) {
            fetchData();
        } else {
            setResults([]);
        }
        return () => (isMounted = false);
    }, [search]);

    return (
        <div className="w-50 p-5 rounded mx-auto">
            <div className="form-floating dropdown">
                <input
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    autoComplete="off"
                    style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }}
                />
                <label htmlFor="search">Search</label>
                {renderDropdown()}
            </div>
        </div>
    );
};

export default Autocomplete;
