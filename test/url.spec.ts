import * as assert from "assert";
import extractSiteNameFromUrl from "../src/url";

const urls = [
    "https://undefeated.com/",
    "https://www.addictmiami.com/",
    "https://www.abovethecloudsstore.com/",
    "https://www.jimmyjazz.com/",
    "https://kith.com/",
    "https://dope-factory.com/"
];

const filtered = [
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

const extracted = [
    "undefeated",
    "addictmiami",
    "abovethecloudsstore",
    "jimmyjazz",
    "kith",
    "dope-factory"
];

const filteredExtracted = [
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
    "travisscott",
];

describe("URL stripper test suite", () => {
    it("Should strip data for every site", () => {
        for (const i in urls) {
            assert.equal(extractSiteNameFromUrl(urls[i]), extracted[i]);
        }
    });
    it("Should strip data for filtered sites", () => {
        for (const i in filtered) {
            assert.equal(extractSiteNameFromUrl(filtered[i]), filteredExtracted[i]);
        }
    });
});
