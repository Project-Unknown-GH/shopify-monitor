interface Product {
    id: number,
    title: string,
    handle: string,
    body_html: string,
    published_at: string,
    created_at: string,
    updated_at: string,
    vendor: string,
    company_url: string
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
    return oldVariant.available !== newVariant.available;
};

const compareProducts = (oldProduct: Product, newProduct: Product): boolean => {
    return oldProduct.id === newProduct.id;
};

const productInArr = (product: Product, arr: Product[]): boolean => {
    return !!arr.find(l => compareProducts(l, product));
};

export { Variant, Product, productInArr, compareProducts, compareVariants }
