import {Selector, t} from 'testcafe'
import {homePage} from "../pageObjects/homePage";
import {loginModal} from "../pageObjects/loginModal"
import {signUpModal} from "../pageObjects/signUpModal"
import {productPage} from "../pageObjects/productPage"
import {cart} from "../pageObjects/cart"
import {calculateCartTotal, login, getHomePageItems, clearShoppingCart} from  '../helpers/functions';

let sp = new signUpModal
let lp = new loginModal
let hp = new homePage;
let pp = new productPage;
let sc = new cart;

const dataSet = require('../helpers/shoppingData.json');

fixture `Shopping Cart`
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

    test(`Verify Device Added to shopping cart if user navigates to device details screen and clicks add to Cart button`, async t => {  
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

         //Validate Product added popup messages
         const dialogMsg = await t.getNativeDialogHistory();
         await t.expect(dialogMsg[0].text).eql('Product added.');
         await t.expect(dialogMsg[1].text).eql('Product added.');
         await t.expect(dialogMsg[2].text).eql('Product added.');

         //Verify number of items in the shopping cart matches number of items added
        await t.expect(sc.shoppingCartItem.count).eql(testDevices.length);

        //Validate total in cart matches total for items displayed for sum of items in cart
        let cartTotal = await calculateCartTotal();
        await t.expect(sc.total.innerText).eql(cartTotal.toString());
    })    


    test(`Verify Device removed from shopping cart if user adds item and then removes it`, async t => {  
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

     //Delete item from Cart
     await t.click(hp.headerCart)
     await t.click(Selector('.success').nth(1).child('td').nth(3).child('a'));
     
     //Validate that number of items in the cart decreased when item is deleted
     await t.expect(sc.shoppingCartItem.count).eql(testDevices.length - 1);

     //Validate total in cart matches total for items displayed for sum of items in cart
     let cartTotal = await calculateCartTotal();
     await t.expect(sc.total.innerText).eql(cartTotal.toString());
    })    

    test(`Verify items are saved in shopping cart if user logs in and logs out`, async t => {  
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

        //log out/log in and return to cart
        await t.click(hp.headerLogOut);
        await t.wait(3000);
        await t.click(hp.headerLogIn);
        await login('autouser1@gmail.com','password4qa!');
        await t.click(hp.headerCart);

        //Verify number of items in the shopping cart matches number of items added
       await t.expect(sc.shoppingCartItem.count).eql(testDevices.length);

       //Validate total in cart matches total for items displayed for sum of items in cart
       let cartTotal = await calculateCartTotal();
       await t.expect(sc.total.innerText).eql(cartTotal.toString());
    })

