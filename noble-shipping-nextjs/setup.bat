@echo off
echo ========================================
echo Noble Shipping Next.js Setup
echo ========================================
echo.

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b %errorlevel%
)
echo.

echo Step 2: Generating Prisma Client...
call npm run db:generate
if %errorlevel% neq 0 (
    echo Error: Failed to generate Prisma Client
    pause
    exit /b %errorlevel%
)
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo You can now run the development server with:
echo npm run dev
echo.
pause
