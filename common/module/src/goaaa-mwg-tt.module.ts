import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { GoaaaFirebaseProvider, CloudLoggingService } from './providers';
import { HttpClientModule } from '@angular/common/http';
import { GoaaaEnvironment } from './environments/environment';
import { EnvConfig } from './environments/env-config';

export type GoaaaMwgTtConfigFunction = () => any;

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        GoaaaEnvironment
    ]
})
export class GoaaaMwgTtCommonModule {
    static forRoot(config: GoaaaMwgTtConfigFunction): ModuleWithProviders {
        return {
            ngModule: GoaaaMwgTtCommonModule,
            providers: [
                GoaaaFirebaseProvider,
                {provide: EnvConfig, useFactory: config},
                CloudLoggingService
            ]
        };
    }
}

