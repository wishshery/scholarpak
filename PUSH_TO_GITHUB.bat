@echo off
:: ============================================================
:: ScholarPak — Push to GitHub (Windows)
:: Double-click this file OR run from Command Prompt
:: ============================================================

echo.
echo  ScholarPak -- Pushing to GitHub...
echo.

:: Remove lock files if any
del /f /q .git\*.lock 2>nul
del /f /q .git\refs\heads\*.lock 2>nul

:: Rename branch to main
git branch -M main

:: Add remote (safe to run even if already added)
git remote add origin https://github.com/wishshery/scholarpak.git 2>nul
git remote set-url origin https://github.com/wishshery/scholarpak.git

:: Push to GitHub
echo  Pushing all 27 files to github.com/wishshery/scholarpak ...
git push -u origin main

echo.
echo  Done! Your repo is live at:
echo    https://github.com/wishshery/scholarpak
echo.
echo  Next: Deploy to Vercel
echo    1. Go to https://vercel.com/new
echo    2. Import github.com/wishshery/scholarpak
echo    3. Click Deploy!
echo.
pause
