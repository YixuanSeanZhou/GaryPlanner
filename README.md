# GaryPlanner
The revolutional project for CSE 110 brought by P&C.

# Installation Procedure

Install Docker from https://www.docker.com/get-started 
Install Node from https://nodejs.org/en/
npm -v: 6.14.8 and above
node -v: 14.15.1 and above
git clone the repo by `git clone https://github.com/YixuanSeanZhou/GaryPlanner`

Open the project in a terminal: `cd GaryPlanner`

In your terminal type:
`cd back_end`
`docker-compose up --build`
Wait for the installation happens and the terminal is printing "Running on....."

If the above step has an error message: "Error: cannot start service mounts denied file not found", open the docker desktop, go to preference, go to experimental features, switch off Use gRPC FUSE for file sharing.

If the above step says back_end_web_1 exited with error code 1, you need to change the encoding of entrypoint.sh from CRLF to LF. You do this by open up `/back_end/entrypoint.sh` in VSCode, go to the bottom right of the screen, select CRLF, and change it to LF. (That is usually only a problem for Windows).

Open another terminal, go the project, type
`cd back_end`
`cat data_dump.sql | docker exec -i back_end_db_1 psql -U gary_planner -d gary_planner_db`

This will prepopulate the database. 

If it shows invalid byte sequence error message, change the `data_dump.sql` file to utf-8. (This can be done via open the file in VSCode, clicking the encoding on the bottom right corner, and choosing utf-8). And then rerun the above commend again. 

Ignore all the other error messages.

Once the population is over, this terminal is no longer needed.

Open another terminal and navigate to the project.

In your terminal, type:
`cd ..`
`cd front-end`
`npm install`
`npm run dev`

Wait for the frontend to be compiled, and open up a new tab in chrome and go to http://localhost:3000. 

We will divide into frontend and backend, please refer the readme in differnt dir for guidence.

## Github Workflow Guide
Please don't try to memorize the steps as they are only a guide. It can be a little flexible.
1. Create an issue on the project board (*optional*)
2. Assign the issue to yourself.
3. Create a new branch on GitHub based on the issue you are working on. *Name your branch by the issue's name.*
4. Use the command `git pull` in your file directory when you are on the main branch.
5. `git checkout <your branch name goes here>`
6. Write code. 
7. `git pull`, `git merge main` to make sure there will not be a conflict between main branch and your branch.
8. **Test your code**
9. `git add *`, then `git commit -m "decription of the commit"`
10. Submit a Pull Request, add at least one reviewer, and link your issus on GitHub.
11. Wait for review, make changes if needed.
12. Delete the branch after merging.
