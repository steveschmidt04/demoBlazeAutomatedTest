import { Selector, t } from 'testcafe';
import {homePage} from "../pageObjects/homePage";
import {aboutUsModal} from "../pageObjects/aboutUsModal"

let ap = new aboutUsModal
let hp = new homePage;

fixture `About Us`
    .page`https://www.demoblaze.com/`
    .before(async t => {
    })
    .beforeEach(async t => {
        await t.setTestSpeed(1);
    })
    .after(async t => {
    })
    .afterEach(async t => {
    })
    test.timeouts({
        pageLoadTimeout:    2000,
        pageRequestTimeout: 60000,
        ajaxRequestTimeout: 60000
    })
    
    test(`Verify About Us modal displayed and closed properly if user toggles navigation from homepage header`, async t => {       
        await t.click(hp.headerAbout)
               .expect(ap.modalTitle.innerText).contains('About us')
               .click(ap.xBtn)
               .expect(ap.video.visible).notOk()

        await t.click(hp.headerAbout)
               .expect(ap.modalTitle.innerText).contains('About us')
               .click(ap.closeBtn)
               .expect(ap.video.visible).notOk()
    })

    test(`Verify About us video plays if user click on video player on About us modal`, async t => {  
        await t.click(hp.headerAbout)
               .click(ap.video);
        
      //To Do: Validate Video plays
      })

