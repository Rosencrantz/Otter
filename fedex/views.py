from django.template import Context, loader
from django.http import HttpResponse, HttpResponseRedirect
from fedex import models

def render_template(name, context=Context({})):
    return loader.get_template(name).render(context)

def isGet(req):
    return req.method == 'GET'

def login(request):

    from django.contrib.auth import authenticate, login

    if isGet(request):
        return HttpResponse(render_template('login.html'))
    else:
        email = request.POST['email']
        password = request.POST['password']

        user = authenticate(username=email, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('/')
            else:
                pass
                # disabled account
        else:
            return HttpResponse(render_template('login.html', Context({'error':True})))
    pass

def index(request):

    if not request.user.is_authenticated():
        return HttpResponseRedirect('/login')

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
    
    
