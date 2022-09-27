import axios from "axios";

const TOKEN = "ccoq0cqad3i91ts898r0ccoq0cqad3i91ts898rg";

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN,
    },
});
