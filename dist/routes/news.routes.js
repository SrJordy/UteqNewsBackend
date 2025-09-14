"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const news_controller_1 = require("../controllers/news.controller");
const newsRoutes = async (server) => {
    server.get('/latest', news_controller_1.handleGetLatestNews);
    server.get('/all', news_controller_1.handleGetAllNews);
    server.get('/filtered/:email', news_controller_1.handleGetFilteredNews);
};
exports.default = newsRoutes;
