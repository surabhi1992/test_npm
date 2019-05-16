// Any properties added here should be added into environment.ts as well
export class EnvConfig {
    authKey = {};
    backendBaseUrl = '';
    googleMapApiKey = 'AIzaSyBn8JG5IWkRj9UgKh2gSQ7Hyajj-g3MfOU';
    analyticsTrackingCode = '';
    projectId = '';
    cloudLoggingKey = '';
    // // Backend direct
    // endpoints = {
    //     serviceCalls: '/api/service-calls',
    //     trucks: '/api/trucks',
    //     drivers: '/api/drivers',
    //     facilities: '/api/facilities',
    //     firebase: '/firebase',
    //     truckLocations: '/api/truck-locations',
    //     smsMessageTemplates: '/api/sms-message-templates',
    //     smsNotifications: '/api/notifications/sms',
    //     truckWaitDecisionLogs: '/api/truck-wait-decision-logs',
    //     truckWaitAssignmentLogs: '/api/truck-wait-assignment-logs',
    //     driverAuth: '/auth/drivers',
    //     reference: '/api/reference',
    //     twilioProxy: '/api/twilio-proxy'
    // }
    // Apigee
    endpoints = {
        serviceCalls: '/v1/ers-service-calls',
        trucks: '/v1/ers-trucks',
        drivers: '/v1/ers-drivers',
        facilities: '/v1/ers-facilities',
        firebase: '/v1/ers-firebase',
        truckLocations: '/v1/ers-truck-locations',
        smsMessageTemplates: '/v1/ers-sms/message-templates',
        smsNotifications: '/v1/ers-sms/notifications',
        truckWaitDecisionLogs: '/v1/ers-trucks/wait-decision-logs',
        truckWaitAssignmentLogs: '/v1/ers-trucks/wait-assignment-logs',
        driverAuth: '/v1/ers-auth/drivers',
        reference: '/v1/ers-reference',
        twilioProxy: '/v1/ers-twilio-proxy'
    }
    name = 'default';
}
