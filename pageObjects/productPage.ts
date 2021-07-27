import {Selector} from 'testcafe'

export class productPage{
   
    //header elements
    productName: Selector;
    productPrice: Selector;
    productDesc: Selector;
    
    constructor(){
        this.productName = Selector('.name');
        this.productPrice = Selector('.price-container');
        this.productDesc = Selector('#more-information')
    };
};
