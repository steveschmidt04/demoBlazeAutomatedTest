import {Selector, t} from 'testcafe'
import {homePage} from "../pageObjects/homePage";
import {loginModal} from "../pageObjects/loginModal"
import {signUpModal} from "../pageObjects/signUpModal"
import {productPage} from "../pageObjects/productPage"


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
    
    dataSet.forEach(data =>{  
    test(`Verify Device Details screen displayed with correct information if user clicks on ${data.name}`, async t => {    
      let numberOfResults = await Selector('#tbodyid').child('div').count;
      let devices = new Array;

      //populate array of device names
      for (let i = 0;  i < numberOfResults; i++){
        devices[i] = Selector('#tbodyid').child('div').nth(i).child('div').child('div').child('.card-title');
      }
    
      //cycle through list of devices and click/verify device details pages
     for (let i=0; i < devices.length; i++){
          if (await devices[i].innerText == data.name){
              await t.click(Selector('#tbodyid').child('div').nth(i).child('div').child('div').child('.card-title').child('a'))
              await t.expect(pp.productName.innerText).contains(data.name);
              await t.expect(pp.productPrice.innerText).contains(data.price);
              await t.expect(pp.productDesc.innerText).contains(data.desc);
              break;
          }
    }  
    });   
    });

 

