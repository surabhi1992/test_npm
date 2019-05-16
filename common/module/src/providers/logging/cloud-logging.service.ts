import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { GoaaaEnvironment } from '../../environments/environment';

/**
 * Enables logging to StackDriver.
 */
@Injectable()
export class CloudLoggingService {

    private _reportingUrl: string;
    private _appName: string;
    private _appVersion: string;
    private _user: string;

    constructor(private http: HttpClient,
        private env: GoaaaEnvironment) {
        // tslint:disable
        this._reportingUrl = `https://clouderrorreporting.googleapis.com/v1beta1/projects/${this.env.projectId}/events:report?key=${this.env.cloudLoggingKey}`;
    }

    set appName(name) {
        this._appName = name;
    }

    set appVersion(version) {
        this._appVersion = version;
    }

    set user(user) {
        this._user = user;
    }

    get reportingUrl() {
        return this._reportingUrl;
    }

    error(err: any) {
        // Build the error report
        const errorReport: any = {
            eventTime: moment().toISOString(),
            serviceContext: {
                service: this._appName,
                version: this._appVersion
            },
            message: err.stack || new Error(err.message || '').stack,
            context: {
                user: this._user,
                httpRequest: {

                }
            }
        };

        if (err.name === 'HttpErrorResponse') {
            errorReport.context.httpRequest = {
                url: err.url || '',
                responseStatusCode: err.status || ''
            };
        }

        this.http.post(this.reportingUrl, errorReport, {
            headers: new HttpHeaders().set('X-Skip-Interceptor', '')
        }).subscribe();
    }

    warning(message: string) {
        // Build the error report
        const errorReport: any = {
            eventTime: moment().toISOString(),
            serviceContext: {
                service: this._appName,
                version: this._appVersion
            },
            message: new Error(message || '').stack,
            context: {
                user: this._user,
                reportLocation: {
                    filePath: "main.js",
                    lineNumber: 0,
                    functionName: "non-fatal"
                }
            }
        };

        this.http.post(this.reportingUrl, errorReport, {
            headers: new HttpHeaders().set('X-Skip-Interceptor', '')
        }).subscribe();
    }
}
