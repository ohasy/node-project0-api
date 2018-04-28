@echo off
echo pushing the changes to git
git status
pause
git add .
SET /P commit_msg=Please enter your commit msg:
git commit -m "%commit_msg%"
git push -u origin master