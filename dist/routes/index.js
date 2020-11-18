"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import transactionsRouter from "./transaction.routes";
var appointments_routes_1 = __importDefault(require("./appointments.routes"));
var session_routes_1 = __importDefault(require("./session.routes"));
var users_routes_1 = __importDefault(require("./users.routes"));
var routes = express_1.Router();
routes.use("/appointments", appointments_routes_1.default);
routes.use("/users", users_routes_1.default);
routes.use("/session", session_routes_1.default);
// routes.use("/transactions", transactionsRouter);
exports.default = routes;
