import { Injectable, Optional } from '@angular/core';
import { EnvConfig } from './env-config';

@Injectable()
export class GoaaaEnvironment {
    private _env = new EnvConfig();
    private _appName: string = 'com.goaaa.towmenow.member.trucktracker';

    constructor(@Optional() config: EnvConfig) {
        if (config) {
            Object.assign(this._env, config);
        }

        // *** This does not work because TypeScript won't know
        // what properties end up being part of GoaaaEnvironment
        // for (let key in config) {
        //     Object.defineProperty(this, key, {
        //         get: () => { return this._env[key]; }
        //     });
        // }
    }

    get appName() { return this._appName; }
    set appName(name: string) { this._appName = name; }

    get authKey() { return this._env.authKey[this.appName]; }
    get backendBaseUrl() { return this._env.backendBaseUrl; }
    get analyticsTrackingCode() { return this._env.analyticsTrackingCode; }
    get projectId() { return this._env.projectId; }
    get cloudLoggingKey() { return this._env.cloudLoggingKey; }
    get googleMapApiKey() { return this._env.googleMapApiKey; }
    get name() { return this._env.name; }
    get endpoints() { return this._env.endpoints; }
}
