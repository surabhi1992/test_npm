# Truck Tracker Ionic Common Module

This is an Ionic module that contains a set of common code that can be reused between driver and member apps.

## Setup

1. Get npm registry account credentials.
2. Add credentials to the npm cli (you will be prompted for credentials)
```bash
npm login --registry=https://nexus.jx.35.202.28.191.nip.io/repository/aaa-tt-shared/ --scope=@goaaa-mwg-tt
```
3. Associate the scope and registry
```bash
npm config set @goaaa-mwg-tt:registry https://nexus.jx.35.202.28.191.nip.io/repository/aaa-tt-shared/
```

## Developing

Develop your module like any other Ionic module. Then, run `npm run build` to build a local copy and check for compile time errors.

When you're ready to publish to npm, run `npm run publishPackage`. Don't forget to increment the version number or the attempt to publish will fail.

If you need to remove a version from the registry, run 
```bash
npm unpublish @goaaa-mwg-tt/ionic-common@<version>
```

## Using the module in an Ionic 3 app

Install the module in the desired project by running
```bash
npm install @goaaa-mwg-tt/ionic-common
```

```typescript
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// Import the module
import { GoaaaMwgTtCommonModule } from '@goaaa-mwg-tt/ionic-common';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),

    GoaaaMwgTtCommonModule // Put the module here
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: []
})
export class AppModule {}
```
