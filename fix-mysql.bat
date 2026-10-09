@echo off
echo ======================================
echo  MySQL Recovery Fix - XAMPP
echo  Imagine PPTP Prints
echo ======================================
echo.

echo Stopping MySQL if running...
taskkill /F /IM mysqld.exe 2>nul

echo.
echo Creating backup of MySQL data...
if not exist "C:\xampp\mysql\backup" mkdir "C:\xampp\mysql\backup"
xcopy "C:\xampp\mysql\data\ib*" "C:\xampp\mysql\backup\" /Y /Q

echo.
echo Removing corrupt log files...
del "C:\xampp\mysql\data\ib_logfile*" /F /Q 2>nul

echo.
echo ======================================
echo  Fix Complete!
echo ======================================
echo.
echo Now do this:
echo 1. Open XAMPP Control Panel
echo 2. Click "Start" next to MySQL
echo 3. MySQL should start successfully now
echo.
echo If it still fails, you can skip MySQL for now.
echo Your website works fine without it!
echo.
pause




