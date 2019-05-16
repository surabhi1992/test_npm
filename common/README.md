# Truck Tracker Ionic Common Module

This is an Ionic module that contains a set of common code that can be reused between driver and member apps.

## CORS
In order to support Firebase Storage, CORS settings for the project need to be configured properly. The supported domains can be updated in cors.json in the project root. Then, run the following command to apply the changes:
``` bash
gsutil cors set cors.json gs://aaa-mwg-trucktrackerdev.appspot.com
```

## Module

The `module` directory consists of the common module code that will be published to the private npm registry.

## Unit Testing

The `commonTest` directory contains an Ionic project that can be used for unit testing the common module code.

Since `npm link` does not work with the Ionic webpack configuration, the common module needs to be packaged
 with `npm pack` before it can be installed into the Ionic test project. For convenience, the `commonTest/rebuild.bat`
 script is provided to rebuild the common module, package it, uninstall the previous version and install the new version.