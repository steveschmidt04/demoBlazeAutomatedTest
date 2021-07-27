import {Selector} from 'testcafe'

export class loginModal{
    modalTitle:Selector;
    userName:Selector;
    password:Selector;
    logInBtn: Selector;
    closeBtn: Selector;
    xBtn: Selector;

constructor(){
    this.modalTitle = Selector('#logInModal').child('.modal-dialog').child('.modal-content').child('.modal-header').child('.modal-title');
    this.userName = Selector('#loginusername');
    this.password = Selector('#loginpassword');
    this.logInBtn = Selector('#logInModal').child('.modal-dialog').child('.modal-content').child('.modal-footer').child('.btn-primary')
    this.closeBtn = Selector('#logInModal').child('.modal-dialog').child('.modal-content').child('.modal-footer').child('.btn-secondary')
    this.xBtn = Selector('#logInModal').child('.modal-dialog').child('.modal-content').child('.modal-header').child('.close')
}
}