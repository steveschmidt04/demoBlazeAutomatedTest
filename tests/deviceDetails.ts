import {Selector, t} from 'testcafe'
import {homePage} from "../pageObjects/homePage";
import {loginModal} from "../pageObjects/loginModal"
import {signUpModal} from "../pageObjects/signUpModal"
import {productPage} from "../pageObjects/productPage"
import { getHomePageItems, login } from '../helpers/functions';

let sp = new signUpModal
let lp = new loginModal
let hp = new homePage;
let pp = new productPage;

const dataSet = require('../helpers/data.json');

fixture `Device Details`
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
    
dataSet.forEach(async data =>{ 
test(`Verify phone information for ${data.name} populated correctly on homepage if user selects phone from left menu`, async t => {    
    //Validate contents of phone card on homepage
    if (data.type == 'Phone'){
        let devices = await getHomePageItems();
        for (let i=0; i < devices.length; i++){
            if (await devices[i] == data.name){
                await t.expect(Selector('#tbodyid').child('div').nth(i).child('div').child('div').child('.card-title').innerText).contains(data.name);
                await t.expect(Selector('#tbodyid').child('div').nth(i).child('div').child('div').child('h5').innerText).contains(data.price);
                await t.expect(Selector('#tbodyid').child('div').nth(i).child('div').child('div').child('#article').innerText).contains(data.desc);
    }; 
    };   
    }
    //Validate contents of laptop card on homepage
    else if (data.type == 'Laptop'){
        await t.click(hp.laptops);    
        let devices = await getHomePageItems();
        for (let i=0; i < devices.length; i++){
            if (await devices[i] == data.name){
                await t.expect(Selector('#tbodyid').child('div').nth(i).child('div').child('div').child('.card-title').innerText).contains(data.name);
                await t.expect(Selector('#tbodyid').child('div').nth(i).child('div').child('div').child('h5').innerText).contains(data.price);
                await t.expect(Selector('#tbodyid').child('div').nth(i).child('div').child('div').child('#article').innerText).contains(data.desc);
    }; 
    };   
    }
     //Validate contents of laptop card on homepage
    else if (data.type == 'Monitor'){
        await t.click(hp.monitors);    
        let devices = await getHomePageItems();
        for (let i=0; i < devices.length; i++){
            if (await devices[i] == data.name){
                await t.expect(Selector('#tbodyid').child('div').nth(i).child('div').child('div').child('.card-title').innerText).contains(data.name);
                await t.expect(Selector('#tbodyid').child('div').nth(i).child('div').child('div').child('h5').innerText).contains(data.price);
                await t.expect(Selector('#tbodyid').child('div').nth(i).child('div').child('div').child('#article').innerText).contains(data.desc);
    }; 
    };   
    }
    })
})
