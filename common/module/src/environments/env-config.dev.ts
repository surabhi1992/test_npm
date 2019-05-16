// Any properties not defined here will use the defaults in env-config.ts
export class EnvConfig {
    // authKey = {
    //     'com.goaaa.towmenow.member.trucktracker': 'UJvv5Lj8S0rlVx1fytZZtrZ9oBovWKal',
    //     'com.goaaa.towmenow.driver': 'UJvv5Lj8S0rlVx1fytZZtrZ9oBovWKal'
    // };
    // backendBaseUrl = 'https://aet-backend-service.int.35.202.28.191.nip.io'
    authKey = {
        'com.goaaa.towmenow.member.trucktracker': 'Basic QnJLeXhnZlExRlN0bEE1R0g0QUZydHV4TlR1TUxUWDI6dWJBVGc1Y003Rjc1S3E4cg==',
        'com.goaaa.towmenow.driver': 'Basic YXZ0b1kxZDRFUExYcDFXMnhENTdIRnVGZXhDWGJ2czU6dTQ0S3Q3S2FRQmoyOHNvZw==',
        'com.goaaa.kassandra': 'Basic bVpRd2RTVFBjNHFPaHkwdDZlaFVEWmFxQ1BhUW9aWVg6eUFFNXBqVmdHZHZRVlhEeQ=='
    };
    backendBaseUrl = 'https://goaaa-preprod-development.apigee.net';
    analyticsTrackingCode = 'UA-132663377-1';
    projectId = 'aaa-mwg-trucktrackerdev';
    cloudLoggingKey = 'AIzaSyAtrEJ_Xv0xom1FKQBQRrG6MVdCT0nl4jc';
    name = 'dev';
}
