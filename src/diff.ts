import { compareVariants, Product, productInArr, Variant } from "./index";
import axios from "axios";
import * as fs from "fs";
import extractSiteNameFromUrl from "./url";

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
                    variant: arr2[i],
                });
            } else {
                diffs.push({
                    type: "sellout",
                    variant: arr2[i],
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
    const diffs: Diff[] = [];
    for (const i in arr1) {
        const variantDiffs = diffVariantArr(arr1[i].variants.sort((a, b) => a.id - b.id), arr2[i].variants.sort((a, b) => a.id - b.id));
        const fullDiffs: Diff[] = variantDiffs.map(l => ({...l, parent: arr2[i]}));
        diffs.push(...fullDiffs);
    }
    return diffs;
};

const compareData = (header: string, url: string): Promise<Diff[]> => {
    const extractedUrl = `${header}/${extractSiteNameFromUrl(url)}.json`;
    return new Promise(async (resolve, reject) => {
        try {
            const urlData: any = await axios.get(`${url}products.json?limit=999999999`);
        } catch {
            console.log("bitsdfauisdhf");
            reject([]);
        }
        const urlData: any = await axios.get(`${url}products.json?limit=999999999`);
        const parsedUrlData: Product[] = urlData.data.products.sort((a, b) => a.id - b.id).map(l => ({...l, company_url: url}));
        if (fs.existsSync(extractedUrl)) {
            fs.readFile(extractedUrl, "utf-8", (err, data) => {
                if (err) throw err;
                try {
                    const parsedData = JSON.parse(data);
                    const parsedOldData = parsedData.products.sort((a, b) => a.id - b.id).map(l => ({...l, company_url: url}));
                    if (checkRewrite(parsedOldData, parsedUrlData)) {
                        fs.writeFile(extractedUrl, JSON.stringify(urlData.data, null, 4), (err) => {
                            if (err) throw err;
                        });
                        resolve([]);
                    }
                    const diffs = diffArrs(parsedOldData, parsedUrlData);
                    fs.writeFile(extractedUrl, JSON.stringify(urlData.data, null, 4), (err) => {
                        if (err) throw err;
                    });
                    resolve(diffs);
                } catch (e) {
                    console.log("We errored");
                    console.error(e);
                    fs.writeFile(extractedUrl, JSON.stringify(urlData.data, null, 4), (err) => {
                        if (err) throw err;
                    });
                    reject([]);
                }
            });
        } else {
            console.log("nonexistent");
            fs.writeFile(extractedUrl, JSON.stringify(urlData.data, null, 4), (err) => {
                if (err) throw err;
            });
        }
    });
};

export { diffArrs, diffVariantArr, compareData, Diff };
