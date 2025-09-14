"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNews = exports.getAllNews = void 0;
// src/services/newsService.ts
const prisma_1 = __importDefault(require("../lib/prisma"));
const getAllNews = async () => {
    return await prisma_1.default.news.findMany();
};
exports.getAllNews = getAllNews;
const createNews = async (data) => {
    return await prisma_1.default.news.create({
        data,
    });
};
exports.createNews = createNews;
