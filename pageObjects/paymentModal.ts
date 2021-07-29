import { Selector } from "testcafe";

export class paymentModal {
  name: Selector;
  country: Selector;
  city: Selector;
  card: Selector;
  month: Selector;
  year: Selector;
  purchaseBtn: Selector;
  closeBtn: Selector;
  xBtn: Selector;
  modalTitle: Selector;
  totalAmt: Selector;

  constructor() {
    this.name = Selector("#name");
    this.country = Selector("#country");
    this.city = Selector("#city");
    this.card = Selector("#card");
    this.month = Selector("#month");
    this.year = Selector("#year");
    this.modalTitle = Selector("#orderModal")
      .child(".modal-dialog")
      .child(".modal-content")
      .child(".modal-header")
      .child(".modal-title");
    this.purchaseBtn = Selector("#orderModal")
      .child(".modal-dialog")
      .child(".modal-content")
      .child(".modal-footer")
      .child(".btn-primary");
    this.closeBtn = Selector("#orderModal")
      .child(".modal-dialog")
      .child(".modal-content")
      .child(".modal-footer")
      .child(".btn-secondary");
    this.xBtn = Selector("#orderModal")
      .child(".modal-dialog")
      .child(".modal-content")
      .child(".modal-header")
      .child(".close");
    this.totalAmt = Selector("#totalm");
  }
}
