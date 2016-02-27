import {Page, App, IonicApp, NavController} from 'ionic-framework/ionic';
import {Page3} from '../page3/page3';


@Page({
  templateUrl: 'build/pages/page2/page2.html',
})
export class Page2 {
    nav: any;
    constructor(nav: NavController) {

        this.nav = nav;
    }
    goToMenuViewPage() {
        this.nav.push(Page3);
    }
}
