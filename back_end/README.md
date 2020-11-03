# GaryPlanner
The revolutional project for CSE 110 brought by P&C.

## Backend
### Information
We will use docker to ease the process of developmenet and deploying. Here are some links that might be useful:
- Docker Doc: https://docs.docker.com/get-started/
- Docker-compose: https://docs.docker.com/compose/

We will use PostgreSQL as our database, you can find it here: https://www.postgresql.org/

When developing database model and controllers (APIs), you should be finding these following link useful as we are using flask-sqlalchemy and blueprints. 
- Flask-Sqlalchemy: https://flask-sqlalchemy.palletsprojects.com/en/2.x/
- Flask Blueprints: https://flask.palletsprojects.com/en/1.1.x/tutorial/views/

In order to process data, I used selenium and bs4. I will also list the link here:
- selenium: https://selenium-python.readthedocs.io/
- bs4: https://www.crummy.com/software/BeautifulSoup/bs4/doc/


## Tools
### Docker
If you do not have docker, go to https://www.docker.com/products/docker-desktop to download the docker desktop. (I have no idea for windows though...)

Go through the installation process and make sure your desktop is up and running. 

### Postman
We will use postman to test out all the api routes that we will write, you can find it at https://www.postman.com/. It is a great tool that faciliate the whole process of submit request and recieve response. We need to fully test out our routes so that frontend people can use them. 

We will use postman to test out all the api routes that we will write, you can find it at https://www.postman.com/. It is a great tool that faciliate the whole process of submit request and recieve response. We need to fully test out our routes so that frontend people can use them. 

### Flake8
We will use a linter for python code that we write. I strongly recommend using VScode. If you are using it, make sure you `pip install flask8` to enable the linter.

## Developmenet
Make sure your docker application is running,

Now go to terminal, open this project directory, type `docker-compose up --build`. Then open a browser, go to `localhost:5000`, then you should be able to see our starting page. 

If you made any changes, make sure you do `docker-compose down -v` to terminate the current app's running process, and type `docker-compose up --build` again to start a new testing process. 

In the process of your development, it might be useful to have access to database and exam the data in it. To do this, open another terminal (right click on the terminal in vscode can do this), enter `docker-compose exec db psql --username=gary_planner --dbname=gary_planner_db`. Once you logged in as a db user, type `\c gary_planner_db` to connect to the db, and you can do general postgres operations in it. Here is a cheatsheet for postgres: https://www.postgresqltutorial.com/postgresql-cheat-sheet/.


### What you can play around already!
I have created a user model and user api. You can actually submit request  through the api routes and see things happen in our website. What you can do is the following:

Open up postman, send a **POST** request, set the url to be http://localhost:5000/api/users/get_users, in the navbar, go to body, click raw, in the dropdown, set the type of body to be `json` format. Now, copy this following piece of `json` code in it ```json{"name": "Gary"}```and click subimit. You can change the name and submit it again to create multiple users.

After doing that, we can also see a list of users currently in our database. To do that, in postman, create a **GET** request to http://localhost:5000/api/users/get_users, level everything empty and submit the request, you should see something like
```json
{
  "reason": "success", 
  "result": [
    {
      "id": 1, 
      "name": "Gary"
    }
  ]
}
```

Let me know if you have any questions!!! (by Yixuan)
