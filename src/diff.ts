import { Product, productInArr } from "./index";
import axios from "axios";
import * as fs from "fs";

interface Diff {
    type: "add" | "remove",
    val: Product
}


const diffArrs = (arr1: Product[], arr2: Product[]): Diff[] => {
    console.log(`Diffing ${arr1.length} and ${arr2.length}`);
    const diffs: Diff[] = [];
    for (const item of arr1) {
        if (!productInArr(item, arr2)) {
            diffs.push({
                type: "remove",
                val: item,
            });
        }
    }
    for (const item of arr2) {
        if (!productInArr(item, arr1)) {
            diffs.push({
                type: "add",
                val: item,
            });
        }
    }
    console.log(`Diffs length: ${diffs.length}`);
    return diffs;
};

const compareData = (url: string): Promise<Diff[]> => {
    return new Promise (async (resolve, reject) => {
        console.log(`Requesting: ${url}products.json`);
        const urlData: any = await axios.get(`${url}products.json?limit=99999`);
        const parsedUrlData = urlData.data.products;
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
            const parsedOldData = JSON.parse(data).products;
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

export { diffArrs }
