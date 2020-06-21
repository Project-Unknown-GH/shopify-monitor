import { compareVariants, Product, Variant } from "./index";
import axios from "axios";
import * as fs from "fs";
import extractSiteNameFromUrl from "./url";

interface Diff {
    type: "restock" | "sellout",
    parent: Product,
    variant: Variant,
    sizes: string[]
}

const diffVariantArr = (arr1: Variant[], arr2: Variant[]): Omit<Diff, "parent"> => {
    let diff: Omit<Diff, "parent"> = null;
    for (const i in arr1) {
        if (compareVariants(arr1[i], arr2[i])) {
            console.log("DIFFERENT LOL")
            if (diff === null) {
                diff = {
                    type: "restock",
                    variant: arr2[i],
                    sizes: [arr2[i].title]
                };
            } else {
                diff.sizes.push(arr2[i].title);
            }
        }
    }
    return diff;
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
        const variantDiff = diffVariantArr(arr1[i].variants.sort((a, b) => a.id - b.id), arr2[i].variants.sort((a, b) => a.id - b.id));
        if (variantDiff) {
            const fullDiff: Diff = {...variantDiff, parent: arr2[i]};
            diffs.push(fullDiff);
        }
    }
    // console.log(`Diff COUNT: `, diffs)
    return diffs;
};

const compareData = (header: string, url: string): Promise<Diff[]> => {
    const extractedUrl = `${header}/${extractSiteNameFromUrl(url)}.json`;
    return new Promise(async (resolve, reject) => {
        try {
            await axios({
                method: "GET",
                url: `${url}products.json?limit=999999999`,
            });
        } catch {
            console.log(`Something went wrong with getting products.json! The url was ${url}`);
            reject([]);
        }
        const urlData: any = await axios({
            method: "GET",
            url: `${url}products.json?limit=999999999`,
        });
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
