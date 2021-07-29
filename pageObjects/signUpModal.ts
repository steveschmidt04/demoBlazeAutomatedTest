import { Selector } from "testcafe";

export class signUpModal {
  modalTitle: Selector;
  userName: Selector;
  password: Selector;
  signUpBtn: Selector;
  closeBtn: Selector;
  xBtn: Selector;

  constructor() {
    this.modalTitle = Selector("#signInModal")
      .child(".modal-dialog")
      .child(".modal-content")
      .child(".modal-header")
      .child(".modal-title");
    this.userName = Selector("#sign-username");
    this.password = Selector("#sign-password");
    this.signUpBtn = Selector("#signInModal")
      .child(".modal-dialog")
      .child(".modal-content")
      .child(".modal-footer")
      .child(".btn-primary");
    this.closeBtn = Selector("#signInModal")
      .child(".modal-dialog")
      .child(".modal-content")
      .child(".modal-footer")
      .child(".btn-secondary");
    this.xBtn = Selector("#signInModal")
      .child(".modal-dialog")
      .child(".modal-content")
      .child(".modal-header")
      .child(".close");
  }
}
