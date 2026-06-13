@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist state_w2 mkdir state_w2
set H2_STATE=%~dp0state_w2
echo [w2] start %date% %time% >> state_w2\launcher_w2.log
:loop
node harness2.js --run --subjects "DWF,STR,LIF,MAT,PSN" >> state_w2\launcher_w2_out.log 2>&1
set EC=%ERRORLEVEL%
echo [%date% %time%] w2 exit %EC% >> state_w2\launcher_w2.log
if %EC%==9 exit /b 9
if %EC%==0 exit /b 0
if %EC%==7 ( timeout /t 3600 /nobreak >nul ) else ( timeout /t 60 /nobreak >nul )
goto loop