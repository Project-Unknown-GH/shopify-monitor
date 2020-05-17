import { compareVariants, Product, productInArr, Variant } from "./index";
import axios from "axios";
import * as fs from "fs";

interface Diff {
    type: "restock" | "sellout",
    parent: Product,
    variant: Variant
}

const diffVariantArr = (arr1: Variant[], arr2: Variant[]): Omit<Diff, "parent">[] => {
    const diffs: Omit<Diff, "parent">[] = [];
    for (const i in arr1) {
        if (compareVariants(arr1[i], arr2[i])) {
            if (arr2[i].available) {
                diffs.push({
                    type: "restock",
                    variant: arr2[i]
                });
            } else {
                diffs.push({
                    type: "sellout",
                    variant: arr2[i]
                });
            }
        }
    }
    return diffs;
};

const checkRewrite = (arr1: Product[], arr2: Product[]): boolean => {
    if (arr1.length !== arr2.length) {
        return true;
    }
    for (const i in arr1) {
        if (arr1[i].id !== arr2[i].id) {
            return true;
        }
    }
    return false;
};

const diffArrs = (arr1: Product[], arr2: Product[]): Diff[] => {
    // console.log(`Diffing ${arr1.length} and ${arr2.length}`);
    const diffs: Diff[] = [];
    for (const i in arr1) {
        const variantDiffs = diffVariantArr(arr1[i].variants.sort((a, b) => a.id - b.id), arr2[i].variants.sort((a, b) => a.id - b.id));
        const fullDiffs: Diff[] = variantDiffs.map(l => ({...l, parent: arr2[i]}));
        diffs.push(...fullDiffs);
    }
    return diffs;
};

const compareData = (url: string): Promise<Diff[]> => {
    return new Promise (async (resolve, reject) => {
        console.log(`Requesting: ${url}products.json`);
        const urlData: any = await axios.get(`${url}products.json?limit=99999`);
        const parsedUrlData = urlData.data.products.sort((a, b) => a.id - b.id);
        fs.readFile("products.json", "utf-8", (err, data) => {
            if (err) throw err;
            try {
                JSON.parse(data);
            } catch (e) {
                console.log("We errored");
                console.error(e);
                reject([]);
            }
            // console.log(`le data ${parsedUrlData}`);
            const parsedOldData = JSON.parse(data).products.sort((a, b) => a.id - b.id);
            if (checkRewrite(parsedOldData, parsedUrlData)) {
                fs.writeFile("products.json", JSON.stringify(urlData.data, null, 4), (err) => {if (err) throw err});
                resolve([]);
            }
            const diffs = diffArrs(parsedOldData, parsedUrlData);
            console.log(`Diffy lube, ${diffs}`);
            fs.writeFile("products.json", JSON.stringify(urlData.data, null, 4), (err) => {if (err) throw err});
            resolve(diffs);
        });
    });
};

const main = async () => {
    console.log("Result:");
    console.log("the end", (await compareData("https://www.ugmonk.com/")).length);
};

main();

export { diffArrs, diffVariantArr }
