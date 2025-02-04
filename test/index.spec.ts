import * as assert from "assert";
import { compareProducts, Product, productInArr } from "../src";
import { diffArrs, diffVariantArr, filterProducts } from "../src/diff";

const variants = [
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
        "available": false,
        "price": "194.96",
        "grams": 3175,
        "compare_at_price": "259.95",
        "position": 1,
        "product_id": 12345,
        "created_at": "2018-11-06T12:20:45-05:00",
        "updated_at": "2020-05-15T07:37:35-04:00",
    },
];

const basic1: Product = {
    "id": 1,
    "title": "Unreal Item",
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
        variants[0]
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
    "company_url": "http://www.blah.com/"
};

const basic2: Product = {
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
        variants[1]
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
    "company_url": "http://www.bloo.com/"
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

    describe("Diffing variants", () => {
        it("Should work with restocks", () => {
            assert.deepEqual(diffVariantArr([variants[1]], [variants[0]]), [{type: "restock", variant: variants[0]}]);
        });
        it("Should work with removals", () => {
            assert.deepEqual(diffVariantArr([variants[0]], [variants[1]]), [{type: "sellout", variant: variants[1]}]);
        });
        it("Should work with nothing", () => {
            assert.deepEqual(diffVariantArr([variants[0]], [variants[0]]), []);
        });
    });

    describe("Diffing products", () => {
        it("Should work with sellouts", () => {
            assert.deepEqual(diffArrs([basic1], [basic2]), [{type: "sellout", variant: variants[1], parent: basic2}]);
        });
        it("Should work with restocks", () => {
            assert.deepEqual(diffArrs([basic2], [basic1]), [{type: "restock", variant: variants[0], parent: basic1}]);
        });
        it("Should work with nothing", () => {
            assert.deepEqual(diffArrs([basic2], [basic2]), []);
        });
    });
	
    describe("Filtering product arrays", () => {
	it("Should not filter out common words", () => {
	    console.log(filterProducts);
	    assert.deepEqual(filterProducts([basic1, basic2], ["item"]), [basic1, basic2]);
	});
	it("Should filter out unique words", () => {
	    assert.deepEqual(filterProducts([basic1, basic2], ["unreal"]), [basic1]);
	});
	it("Should work with multiple words", () => {
	    assert.deepEqual(filterProducts([basic1, basic2], ["unreal", "fake"]), [basic1, basic2]);
	});
	it("Should work with tags", () => {
	    assert.deepEqual(filterProducts([basic1, basic2], ["category-fake"]), [basic1, basic2]);
	});
    });
});
