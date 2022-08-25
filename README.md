# Django Admin MVP

## Running

```
python -m pip install django

python manage.py runserver --nostatic

open http://localhost:8000/@perpay-admin/demo/01-simple/
```

The `--nostatic` flag makes it so the middleware can reroute requests to static files

## Porting to a real app

- Add the `portal` app in the `INSTALLED_APPS` list in `settings.py`
- Add the `portal.middleware` middleware to the `MIDDLEWARE` list in `settings.py`

That shoulddd be all that's needed
