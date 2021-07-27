import {Selector, t} from 'testcafe'
import {loginModal} from "../pageObjects/loginModal"
import {homePage} from "../pageObjects/homePage";

let lp = new loginModal;
let hp = new homePage;

export async function login(un?:string | null, pw?:string| null){
    if (un != null){
        await t.typeText(lp.userName, un, { paste: true })
    }
    if (pw != null){
           await t.typeText(lp.password, pw, { paste: true })
    }
    await t.setNativeDialogHandler(() => true)
           .click(lp.logInBtn)          
}

export async function clearLogin(){
    await t.click(lp.userName).pressKey('ctrl+a delete')
           .click(lp.password).pressKey('ctrl+a delete');
}