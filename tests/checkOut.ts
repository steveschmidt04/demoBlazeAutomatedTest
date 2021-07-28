import {Selector, t} from 'testcafe'
import { login, getHomePageItems, clearShoppingCart, calculateCartTotal } from '../helpers/functions';
import { cart } from '../pageObjects/cart';
import {homePage} from "../pageObjects/homePage";
import {loginModal} from "../pageObjects/loginModal"
import { paymentModal } from '../pageObjects/paymentModal';
import { productPage } from '../pageObjects/productPage';

let lp = new loginModal;
let hp = new homePage;
let co = new paymentModal;
let pp = new productPage;
let sc = new cart;

const dataSet = require('../helpers/shoppingData.json');

fixture `Log In`
    .page`https://www.demoblaze.com/`
    .before(async t => {
    })
    .beforeEach(async t => {
        await t.setTestSpeed(1);
        await t.click(hp.headerLogIn);
        await login('autouser1@gmail.com','password4qa!')
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
    
    test(`Verify Payment Model displayed and closed properly if user toggles navigation to it`, async t => {       
        await t.click(hp.headerCart)
                .click(sc.placeOrderBtn)
                .expect(co.modalTitle.innerText).contains('Place order')
                .click(co.xBtn)
                .expect(co.modalTitle.visible).notOk();
         await t.click(sc.placeOrderBtn)
                .expect(co.modalTitle.innerText).contains('Place order')
                .click(co.closeBtn)
                .expect(co.modalTitle.visible).notOk();
  
    })

    test(`Verify Required fields validated on Checkout Modal if user attempts to submit playment with incomplete information`, async t => {
        await t.click(hp.headerCart)
            .click(sc.placeOrderBtn)
            .setNativeDialogHandler(() => true)
            .click(co.purchaseBtn)
            .typeText(co.name, "Test User", { paste: true })
            .click(co.purchaseBtn)
            .click(co.name).pressKey('ctrl+a delete')
            .typeText(co.card, "4111111111111111", { paste: true })
            .click(co.purchaseBtn)
            .click(co.card).pressKey('ctrl+a delete')
            .typeText(co.country, "USA", { paste: true })
            .typeText(co.city, "New York", { paste: true })
            .typeText(co.month, "01", { paste: true })
            .typeText(co.year, "2021", { paste: true })
            .click(co.purchaseBtn)

        const dialogMsg = await t.getNativeDialogHistory();
        await t.expect(dialogMsg[0].text).eql('Please fill out Name and Creditcard.');
        await t.expect(dialogMsg[1].text).eql('Please fill out Name and Creditcard.');
        await t.expect(dialogMsg[2].text).eql('Please fill out Name and Creditcard.');
        await t.expect(dialogMsg[2].text).eql('Please fill out Name and Creditcard.');
      })

test(`Verify Payment able to be complete successfully if user adds items to cart and completes checkout process`, async t => {
    await clearShoppingCart()
        let testDevices = new Array()
        //Grab test devices from shopping data json file
        var i = 0;
        await dataSet.forEach(async data =>{ 
            testDevices[i] = data.name;
            i++;
        }) 

    let devices = await getHomePageItems();
        //Iterate through array of selectors to find matching device
       for (var j=0; j < testDevices.length; j++){
        for (var k=0; k < devices.length; k++){
            if (await devices[k] == testDevices[j]){
                await t.click(Selector('#tbodyid').child('div').nth(k).child('div').child('div').child('.card-title').child('a'))
                break
            }
        }   
        await t.setNativeDialogHandler(() => true)
                        .click(pp.addToCart)
                        .click(hp.headerHome);
        }
         await t.click(hp.headerCart)
     
        //Validate total in cart matches total for items displayed for sum of items in cart
        let cartTotal = await calculateCartTotal();
        await t.expect(sc.total.innerText).eql(cartTotal.toString());
        await t.click(sc.placeOrderBtn);

        //Validate total displayed on Modal
        await t.expect(await co.totalAmt.innerText).contains(cartTotal.toString());

        //Enter Form data and submit
        await t.typeText(co.name, "Test User", { paste: true })
            .typeText(co.country, "USA", { paste: true })
            .typeText(co.city, "New York", { paste: true })
            .typeText(co.card, "4111111111111111", { paste: true })
            .typeText(co.month, "01", { paste: true })
            .typeText(co.year, "2021", { paste: true })
            .setNativeDialogHandler(() => true)
            .click(co.purchaseBtn)

            //Verify confirmation dialog
            const dialogMsg = await t.getNativeDialogHistory();
            await t.expect(dialogMsg[0].text).eql('Product added.');
        
    })  
