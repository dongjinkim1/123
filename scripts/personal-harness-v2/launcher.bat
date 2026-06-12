@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo [launcher] 전원/절전 해제 권장: powercfg /change standby-timeout-ac 0
echo [launcher] 기동 %date% %time% >> state\launcher.log

:loop
node harness2.js --run >> state\launcher_out.log 2>&1
set EC=%ERRORLEVEL%
echo [%date% %time%] harness2 exit %EC% >> state\launcher.log

if %EC%==9 goto hardstop
if %EC%==0 goto done
if %EC%==7 (
  echo [%date% %time%] rate limit — 3600초 대기 후 재기동 >> state\launcher.log
  timeout /t 3600 /nobreak >nul
) else (
  echo [%date% %time%] 비정상 종료 — 60초 후 재기동(저널 재개) >> state\launcher.log
  timeout /t 60 /nobreak >nul
)
goto loop

:hardstop
echo [%date% %time%] HARD STOP(코드 9) — 재기동 제외, 보고서 확인 요망 >> state\launcher.log
exit /b 9

:done
echo [%date% %time%] 큐 소진 — 정상 종료 >> state\launcher.log
exit /b 0
