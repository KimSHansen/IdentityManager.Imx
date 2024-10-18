start /wait cmd /c npm run build:lib qbm && cd .\dist\qbm && tar -a -c -f ..\Html_qbm.zip * && cd ..\..\ 
start /wait cmd /c npm run build:lib qer && cd .\dist\qer && tar -a -c -f ..\Html_qer.zip * && cd ..\..\ 
start /wait cmd /c npm run build:lib tsb && cd .\dist\tsb && tar -a -c -f ..\Html_tsb.zip * && cd ..\..\
start /wait cmd /c npm run build:lib att && cd .\dist\att && tar -a -c -f ..\Html_att.zip * && cd ..\..\
start /wait cmd /c npm run build:lib rms && cd .\dist\rms && tar -a -c -f ..\Html_rms.zip * && cd ..\..\
start /wait cmd /c npm run build:lib aad && cd .\dist\aad && tar -a -c -f ..\Html_aad.zip * && cd ..\..\
start /wait cmd /c npm run build:lib aob && cd .\dist\aob && tar -a -c -f ..\Html_aob.zip * && cd ..\..\
start /wait cmd /c npm run build:lib uci && cd .\dist\uci && tar -a -c -f ..\Html_uci.zip * && cd ..\..\
start /wait cmd /c npm run build:lib cpl && cd .\dist\cpl && tar -a -c -f ..\Html_cpl.zip * && cd ..\..\
start /wait cmd /c npm run build:lib dpr && cd .\dist\dpr && tar -a -c -f ..\Html_dpr.zip * && cd ..\..\
start /wait cmd /c npm run build:lib rmb && cd .\dist\rmb && tar -a -c -f ..\Html_rmb.zip * && cd ..\..\
start /wait cmd /c npm run build:lib rps && cd .\dist\rps && tar -a -c -f ..\Html_rps.zip * && cd ..\..\
start /wait cmd /c npm run build:lib o3t && cd .\dist\o3t && tar -a -c -f ..\Html_o3t.zip * && cd ..\..\
start /wait cmd /c npm run build:lib olg && cd .\dist\olg && tar -a -c -f ..\Html_olg.zip * && cd ..\..\
start /wait cmd /c npm run build:lib hds && cd .\dist\hds && tar -a -c -f ..\Html_hds.zip * && cd ..\..\
start /wait cmd /c npm run build:lib pol && cd .\dist\pol && tar -a -c -f ..\Html_pol.zip * && cd ..\..\
start /wait cmd /c npm run build:lib apc && cd .\dist\apc && tar -a -c -f ..\Html_apc.zip * && cd ..\..\
start /wait cmd /c npm run build:lib sac && cd .\dist\sac && tar -a -c -f ..\Html_sac.zip * && cd ..\..\
start /wait cmd /c npm run build:app qer-app-portal && cd .\dist\qer-app-portal && rmdir /s /q .\HTML & tar -a -c -f ..\Html_qer-app-portal.zip * && cd ..\..\
start /wait cmd /c npm run build:app qbm-app-landingpage && cd .\dist\qbm-app-landingpage && rmdir /s /q .\HTML & tar -a -c -f ..\Html_qbm-app-landingpage.zip * && cd ..\..\
start /wait cmd /c npm run build:app qer-app-operationssupport && cd .\dist\qer-app-operationssupport && rmdir /s /q .\HTML & tar -a -c -f ..\Html_qer-app-operationssupport.zip * && cd ..\..\
start /wait cmd /c npm run build:app qer-app-pwdportal && cd .\dist\qer-app-pwdportal && rmdir /s /q .\HTML & tar -a -c -f ..\Html_qer-app-pwdportal.zip * && cd ..\..\

