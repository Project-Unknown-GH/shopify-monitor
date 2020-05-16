import * as assert from "assert";
import { compareProducts, productInArr } from "../src";
import { diffArrs } from "../src/diff";

const basic1 = {
    "id": 1,
    "title": "Fake Item",
    "handle": "fake-item",
    "body_html": "<strong>My fake item!</strong>",
    "published_at": "2020-02-25T11:37:46-05:00",
    "created_at": "2018-11-06T12:20:44-05:00",
    "updated_at": "2020-05-15T07:40:17-04:00",
    "vendor": "FakeSite",
    "product_type": "Standard",
    "tags": [
        "category-fake",
    ],
    "variants": [
        {
            "id": 2,
            "title": "Default Title",
            "option1": "Default Title",
            "option2": null,
            "option3": null,
            "sku": "CSX2006",
            "requires_shipping": true,
            "taxable": true,
            "featured_image": null,
            "available": true,
            "price": "194.96",
            "grams": 3175,
            "compare_at_price": "259.95",
            "position": 1,
            "product_id": 12345,
            "created_at": "2018-11-06T12:20:45-05:00",
            "updated_at": "2020-05-15T07:37:35-04:00",
        },
    ],
    "images": [
        {
            "id": 4085725200483,
            "created_at": "2018-11-09T11:16:36-05:00",
            "position": 1,
            "updated_at": "2020-03-04T16:03:25-05:00",
            "product_id": 1452026265699,
            "variant_ids": [],
            "src": "https://cdn.shopify.com/s/files/1/0666/9741/products/CampStove2_Midnight_1.jpg?v=1583355805",
            "width": 1200,
            "height": 1200,
        },
    ],
    "options": [
        {
            "name": "Title",
            "position": 1,
            "values": [
                "Default Title",
            ]
        }
    ]
};

const basic2 = {
    "id": 2,
    "title": "Fake Item 2",
    "handle": "fake-item-2",
    "body_html": "<strong>My fake item 2!</strong>",
    "published_at": "2020-02-25T11:37:46-05:00",
    "created_at": "2018-11-06T12:20:44-05:00",
    "updated_at": "2020-05-15T07:40:17-04:00",
    "vendor": "FakeSite",
    "product_type": "Standard",
    "tags": [
        "category-fake",
    ],
    "variants": [
        {
            "id": 2,
            "title": "Default Title",
            "option1": "Default Title",
            "option2": null,
            "option3": null,
            "sku": "CSX2006",
            "requires_shipping": true,
            "taxable": true,
            "featured_image": null,
            "available": true,
            "price": "194.96",
            "grams": 3175,
            "compare_at_price": "259.95",
            "position": 1,
            "product_id": 12345,
            "created_at": "2018-11-06T12:20:45-05:00",
            "updated_at": "2020-05-15T07:37:35-04:00",
        },
    ],
    "images": [
        {
            "id": 4085725200483,
            "created_at": "2018-11-09T11:16:36-05:00",
            "position": 1,
            "updated_at": "2020-03-04T16:03:25-05:00",
            "product_id": 1452026265699,
            "variant_ids": [],
            "src": "https://cdn.shopify.com/s/files/1/0666/9741/products/CampStove2_Midnight_1.jpg?v=1583355805",
            "width": 1200,
            "height": 1200,
        },
    ],
    "options": [
        {
            "name": "Title",
            "position": 1,
            "values": [
                "Default Title",
            ]
        }
    ]
};

describe("Diff test suite", () => {
    describe("Comparisons", () => {
        it("Should test the compareProducts function for true", () => {
            assert.equal(compareProducts(basic1, basic1), true);
        });
        it("Should test the compareProducts function for false", () => {
            assert.equal(compareProducts(basic1, basic2), false);
        });
    });

    describe("Product in array", () => {
        it("Should return true", () => {
            assert.equal(productInArr(basic1, [basic1, basic2]), true);
        });
        it("Should return false", () => {
            assert.equal(productInArr(basic1, [basic2]), false);
        })
    });

    describe("Diffing arrays", () => {
        it("Should work with additions", () => {
            assert.deepEqual(diffArrs([basic2], [basic1, basic2]), [{type: "add", val: basic1}]);
        });
        it("Should work with removals", () => {
            assert.deepEqual(diffArrs([basic2, basic1], [basic1]), [{type: "remove", index: 0}]);
        });
    })
});
