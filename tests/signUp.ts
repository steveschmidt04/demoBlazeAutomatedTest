import { Selector, t } from "testcafe";
import { homePage } from "../pageObjects/homePage";
import { loginModal } from "../pageObjects/loginModal";
import { signUpModal } from "../pageObjects/signUpModal";

let sp = new signUpModal();
let lp = new loginModal();
let hp = new homePage();

fixture`Sign Up`.page`https://www.demoblaze.com/`
  .before(async (t) => {})
  .beforeEach(async (t) => {
    await t.setTestSpeed(1);
  })
  .after(async (t) => {})
  .afterEach(async (t) => {});
test.timeouts({
  pageLoadTimeout: 2000,
  pageRequestTimeout: 60000,
  ajaxRequestTimeout: 60000,
});

test(`Verify Sign up modal displayed and closed properly if user toggles navigation from homepage header`, async (t) => {
  await t
    .click(hp.headerSignUp)
    .expect(sp.modalTitle.innerText)
    .contains("Sign up")
    .click(sp.xBtn)
    .expect(sp.userName.visible)
    .notOk()
    .expect(sp.password.visible)
    .notOk();

  await t
    .click(hp.headerSignUp)
    .expect(sp.modalTitle.innerText)
    .contains("Sign up")
    .click(sp.closeBtn)
    .expect(sp.userName.visible)
    .notOk()
    .expect(sp.password.visible)
    .notOk();
});

test(`Verify Error message thrown if user attempts to create new account using existing credentials`, async (t) => {
  await t
    .click(hp.headerSignUp)
    .typeText(sp.userName, "autouser1@gmail.com", { paste: true })
    .typeText(sp.password, "password4qa!", { paste: true })
    .setNativeDialogHandler(() => true)
    .click(sp.signUpBtn)
    //Intentional validate second click of Sign up button
    .setNativeDialogHandler(() => true)
    .click(sp.signUpBtn);

  const dialogMsg = await t.getNativeDialogHistory();
  await t.expect(dialogMsg[0].text).eql("This user already exist.");
  await t.expect(dialogMsg[1].text).eql("This user already exist.");
});

test(`Verify newly created User Account is able to log in`, async (t) => {
  //Generate random user string
  let crypto = require("crypto");
  let id = crypto.randomBytes(10).toString("hex");
  let randomUser: string = "autouser." + id + "@gmail.com";

  await t
    .click(hp.headerSignUp)
    .typeText(sp.userName, randomUser, { paste: true })
    .typeText(sp.password, "password4qa!", { paste: true })
    .setNativeDialogHandler(() => true)
    .click(sp.signUpBtn);

  const dialogMsg = await t.getNativeDialogHistory();
  await t.expect(dialogMsg[0].text).eql("Sign up successful.");
  await t
    .click(hp.headerLogIn)
    .typeText(lp.userName, randomUser, { paste: true })
    .typeText(lp.password, "password4qa!", { paste: true })
    .setNativeDialogHandler(() => true)
    .click(lp.logInBtn)
    .expect(hp.headerWelcome.innerText)
    .contains("Welcome " + randomUser);
});
