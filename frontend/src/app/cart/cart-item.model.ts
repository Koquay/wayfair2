import { ProductModel } from "../product/product.model";

export class CartItem {
    constructor(public product:ProductModel, public quantity:number){}
 }