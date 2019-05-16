// Any properties not defined here will use the defaults in env-config.ts
export class EnvConfig {
    // authKey = {
    //     'com.goaaa.towmenow.member.trucktracker': 'rA9kiDyQAXvtEvwEHZvOZiZG8O6YeVvg',
    //     'com.goaaa.towmenow.driver': 'rA9kiDyQAXvtEvwEHZvOZiZG8O6YeVvg'
    // };
    // backendBaseUrl = 'https://aaa-mwg-trucktracker-prodbesvc.appspot.com'
    authKey = {
        'com.goaaa.towmenow.member.trucktracker': 'Basic bVFHYUVrTG5sdjZGN01mQVJYTXJPckdqTUdVRnVuMWE6R01HWHBlUUY5R1FzYWdvQg==',
        'com.goaaa.towmenow.driver': 'Basic aUxjTnp3T3BEZUZlNFVHdmJES2RLRmhNVUNSbUlrZlM6SnRjRlVGNkl3V3djb0N5NQ==',
        'com.goaaa.kassandra': 'Basic eGw1S3diNFRRUGxUeVdDcGF5bExMSUtsSjk1ZTFLSjA6REdBS05hcGk4Z3hUSHFmWQ=='
    };
    backendBaseUrl = 'https://goaaa-prod.apigee.net';
    analyticsTrackingCode = 'UA-132663377-2';
    projectId = 'aaa-mwg-trucktrackerprod';
    cloudLoggingKey = 'AIzaSyDdJGto0ARiSuQM8yjcee7FcNVammu5cKI';
    name = 'prod';
}
