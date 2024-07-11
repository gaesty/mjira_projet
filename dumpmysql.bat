@echo off

:: Configuration de la base de données
set DB_HOST=localhost
set DB_USER=root
set DB_PASS=root
set DB_NAME=projet_mjira

:: Chemin vers l'exécutable mysqldump
set MYSQLDUMP_PATH=C:\MAMP\bin\mysql\bin\mysqldump.exe

:: Configuration de la sauvegarde
set BACKUP_DIR=C:\Users\gaeta\Desktop\Projet_MJIRA_BachDai
set DATE=%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%
set BACKUP_FILE=%BACKUP_DIR%\%DB_NAME%_%DATE%.sql

:: Correction du format de la date
set DATE=%DATE:/=-%
set TIME=%TIME::=-%
set TIME=%TIME:.=-%
set BACKUP_FILE=%BACKUP_DIR%\%DB_NAME%_%DATE%_%TIME%.sql

:: Créer le dossier de sauvegarde s'il n'existe pas
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

:: Exécuter la commande de sauvegarde
"%MYSQLDUMP_PATH%" -h %DB_HOST% -u %DB_USER% -p%DB_PASS% %DB_NAME% > "%BACKUP_FILE%"

:: Vérifier si la sauvegarde a réussi
if %errorlevel% equ 0 (
  echo Sauvegarde réussie : %BACKUP_FILE%
) else (
  echo Erreur lors de la sauvegarde
)
