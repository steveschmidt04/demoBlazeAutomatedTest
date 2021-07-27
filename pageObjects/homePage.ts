import {Selector} from 'testcafe'

export class homePage{
    //header elements
    headerLogo: Selector;
    headerHome: Selector;
    headerContact: Selector;
    headerAbout: Selector;
    headerCart: Selector;
    headerLogIn: Selector;
    headerSignUp: Selector;
    headerWelcome: Selector;
    headerLogOut: Selector;

    //Left hand menu elements
    categories:Selector;
    phones: Selector;
    laptops: Selector;
    monitors: Selector;

    //Nav links
    nextBtn: Selector
    prevBtn: Selector

    constructor(){
        this.headerLogo = Selector('#nava');
        this.headerHome = Selector('.nav-link').withText("Home");
        this.headerContact = Selector('.nav-link').withText("Contact");
        this.headerAbout = Selector('.nav-link').withText("About");
        this.headerCart = Selector('.nav-link').withText("About us");
        this.headerLogIn = Selector('.nav-link').withText("Log in");
        this.headerSignUp = Selector('.nav-link').withText("Sign up");
        this.headerWelcome = Selector('#nameofuser');
        this.headerLogOut = Selector('.nav-link').withText("Log out");

        this.categories = Selector('#cat');
        this.phones = Selector('.list-group').child('a').withText('Phones');
        this.laptops = Selector('.list-group').child('a').withText('Laptops');
        this.monitors = Selector('.list-group').child('a').withText('Monitors');

        this.nextBtn = Selector('#next2');
        this.prevBtn = Selector('#prev2');
    };
};
