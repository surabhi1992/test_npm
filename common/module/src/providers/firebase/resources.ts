/**
 * Provides a list of all resources that are available in Firebase.
 */
export const enum GoaaaResources {
    TrucksActive = 'TrucksActive',
    TrucksRealtime = 'TrucksRealtime',
    TrucksDetail = 'TrucksDetail',
    ServiceCallsDetail = 'ServiceCallsDetail',
    DriversDetail = 'DriversDetail'
}

// ==================================================
// API configuration
// ==================================================

/**
 * Represents the information needed to request connection
 *  details for a Firebase resource from the backend.
 */
export class FirebaseResourceConfig {
    url: string

    constructor(url) {
        this.url = url;
    }
};
// ==================================================
