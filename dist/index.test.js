"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const vitest_1 = require("vitest");
(0, vitest_1.it)("locate node", () => {
    const location = "body > div:nth-of-type(4) > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(1) > h1 > a";
    (0, index_1.locateNode)();
});
