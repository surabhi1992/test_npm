import { GoaaaEnvironment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest }
    from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AppHttpInterceptorService implements HttpInterceptor {

    private baseUrl: string;
    private useBaseUrl: boolean = true;

    constructor(private env: GoaaaEnvironment) {
        this.baseUrl = env.backendBaseUrl;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Provide support for skipping interception (Mostly when testing)
        if (req.headers.has('X-Skip-Interceptor')) {
            const headers = req.headers.delete('X-Skip-Interceptor');
            return next.handle(req.clone({ headers }));
        }

        let modifiedReq = req.clone();

        modifiedReq = modifiedReq.clone({
            url: this.useBaseUrl ? `${this.baseUrl}${req.url}` : req.url,
            setHeaders: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: this.env.authKey,
            }
        });

        return next.handle(modifiedReq).do(() => {
        }, (error: any) => {
            this.handleError(error);
        });
    }

    handleError(err) {
        if (err instanceof HttpErrorResponse) {
            switch (err.status) {
                case 401:
                    // this.navCtrl.setRoot('ErrorPage');
                    break;
                case 403:
                    // this.navCtrl.setRoot('ErrorPage');
                    break;
                case 504:
                    // this.navCtrl.setRoot('ErrorPage');
                    break;
                default:
                    // this.navCtrl.setRoot('ErrorPage');
                    break;
            }
        }
    }

    /**
     *
     * @param enable Setting this to false will prevent the URL of the
     *  intercepted request from being changed.
     * @param baseUrl This URL will override the one defined in CommonAppConst.
     */
    configureBaseUrl(enable: boolean, baseUrl?: string): void {
        this.useBaseUrl = enable;
        if (baseUrl) {
            this.baseUrl = baseUrl;
        }
    }
}
