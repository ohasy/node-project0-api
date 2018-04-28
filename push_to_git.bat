@echo off
echo pushing the changes to git
git status
pause
git add .
SET /P commit_msg=Please enter your commit msg:
git commit -m "%commit_msg%"
git push -u origin master
pause
SET /P push_heroku=Do you want to push it to heroku also:
IF %push_heroku%=="y" GOTO HEROKU_PUSH
GOTO END
:HEROKU_PUSH
echo puhsing to heroku
git push -u origin heroku
echo puhed to heroku successfully.
:END
echo pushed to git successfully.
pause