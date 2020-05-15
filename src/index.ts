interface Product {
    id: number,
    title: string,
    handle: string,
    body_html: string,
    published_at: string,
    created_at: string,
    updated_at: string,
    vendor: string,
    product_type: string,
    tags: Array<string>,
    variants: Array<Variant>
}

interface Variant {
    "id": number,
    "title": string,
    "option1": string | null,
    "option2": string | null,
    "option3": string | null,
    "sku": string,
    "requires_shipping": boolean,
    "taxable": boolean,
    "featured_image": string | null,
    "available": boolean,
    "price": string,
    "grams": number,
    "compare_at_price": string | null,
    "position": number,
    "product_id": number,
    "created_at": string,
    "updated_at": string
}

const compareVariants = (oldVariant: Variant, newVariant: Variant): boolean => {
    for (const i in oldVariant) {
        if (oldVariant[i] !== newVariant[i]) {
            return false;
        }
    }
    return true;
};

const compareVariantArr = (arr1: Variant[], arr2: Variant[]): boolean => {
    for (const i in arr1) {
        if (!compareVariants(arr1[i], arr2[i])) {
            return false;
        }
    }
    return true;
};

const compareTags = (arr1: string[], arr2: string[]): boolean => {
    for (const i in arr1) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
};

const compareProducts = (oldProduct: Product, newProduct: Product) => {
    for (const i in oldProduct) {
        switch (i) {
            case "tags":
                if (!compareTags(oldProduct[i], newProduct[i])) {
                    return false;
                }
                break;
            case "variants":
                if (!compareVariantArr(oldProduct[i], newProduct[i])) {
                    return false;
                }
                break;
            default:
                if (oldProduct[i] !== newProduct[i]) {
                    return false;
                }
        }
    }
    return true;
};

const productInArr = (product: Product, arr: Product[]): boolean => {
    return arr.filter(l => compareProducts(product, l)).length !== 0;
};
