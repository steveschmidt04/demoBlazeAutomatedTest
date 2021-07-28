import {Selector} from 'testcafe'

export class cart{
  
    shoppingCartItem: Selector;
    total: Selector;
    placeOrderBtn: Selector;

    constructor(){
        this.shoppingCartItem = Selector('.success');
        this.total = Selector('#totalp');
        this.placeOrderBtn = Selector('.btn.btn-success')
    };
};
