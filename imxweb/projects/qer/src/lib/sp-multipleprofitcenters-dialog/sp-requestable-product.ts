import { RequestableProduct } from '../shopping-cart/requestable-product.interface'

export interface SPRequestableProduct extends RequestableProduct {
    UidProfitCenter?: string;
}
