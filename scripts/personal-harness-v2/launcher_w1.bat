@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo [w1] start %date% %time% >> state\launcher_w1.log
:loop
node harness2.js --run --subjects "OPP,YAD,MNY,JOB" >> state\launcher_w1_out.log 2>&1
set EC=%ERRORLEVEL%
echo [%date% %time%] w1 exit %EC% >> state\launcher_w1.log
if %EC%==9 exit /b 9
if %EC%==0 exit /b 0
if %EC%==7 ( timeout /t 3600 /nobreak >nul ) else ( timeout /t 60 /nobreak >nul )
goto loop