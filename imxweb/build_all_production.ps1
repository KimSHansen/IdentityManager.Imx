# Create a list of commands
$commands = @(
    "npm run build:lib qbm; tar -acf .\dist\Html_qbm.zip -C .\dist\qbm *",
    "npm run build:lib qer; tar -acf .\dist\Html_qer.zip -C .\dist\qer *",
    "npm run build:lib tsb; tar -acf .\dist\Html_tsb.zip -C .\dist\tsb *",
    "npm run build:lib att; tar -acf .\dist\Html_att.zip -C .\dist\att *",
    "npm run build:lib rms; tar -acf .\dist\Html_rms.zip -C .\dist\rms *",
    "npm run build:lib aad; tar -acf .\dist\Html_aad.zip -C .\dist\aad *",
    "npm run build:lib aob; tar -acf .\dist\Html_aob.zip -C .\dist\aob *",
    "npm run build:lib uci; tar -acf .\dist\Html_uci.zip -C .\dist\uci *",
    "npm run build:lib cpl; tar -acf .\dist\Html_cpl.zip -C .\dist\cpl *",
    "npm run build:lib dpr; tar -acf .\dist\Html_dpr.zip -C .\dist\dpr *",
    "npm run build:lib rmb; tar -acf .\dist\Html_rmb.zip -C .\dist\rmb *",
    "npm run build:lib rps; tar -acf .\dist\Html_rps.zip -C .\dist\rps *",
    "npm run build:lib o3t; tar -acf .\dist\Html_o3t.zip -C .\dist\o3t *",
    "npm run build:lib olg; tar -acf .\dist\Html_olg.zip -C .\dist\olg *",
    "npm run build:lib hds; tar -acf .\dist\Html_hds.zip -C .\dist\hds *",
    "npm run build:lib pol; tar -acf .\dist\Html_pol.zip -C .\dist\pol *",
    "npm run build:lib apc; tar -acf .\dist\Html_apc.zip -C .\dist\apc *",
    "npm run build:lib sac; tar -acf .\dist\Html_sac.zip -C .\dist\sac *",
    "npm run build:app qer-app-portal; if (Test-Path -Path .\dist\qer-app-portal\HTML) { Remove-Item -Path .\dist\qer-app-portal\HTML -Recurse -Force }; tar -acf .\dist\Html_qer-app-portal.zip -C .\dist\qer-app-portal *",
    "npm run build:app qbm-app-landingpage; if (Test-Path -Path .\dist\qbm-app-landingpage\HTML) { Remove-Item -Path .\dist\qbm-app-landingpage\HTML -Recurse -Force }; tar -acf .\dist\Html_qbm-app-landingpage.zip -C .\dist\qbm-app-landingpage *",
    "npm run build:app qer-app-operationssupport; if (Test-Path -Path .\dist\qer-app-operationssupport\HTML) { Remove-Item -Path .\dist\qer-app-operationssupport\HTML -Recurse -Force }; tar -acf .\dist\Html_qer-app-operationssupport.zip -C .\dist\qer-app-operationssupport *",
    "npm run build:app qer-app-pwdportal; if (Test-Path -Path .\dist\qer-app-pwdportal\HTML) { Remove-Item -Path .\dist\qer-app-pwdportal\HTML -Recurse -Force }; tar -acf .\dist\Html_qer-app-pwdportal.zip -C .\dist\qer-app-pwdportal *"
)

# Loop through each command and run it
foreach ($command in $commands) {
    Write-Host "Running: $command"
    Invoke-Expression $command
}


