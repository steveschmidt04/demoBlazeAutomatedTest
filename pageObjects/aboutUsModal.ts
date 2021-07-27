import {Selector} from 'testcafe'

export class aboutUsModal{

    modalTitle: Selector;
    closeBtn: Selector;
    xBtn: Selector;
    video: Selector

constructor(){
    this.modalTitle = Selector('#videoModal').child('.modal-dialog').child('.modal-content').child('.modal-header').child('.modal-title');
    this.closeBtn = Selector('#videoModal').child('.modal-dialog').child('.modal-content').child('.modal-footer').child('.btn-secondary')
    this.xBtn = Selector('#videoModal').child('.modal-dialog').child('.modal-content').child('.modal-header').child('.close')
    this.video = Selector('#example-video');
}
}