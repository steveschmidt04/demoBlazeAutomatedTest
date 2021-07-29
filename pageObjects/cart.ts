import { Selector } from "testcafe";

export class cart {
  shoppingCartItem: Selector;
  total: Selector;
  placeOrderBtn: Selector;
  firstDeleteBtn: Selector;

  constructor() {
    this.shoppingCartItem = Selector(".success");
    this.total = Selector("#totalp");
    this.placeOrderBtn = Selector(".btn.btn-success");
    this.firstDeleteBtn = Selector(".success").nth(0).child("td").nth(3).child("a")
  }
}
