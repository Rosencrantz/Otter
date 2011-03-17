from django.template import Context, loader
from django.http import HttpResponse
from fedex import models

def index(request):
    t = loader.get_template('index.html')
    c = Context({
    })
    return HttpResponse(t.render(c))
    
    

def upload(request):
    t = loader.get_template('index.html')
    c = Context({
    
    })
    return HttpResponse(t.render(c))
    
def add_debug(request):
    a = models.Agency(name='otter designs')
    a.save()
    p = models.Project(name='project otter',agency=a)
    p.save()
    
    