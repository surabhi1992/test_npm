export class FirebaseUidConfig {
    appId: string;
    serviceCallId?: string;
    facilityId?:string;
    truckId?: string;
    driverId?: string;

    constructor(appId: string){
        this.appId = appId;
    }
}
