# trent
Hex 2021

# Setup guide
1. Create a virtual environment via conda or virtualenv
2. Install python requirements:
````
pip install -r requirements.txt
````
3. Run the migrations for the database
````
python manage.py migrate
````
4. Run the server locally:
````
python manage.py runserver
````
5. Navigate to [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to view the website

# License
See WTFPL [here](https://en.wikipedia.org/wiki/WTFPL)
