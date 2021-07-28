import {Selector} from 'testcafe'

export class productPage{
   
    //header elements
    productName: Selector;
    productPrice: Selector;
    productDesc: Selector;
    addToCart: Selector;
    
    constructor(){
        this.productName = Selector('.name');
        this.productPrice = Selector('.price-container');
        this.productDesc = Selector('#more-information');
        this.addToCart = Selector('.btn').withText("Add to cart");
    };
};
