@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist state_w3 mkdir state_w3
set H2_STATE=%~dp0state_w3
echo [w3] start %date% %time% >> state_w3\launcher_w3.log
:loop
node harness2.js --run --subjects "YKW,LVM,IMG,LVS,FIX" >> state_w3\launcher_w3_out.log 2>&1
set EC=%ERRORLEVEL%
echo [%date% %time%] w3 exit %EC% >> state_w3\launcher_w3.log
if %EC%==9 exit /b 9
if %EC%==0 exit /b 0
if %EC%==7 ( timeout /t 3600 /nobreak >nul ) else ( timeout /t 60 /nobreak >nul )
goto loop