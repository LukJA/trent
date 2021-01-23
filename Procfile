release: python manage.py makemigrations && python manage.py migrate
web: gunicorn fintrent.wsgi --log-file -
