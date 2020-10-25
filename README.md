# CSE110_Project
The project for CSE 110.

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


### Development
If you do not have docker, go to https://www.docker.com/products/docker-desktop to download the docker desktop. (I have no idea for windows though...)

Go through the installation process and make sure your desktop is up and running. 

Now go to terminal, open this project directory, type `docker-compose up --build`. Then open a browser, go to `localhost:5000`, then you should be able to see our starting page. 

If you made any changes, make sure you do `docker-compose down -v` to terminate the current app's running process, and type `docker-compose up --build` again to start a new testing process. 

#### TODO: Figure out how to dockerize the database

Let me know if you have any questions!!! (by Yixuan)
