import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GoaaaResources, GoaaaFirebaseProvider, CommonAppSettingsProvider, ServiceCall, Driver } from '@goaaa-mwg-tt/ionic-common'
import { FirebaseUidConfig } from '@goaaa-mwg-tt/ionic-common';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    firestoreTestVal: number = 1;
    rtdb1TestVal: number = 10;
    rtdb2TestVal: number = 100;
    listeners: any[] = [];
    truckKey: string = '0037_7300';

    constructor(public navCtrl: NavController,
        private firebase: GoaaaFirebaseProvider,
        public settings: CommonAppSettingsProvider,
        private http: HttpClient) {

    }

    ionViewWillEnter() {
        const url = `/v1/ers-drivers/700001`;
        this.http.get(url)
            .subscribe((res) => {
                // Now that the driver has logged in, start tracking
                console.log(res);
            });

        // Configure Firebase
        let config = new FirebaseUidConfig('com.goaaa.towmenow.member.trucktracker');
        config.serviceCallId = '00002';
        let driverId = null;
        this.firebase.configure(config)
            // Create listeners
            .then(() => {
                return this.firebase.addListener(GoaaaResources.ServiceCallsDetail,
                    config.serviceCallId, 'value', (data) => {
                        if (data) {
                            const sc = new ServiceCall(data);
                            this.settings.serviceCallDetails = sc;

                            if (driverId !== sc.driverId) {
                                driverId = sc.driverId;
                                this.firebase.addListener(GoaaaResources.DriversDetail,
                                    driverId, 'value', (data) => {
                                        if (data) {
                                            this.settings.driverDetails = new Driver(data);
                                        }
                                    });
                            }
                        }
                    });
    });
    // .then(() => {
    //     return this.firebase.addListener(GoaaaResources.TrucksActive, this.truckKey, 'value', (data) => {
    //         this.rtdb2TestVal = data;
    //     });
    // })
    // .catch((err) => {
    //     console.log(`Error adding TrucksActive listener: ${JSON.stringify(err)}`);
    // })
    // .then((unsub) => {
    //     this.listeners.push(unsub);
    //     return this.firebase.addListener(GoaaaResources.TrucksRealtime,
    //         this.truckKey, 'value', (data) => {
    //             this.rtdb1TestVal = data;
    //         });
    // })
    // .catch((err) => {
    //     console.log(`Error adding TrucksRealtime listener: ${JSON.stringify(err)}`);
    // })
    // .then((unsub) => {
    //     this.listeners.push(unsub);
    //     return this.firebase.addListener(GoaaaResources.TrucksDetail,
    //         'pTvEgIljDgnk7p9ZMEnw', 'value', (data) => {
    //             this.firestoreTestVal = data.test;
    //         });
    // })
    // .catch((err) => {
    //     console.log(`Error adding TrucksDetail listener: ${JSON.stringify(err)}`);
    // })
    // .then((unsub) => {
    //     this.listeners.push(unsub);
    //     return Promise.resolve();
    // });
}

ionViewWillLeave() {
    for (const unsub of this.listeners) {
        unsub();
    }
    this.listeners = [];
}

modifyTestData(): void {
    // Increment the data for the test resources
    this.firebase.set(GoaaaResources.TrucksDetail,
        'pTvEgIljDgnk7p9ZMEnw', { test: this.firestoreTestVal + 1 });
    this.firebase.set(GoaaaResources.TrucksRealtime, this.truckKey, this.rtdb1TestVal + 10);
    this.firebase.set(GoaaaResources.TrucksActive, this.truckKey, this.rtdb2TestVal + 100);
}

testUnsubscribe(): void {
    if(this.listeners.length > 0) {
    this.listeners.pop()();
}
    }
}
