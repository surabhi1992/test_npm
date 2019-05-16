export class Truck {
    activeServiceCalls: any = [];
    currentDriverId: string = null;
    deviceSerial: string = null;
    driverAppInstanceId: string = null;
    facilityId: string = null;
    licensePlateNumber: string = null;
    licensePlateState: string = null;
    truckDriverStatus: string = null;
    truckId: string = null;
    truckStatus: string = null;
    truckType: string = null;
    truckAssignedToWaitLocation: boolean = false;
    waitLocation: any = null;

    constructor(other?: any) {
        if (other !== undefined && other !== null) {
            for(let key in this){
                if(other.hasOwnProperty(key)){
                    this[key] = other[key];
                }
            }
        }
    }
}
