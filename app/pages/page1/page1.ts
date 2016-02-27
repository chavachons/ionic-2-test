import {Page, App, IonicApp, NavController, Platform} from 'ionic-framework/ionic';
import {Page2} from '../page2/page2';
import {NgZone} from 'angular2/core';

@Page({
    templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
    app: any;
    nav: any;
    cordova: any;
    slides: Array<any>;
    startingIndex: number;
    myTopSlideOptions: any;
    _zone: any;
    platform: any;
    images: Array<Object>;

    constructor(app: IonicApp, nav: NavController, platform: Platform, zone: NgZone) {

        this.app = app;
        this.nav = nav;

        this.slides = [
            {
                name: "Slide 1",
                link: "http://www.baanwebsite.com",
                img: "http://www.baanwebsite.com/album/banner/large/8e8849fe2aa301613a104820b63dcd8e.png"
            },
            {
                name: "Slide 2",
                link: "http://www.baanwebsite.com",
                img: "http://www.baanwebsite.com/album/banner/large/5462a6c83ebc242ef96932f54582b346.png"
            },
            {
                name: "Slide 3",
                link: "http://www.baanwebsite.com",
                img: "http://www.baanwebsite.com/album/banner/large/1c0005b90d26cf91ce0bae474af3afa8.png"
            }
        ];

        this.startingIndex = 1;

        this.myTopSlideOptions = {
            initialSlide: this.startingIndex,
            loop: true
        };

        this._zone = zone;
        this.platform = platform;
        this.images = [];


    }


    onSlideChanged(slider) {
        console.log('Slide changed', slider);
        console.log("active index", slider.activeIndex);
    }

    ngOnInit() {
        setTimeout(() => {
            this.slider = this.app.getComponent('loopSlider');
            console.log('Got slider', this.slider);
        });
    }

    goToFavoritePage() {
        this.nav.push(Page2);
    }

    QRCodeScaner() {
        this.platform.ready().then(() => {
            cordova.plugins.barcodeScanner.scan(
                function(result) {
                    alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
                },
                function(error) {
                    alert("Scanning failed: " + error);
                }
            );
        });
    }

    takePhoto() {
        this.platform.ready().then(() => {
            let options = {
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                saveToPhotoAlbum: false
            };
            // https://github.com/apache/cordova-plugin-camera#module_camera.getPicture
            navigator.camera.getPicture(
                (data) => {
                    let imagedata = "data:image/jpeg;base64," + data;
                    this._zone.run(() => this.images.unshift({
                        src: imagedata
                    }))
                }, (error) => {
                    alert(error);
                }, options
            );
        });
    }

    takeToast() {
        this.platform.ready().then(() => {
            var exitApp: any = 0;
            if (exitApp == 0) {
                cordova.plugins.toast.showShortCenter('Press again to exit');
                exitApp++;
            } else {
                navigator.app.exitApp();
            }
        });
    }
}
