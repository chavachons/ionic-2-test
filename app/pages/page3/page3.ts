import {Page} from 'ionic-framework/ionic';


@Page({
    templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
    menuShop:string;
    constructor() {
        this.menuShop = "Menu";
    }
}
