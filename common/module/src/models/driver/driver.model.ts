export class Driver {
    available: boolean = false;
    availableTime: string = null;
    avgMemberRating: number = null;
    deviceSerial: string = null;
    driverId: string = null;
    facilities: any = [];
    firstName: string = null;
    lastName: string = null;
    middleName: string = null;
    numMemberRatings: number = null;
    password: string = null;
    phoneNumber: string = null;
    photoUrl: string = null;
    status: string = null;
    truckKey: string = null;

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
