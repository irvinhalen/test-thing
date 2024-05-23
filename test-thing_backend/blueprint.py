# Register this blueprint by adding the following line of code 
# to your entry point file.  
# app.register_functions(blueprint) 
# 
# Please refer to https://aka.ms/azure-functions-python-blueprints


import azure.functions as func
import logging
import requests

bp = func.Blueprint()

@bp.route(route="fake_browse", auth_level=func.AuthLevel.ANONYMOUS)
def fake_browse(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    api_url = "https://fakestoreapi.com/products"
    category = req.params.get('category')

    if category:
        try:
            res = requests.get(api_url + '/category/' + category)
            if len(res.json()) > 0:
                return func.HttpResponse(f"Category - {category}: {res.json()}")
            else:
                try:
                    res = requests.get(api_url + '/categories')
                    return func.HttpResponse(f'Category "{category}" does not exist. Try these categories instead: {res.json()}')
                except Exception as e:
                    return func.HttpResponse(f"Error: {str(e)}", status_code=500)
        except Exception as e:
            return func.HttpResponse(f"Error: {str(e)}", status_code=500)
    else:
        try:
            res = requests.get(api_url)
            return func.HttpResponse(f"Fake Catalogue: {res.json()}", status_code=200)
        except Exception as e:
            return func.HttpResponse(f"Error: {str(e)}", status_code=500)
