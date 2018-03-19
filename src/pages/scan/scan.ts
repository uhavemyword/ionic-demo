import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public qrScanner: QRScanner,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }


  ionViewWillEnter() {
    this.scan();
  }

  scan() {
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.showAlert(text);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  showAlert(text: string) {

    let confirm = this.alertCtrl.create({
      title: 'Scan Result',
      message: text,
      buttons: [
        {
          text: 'Scan Again',
          handler: () => {
            this.scan();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

}
