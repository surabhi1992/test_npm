import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceCall } from '../../models/service-call/service-call.model';
import { Driver } from '../../models/driver/driver.model';
import { Truck } from '../../models/truck/truck.model';
import { GoaaaFirebaseProvider } from '../firebase/firebase';
import { GoaaaResources } from '../firebase/resources';

/**
 * Provider for access to global application settings.
 *
 * References:
 * <ul><li><a href="https://toddmotto.com/typescript-setters-getter">
 * https://toddmotto.com/typescript-setters-getter</a></li>
 * <ul>
 */
@Injectable()
export class CommonAppSettingsProvider {

    /**
     * The internal truck key representation.
     *
     * It is implemented as a BehaviorSubject for the following reasons:
     * <ul><li>If only a value is needed (not an observable), BehaviorSubjects
     *  track their last stored value.</li>
     * <li>An observable can still be returned so that other components can subscribe.</li>
     * <li>BehaviorSubjects are initialized with a default value. When a subscriptions is
     *  created, the default or last written value is returned immediately so if there are
     *  any delays in subscription creation, an initial value is always available. See the
     *  following reference:
     *  <a href="https://stackoverflow.com/questions/39494058/behaviorsubject-vs-observable">
     *  https://stackoverflow.com/questions/39494058/behaviorsubject-vs-observable</a>
     * </li></ul>
     */
    private _truckKey: BehaviorSubject<string> = new BehaviorSubject(null);
    private _facilityId: BehaviorSubject<string> = new BehaviorSubject(null);
    private _truckId: BehaviorSubject<string> = new BehaviorSubject(null);
    private _driverId: BehaviorSubject<string> = new BehaviorSubject(null);
    private _serviceCallDetails: BehaviorSubject<ServiceCall> = new BehaviorSubject(null);
    private _driverDetails: BehaviorSubject<Driver> = new BehaviorSubject(null);
    private _driverPhoto: BehaviorSubject<string> = new BehaviorSubject(null);
    private _truckDetails: BehaviorSubject<Truck> = new BehaviorSubject(null);
    private _appName: string = 'com.goaaa.towmenow.member.trucktracker';

    private driverPhotoUrlChanged = false;
    private imageElement: any = null;
    private firebaseStorage = {
        driver: null
    };

    constructor(private goaaaFirebase: GoaaaFirebaseProvider) {

        // Set up subscriptions for data that comprises the truck key
        this.facilityIdObservable.subscribe((id) => {
            const newKey = this.buildTruckKey(this.facilityId, this.truckId);
            if (this._truckKey.value !== newKey) {
                this._truckKey.next(newKey);
            }
        });
        this.truckIdObservable.subscribe((id) => {
            const newKey = this.buildTruckKey(this.facilityId, this.truckId);
            if (this._truckKey.value !== newKey) {
                this._truckKey.next(newKey);
            }
        });

        // This automatically downloads driver photos when available and stores the
        // image as a data URL so pages can use it without extra HTTP calls
        this.driverDetailsObservable.subscribe((details) => {
            if (details) {
                const url = details.photoUrl;
                // Execute this if the driver photo URL has changed or if there is no driver photo URL
                if (this.driverPhotoUrlChanged || (url === null && this._driverPhoto.value === null)) {
                    // Get the project details if we have not already
                    const projectChain = this.firebaseStorage.driver === null ?
                        goaaaFirebase.getProject(GoaaaResources.DriversDetail)
                            .then((project) => {
                                this.firebaseStorage.driver = project.ref.storage();
                            }) :
                        Promise.resolve();

                    let downloadSuccessful = true;

                    // Now that we have the project download the specified URL or the blank avatar from Firebase or
                    // an external source that supports CORS
                    projectChain
                        .then(() => {
                            let imageRef = null;
                            // If the url is null, then load the blank avatar
                            if (url === null) {
                                imageRef = this.firebaseStorage.driver.ref(`/driver-photos/unisex-avatar.png`);
                            }
                            // If the URL contains 'firebasestorage', then we need to get the storage reference
                            // from the existing URL
                            else if (url.includes('firebasestorage')) {
                                imageRef = this.firebaseStorage.driver.refFromURL(url);
                            }
                            // If we have a Firebase storage reference, use it to get the download URL.
                            // Otherwise, just pass the URL onward
                            const imageDownloadChain = imageRef !== null ?
                                imageRef.getDownloadURL() : Promise.resolve(url);

                            // Generate a data URL from the source URL
                            imageDownloadChain
                                .then((url) => {
                                    return this.getDataUrl(url);
                                })
                                .catch((err) => {
                                    console.log(`Could not download driver photo: ${JSON.stringify(err)}`);
                                    downloadSuccessful = false;
                                })
                                .then((dataUrl) => {
                                    if (downloadSuccessful) {
                                        return Promise.resolve(dataUrl);
                                    }
                                    // If the initial download failed, try to load default image
                                    return this.firebaseStorage.driver.ref(`/driver-photos/unisex-avatar.png`)
                                        .getDownloadURL()
                                        .then((url) => {
                                            return this.getDataUrl(url);
                                        });
                                })
                                .then((dataUrl) => {
                                    // Pass the new data URL on to subscribers
                                    this._driverPhoto.next(dataUrl);
                                })
                                .catch((err) => {
                                });
                        });
                }
            }
        });
    }

    getDataUrl(url): Promise<string> {
        return new Promise((resolve, reject) => {

            var image = new Image();
            image.crossOrigin = '';

            image.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
                canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

                canvas.getContext('2d').drawImage(this, 0, 0);

                // Get a data URL of the image
                resolve(canvas.toDataURL('image/png'));
            }.bind(image);

            image.src = url;
        });
    }

    get appName() { return this._appName; }
    set appName(name: string) { this._appName = name; }

    get truckKey() {
        return this._truckKey.value;
    }
    get truckKeyObservable() {
        return this._truckKey.asObservable();
    }

    get facilityId() {
        return this._facilityId.value;
    }
    get facilityIdObservable() {
        return this._facilityId.asObservable();
    }
    set facilityId(id) {
        // TODO - Do validation if necessary before writing the new value
        if (id === undefined || id === this._facilityId.value) {
            return;
        }
        this._facilityId.next(id);
    }

    get truckId() {
        return this._truckId.value;
    }
    get truckIdObservable() {
        return this._truckId.asObservable();
    }
    set truckId(id) {
        // TODO - Do validation if necessary before writing the new value
        if (id === undefined || id === this._truckId.value) {
            return;
        }
        this._truckId.next(id);
    }

    get driverId() {
        return this._driverId.value;
    }
    get driverIdObservable() {
        return this._driverId.asObservable();
    }
    set driverId(id) {
        // TODO - Do validation if necessary before writing the new value
        if (id === undefined || id === this._driverId.value) {
            return;
        }
        this._driverId.next(id);
    }

    get serviceCallDetails() {
        return { ...this._serviceCallDetails.value };
    }
    get serviceCallDetailsObservable() {
        return this._serviceCallDetails.asObservable();
    }
    set serviceCallDetails(serviceCall) {
        // TODO - Do validation if necessary before writing the new value
        this._serviceCallDetails.next({ ...serviceCall });
    }

    get driverDetails() {
        return { ...this._driverDetails.value };
    }
    get driverDetailsObservable() {
        return this._driverDetails.asObservable();
    }
    set driverDetails(driver) {
        // TODO - Do validation if necessary before writing the new value
        this.driverPhotoUrlChanged = !this._driverDetails.value ||
            (driver && driver.photoUrl !== this._driverDetails.value.photoUrl);
        this._driverDetails.next({ ...driver });
    }

    get driverPhoto() {
        return this._driverPhoto.value;
    }
    get driverPhotoObservable() {
        return this._driverPhoto.asObservable();
    }

    get truckDetails() {
        return { ...this._truckDetails.value };
    }
    get truckDetailsObservable() {
        return this._truckDetails.asObservable();
    }
    set truckDetails(truck) {
        // TODO - Do validation if necessary before writing the new value
        this._truckDetails.next({ ...truck });
    }

    public buildTruckKey(facilityId: string, truckId: string): string {
        // If the ID is null, it invalidates the truck key
        if (facilityId === null || truckId === null) {
            return null;
        }
        return `${facilityId}_${truckId}`;
    }
}
