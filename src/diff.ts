import { compareVariants, Product, Variant } from "./index";
import axios from "axios";
import * as fs from "fs";
import extractSiteNameFromUrl from "./url";
const httpsProxyAgent = require("https-proxy-agent");

interface Diff {
    type: "restock" | "sellout",
    parent: Product,
    variant: Variant,
    sizes: string[]
}

const proxies = 
`51.81.113.251:33128:Ghd897!a305:h1XuOfyf
51.81.113.246:33128:Ghd897!a89:h1XuOfyf
51.81.113.243:33128:Ghd897!a227:h1XuOfyf
51.81.113.242:33128:Ghd897!a90:h1XuOfyf
51.81.97.116:33128:Ghd897!a454:h1XuOfyf
51.81.97.123:33128:Ghd897!a487:h1XuOfyf
51.81.97.118:33128:Ghd897!a52:h1XuOfyf
51.81.113.251:33128:Ghd897!a324:h1XuOfyf`.split("\n");

const proxyToUrl = (proxy: string) => {
    const splitProxy = proxy.split(":");
    const reorganizedProxy = [[splitProxy[2], splitProxy[3]], [splitProxy[0], splitProxy[1]]];
    const joinedProxy = reorganizedProxy.map(l => l.join(":")).join("@");
    return `http://${joinedProxy}`;
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
    console.log(arr1.length, arr2.length);
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

const compareData = (header: string, url: string, filters: string[]): Promise<Diff[]> => {
    const extractedUrl = `${header}/${extractSiteNameFromUrl(url)}.json`;
    const randomProxy = proxyToUrl(proxies[Math.floor(Math.random() * proxies.length)]);
    console.log(`Proxy: ${randomProxy}`);
    const agent = new httpsProxyAgent(randomProxy);
    return new Promise(async (resolve, reject) => {
        try {
            await axios({
                method: "GET",
	        httpsAgent: agent,
                url: `${url}products.json?limit=999999999`,
            });
        } catch {
            console.log(`Something went wrong with getting products.json! The url was ${url}`);
            reject([]);
        }
        const urlData: any = await axios({
            method: "GET",
	    httpsAgent: agent,
            url: `${url}products.json?limit=999999999`,
        });
		    const filteredUrlData = filters.length === 0 ? urlData.data.products : filterProducts(urlData.data.products, filters);
        const parsedUrlData: Product[] = filteredUrlData.sort((a, b) => a.id - b.id).map(l => ({...l, company_url: url}));
        if (fs.existsSync(extractedUrl)) {
            fs.readFile(extractedUrl, "utf-8", (err, data) => {
                if (err) throw err;
                try {
                    const parsedData = JSON.parse(data);
                    const parsedOldData = parsedData.sort((a, b) => a.id - b.id).map(l => ({...l, company_url: url}));
                    if (checkRewrite(parsedOldData, filteredUrlData)) {
                        fs.writeFile(extractedUrl, JSON.stringify(filteredUrlData, null, 4), (err) => {
			    console.log("diff lengths");
                            if (err) throw err;
                        });
                        resolve([]);
                    }
                    const diffs = diffArrs(parsedOldData, parsedUrlData);
                    fs.writeFile(extractedUrl, JSON.stringify(filteredUrlData, null, 4), (err) => {
                        if (err) throw err;
                    });
                    resolve(diffs);
                } catch (e) {
                    console.log("We errored");
                    console.error(e);
                    fs.writeFile(extractedUrl, JSON.stringify(filteredUrlData, null, 4), (err) => {
                        if (err) throw err;
                    });
                    reject([]);
                }
            });
        } else {
            console.log("nonexistent");
            fs.writeFile(extractedUrl, JSON.stringify(filteredUrlData, null, 4), (err) => {
                if (err) throw err;
            });
        }
    });
};

export const filterProducts = (products: Product[], filters: string[]) => {
    return products.filter(l => l.title.split(" ").some(j => filters.map(l => l.toLowerCase()).includes(j.toLowerCase())) || l.tags.some(j => filters.includes(j)));
}

export { diffArrs, diffVariantArr, compareData, Diff };
