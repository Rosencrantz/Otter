from django.template import Context, loader
from django.http import HttpResponse
from fedex import models


def generate_next_revision(current_revision):
    return current_revision

def add(request):
    filename =  request.META["HTTP_FILE_NAME"]
    filedata = request.POST
    f = models.File(name = filename,filedata = filedata)
    f.save()
    return HttpResponse(filename)