@echo off
echo ======================================
echo  SSL Certificate Generator for XAMPP
echo  Imagine PPTP Prints
echo ======================================
echo.

cd C:\xampp\apache

echo Generating private key...
bin\openssl.exe genrsa -out conf\ssl.key\imaginepptp.key 2048

echo.
echo Generating certificate...
echo Please answer the following questions:
echo (You can press Enter to skip optional fields)
echo.

bin\openssl.exe req -new -x509 -nodes -sha256 -days 365 -key conf\ssl.key\imaginepptp.key -out conf\ssl.crt\imaginepptp.crt

echo.
echo ======================================
echo  SSL Certificate Generated!
echo ======================================
echo.
echo Certificate: C:\xampp\apache\conf\ssl.crt\imaginepptp.crt
echo Private Key: C:\xampp\apache\conf\ssl.key\imaginepptp.key
echo.
echo Next steps:
echo 1. Update httpd-ssl.conf with new certificate paths
echo 2. Restart Apache in XAMPP
echo 3. Visit https://localhost/ImaginePPTPprints/
echo.
echo Press any key to exit...
pause >nul




