import { Selector, t } from "testcafe";
import { loginModal } from "../pageObjects/loginModal";
import { homePage } from "../pageObjects/homePage";
import { productPage } from "../pageObjects/productPage";
import { cart } from "../pageObjects/cart";

let lp = new loginModal();
let hp = new homePage();
let pp = new productPage();
let sc = new cart();

//Function used to Log into application
export async function login(un?, pw?) {
  if (un != null) {
    await t.typeText(lp.userName, un, { paste: true });
  }
  if (pw != null) {
    await t.typeText(lp.password, pw, { paste: true });
  }
  await t.setNativeDialogHandler(() => true).click(lp.logInBtn);
}

//Function used to clear text from login Modal
export async function clearLogin() {
  await t
    .click(lp.userName)
    .pressKey("ctrl+a delete")
    .click(lp.password)
    .pressKey("ctrl+a delete");
}

//Housekeeping Function to clear items from shopping cart
export async function clearShoppingCart() {
  await t.click(hp.headerCart);
  let itemsInCart = await sc.shoppingCartItem.count;
  for (let i = 0; i < itemsInCart; i++) {
       await t.click(sc.firstDeleteBtn);
    }
  itemsInCart = await sc.shoppingCartItem.count;
  await t.click(hp.headerHome);
}

//Function used to get an array of selector items displayed on the homepage
export async function getHomePageItems() {
  let numberOfResults = await Selector("#tbodyid").child("div").count;
  let devices = new Array();
  for (let i = 0; i < numberOfResults; i++) {
    devices[i] = Selector("#tbodyid")
      .child("div")
      .nth(i)
      .child("div")
      .child("div")
      .child(".card-title").innerText;
  }
  return devices;
}

//Function used in shopping cart to calculate the total of the items displayed in a users shopping cart
export async function calculateCartTotal() {
  let totalCalc: number = 0;
  for (let i = 0; i < (await sc.shoppingCartItem.count); i++) {
    let temp = await Selector(".success").nth(i).child("td").nth(2).innerText;
    totalCalc += +temp;
  }
  return totalCalc;
}
