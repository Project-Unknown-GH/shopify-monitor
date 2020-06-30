"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var url_1 = require("../src/url");
var urls = [
    "https://undefeated.com/",
    "https://www.addictmiami.com/",
    "https://www.abovethecloudsstore.com/",
    "https://www.jimmyjazz.com/",
    "https://kith.com/",
    "https://dope-factory.com/"
];
var filtered = [
    "https://kith.com/collections/mens-footwear/",
    "https://undefeated.com/collections/mens-footwear/",
    "https://www.addictmiami.com/collections/latest-products/",
    "https://www.abovethecloudsstore.com/collections/footwear/",
    "https://www.jimmyjazz.com/collections/footwear/",
    "https://www.patta.nl/collections/footwear/",
    "https://deviceone.gr/collections/sneakers/",
    "https://www.courtsidesneakers.com/collections/sneakers/",
    "https://shopnicekicks.com/collections/mens-kicks/",
    "https://www.blendsus.com/collections/mens-footwear/",
    "https://shop.travisscott.com/",
];
var extracted = [
    "undefeated",
    "addictmiami",
    "abovethecloudsstore",
    "jimmyjazz",
    "kith",
    "dope-factory"
];
var filteredExtracted = [
    "kith",
    "undefeated",
    "addictmiami",
    "abovethecloudsstore",
    "jimmyjazz",
    "patta",
    "deviceone",
    "courtsidesneakers",
    "shopnicekicks",
    "blendsus",
    "shop",
];
describe("URL stripper test suite", function () {
    it("Should strip data for every site", function () {
        for (var i in urls) {
            assert.equal(url_1.default(urls[i]), extracted[i]);
        }
    });
    it("Should strip data for filtered sites", function () {
        for (var i in filtered) {
            assert.equal(url_1.default(filtered[i]), filteredExtracted[i]);
        }
    });
});
//# sourceMappingURL=url.spec.js.map