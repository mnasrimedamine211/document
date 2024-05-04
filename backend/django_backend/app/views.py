
from .models import document_collection
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


def index(request): 
    return HttpResponse("<h1> App is running </h1>")

@csrf_exempt  
def add_document(request):
    if request.method == 'POST' and request.body:
        try:
            data = json.loads(request.body)
            record = {
                "text": data['text'],
                "annotations": data['annotations']
            }
            document_collection.insert_one(record)
            return JsonResponse({"message": "New document is added"}, status=201)
        except json.JSONDecodeError as e:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    return JsonResponse({"error": "Bad request"}, status=400)
       
def get_all_document(request):
    try:
        documents = list(document_collection.find())
        data = [{"text": doc["text"], "annotations": doc["annotations"]} for doc in documents]
        return JsonResponse(data, safe=False)
    except Exception as e:
        # Log the exception or print it to your console
        print(str(e))
        return JsonResponse({"error": "Error retrieving documents"}, status=500)
