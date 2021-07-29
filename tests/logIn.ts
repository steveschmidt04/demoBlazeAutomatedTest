import { Selector, t } from "testcafe";
import { login, clearLogin } from "../helpers/functions";
import { homePage } from "../pageObjects/homePage";
import { loginModal } from "../pageObjects/loginModal";

let lp = new loginModal();
let hp = new homePage();

fixture`Log In`.page`https://www.demoblaze.com/`
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

test(`Verify Login modal displayed and closed properly if user toggles navigation from homepage header`, async (t) => {
  await t
    .click(hp.headerLogIn)
    .expect(lp.modalTitle.innerText)
    .contains("Log in")
    .click(lp.xBtn)
    .expect(lp.userName.visible)
    .notOk()
    .expect(lp.password.visible)
    .notOk();

  await t
    .click(hp.headerLogIn)
    .expect(lp.modalTitle.innerText)
    .contains("Log in")
    .click(lp.closeBtn)
    .expect(lp.userName.visible)
    .notOk()
    .expect(lp.password.visible)
    .notOk();
});

test(`Verify error message thrown if user attempts to login with incomplete account credentials`, async (t) => {
  await t.click(hp.headerLogIn);
  //No username/Password
  await login(null, null);
  //No Password
  await login("autouser1@gmail.com", null);
  await clearLogin();
  //No Username
  await login(null, "password4qa!");
  await clearLogin();

  //Validate dialog Error messages
  const dialogMsg = await t.getNativeDialogHistory();
  await t
    .expect(dialogMsg[0].text)
    .eql("Please fill out Username and Password.");
  await t
    .expect(dialogMsg[1].text)
    .eql("Please fill out Username and Password.");
  await t
    .expect(dialogMsg[2].text)
    .eql("Please fill out Username and Password.");
});

test(`Verify error message thrown if user attempts to login with invalid account credentials`, async (t) => {
  await t.click(hp.headerLogIn);
  //Invalid Password
  await login("autouser1@gmail.com", "badpassword4qa!");
  await clearLogin();

  //Invalid username
  await login("autouser1bad@gmail.com", "password4qa!");
  await clearLogin();

  //Validate dialog Error messages
  const dialogMsg = await t.getNativeDialogHistory();
  await t.expect(dialogMsg[0].text).eql("User does not exist.");
  await t.expect(dialogMsg[1].text).eql("Wrong password.");
});

test(`Verify user successfully logged in/logged out if valid credentials are used `, async (t) => {
  await t.click(hp.headerLogIn);
  //Valid Credentials
  await login("autouser1@gmail.com", "password4qa!");
  await t
    .expect(hp.headerWelcome.innerText)
    .contains("Welcome autouser1@gmail.com");
  await t.expect(hp.headerLogIn.visible).notOk;
  await t.expect(hp.headerLogOut.visible).ok;

  //Verify Log User is logged out
  await t.click(hp.headerLogOut);
  await t.expect(hp.headerWelcome.visible).notOk;
  await t.expect(hp.headerLogIn.visible).ok;
});
