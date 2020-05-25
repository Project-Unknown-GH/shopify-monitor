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

const extracted = [
    "undefeated",
    "addictmiami",
    "abovethecloudsstore",
    "jimmyjazz",
    "kith",
    "dope-factory"
];

describe("URL stripper test suite", () => {
    it("Should strip data for every site", () => {
        for (const i in urls) {
            assert.equal(extractSiteNameFromUrl(urls[i]), extracted[i]);
        }
    });
});
