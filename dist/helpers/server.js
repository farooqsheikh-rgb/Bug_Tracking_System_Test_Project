"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const createServer = () => {
    const app = (0, express_1.default)();
    app.disable("x-powered-by");
    app.use((0, morgan_1.default)("dev"));
    app.use(express_1.default.urlencoded());
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.get("/health", (req, res) => {
        res.json({ ok: true });
    });
    return app;
};
exports.createServer = createServer;
//# sourceMappingURL=server.js.map