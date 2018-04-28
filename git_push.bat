@echo off
echo pushing the changes to git
git status
pause
git add .
SET /P commit_msg=Please enter your commit msg:
git commit -m "%commit_msg%"
git push -u origin master
echo pushed to git successfully.
pause
SET /P push_heroku=Do you want to push it to heroku also y or n:
echo %push_heroku%
IF %push_heroku%==y GOTO HEROKU_PUSH
GOTO END
:HEROKU_PUSH
echo puhsing to heroku
git push -u heroku master
echo pushed to heroku successfully.
:END
pause