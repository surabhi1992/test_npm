cd ../module
call npm run build
if %ERRORLEVEL% neq 0 (
    cd ../commonTest
    echo Error with code: %ERRORLEVEL%
    exit /b %ERRORLEVEL%
)
for /f %%i in ('npm pack') do set PACKAGE=%%i
cd ../commonTest
call npm uninstall --save @goaaa-mwg-tt/ionic-common
call npm install --save ../module/%PACKAGE%
call ionic serve
