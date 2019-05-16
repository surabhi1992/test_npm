export class ServiceCall {
    serviceCallId: string = null;
    facilityId: string = null;
    truckId: string = null;
    serviceVehicleType: string = null;
    currentStatus: string = null;
    memberId: string = null;
    memberAccessToken: string = null;
    memberBaseYear: string = null;
    memberFirstName: string = null;
    memberLastName: string = null;
    memberPhoneNumber: string = null;
    memberEmail: string = null;
    memberSmsOptIn: boolean = null;
    memberSmsContact: boolean = null;
    memberEmailOptIn: boolean = null;
    messageSentInitial: boolean = null;
    messageSentNear: boolean = null;
    messageSentSurvey: boolean = null;
    messageSentDriverAssigned: boolean = null;
    driverId: string = null;
    eta: any = null;
    serviceTypeCode: string = null;
    serviceTypeGroup: string = null;
    serviceTypeVerbiage: string = null;
    resolutionType: string = null;
    breakdownLat: number = null;
    breakdownLong: number = null;
    towDestinationLat: number = null;
    towDestinationLong: number = null;
    enRouteMiles: number = null;
    towMiles: number = null;
    ratingId: string = null;
    createdAt: string = null;
    updatedAt: string = null;
    breakdownLocationAddress: string = null;
    memberBaseUrl: string = null;
    messageSentEnRoute: boolean = false;
    messageSentOnLocation: boolean = false;
    serviceVehicleYear: string = null;
    serviceVehicleColor: string = null;
    serviceVehicleMake: string = null;
    serviceVehicleModel: string = null;
    serviceVehicleDrivetrain: string = null;
    serviceVehiclePlateNumber: string = null;
    serviceVehiclePlateState: string = null;
    serviceVehicleFuelType: string = null;
    serviceVehicleNumberPassengers: number = null;
    priorityCode: string = null;
    paymentMethod: string = null;
    locationCode: string = null;
    landmark: string = null;
    numberComments: string = null;
    tlcCode: string = null;

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
