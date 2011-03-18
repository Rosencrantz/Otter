from django.template import Context, loader
from django.http import HttpResponse, HttpResponseRedirect
import re
from fedex import models
from django.contrib.auth.models import User


def get_revs(project):
    revs = models.Revision.objects.filter(projects=project)
    highest = 0
 
    if len(revs) is 0:
        return None,None
    
    highest_rev = revs[0]
    p = re.compile('\d+')
    for rev in revs:
        number = p.findall(rev.revision_number)[0]
        if number > highest:
            highest = number
            highest_rev = rev
    
    return revs,highest_rev.revision_number
             
    

def get_project():
    return models.Project.objects.get(id=1)

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

    user = request.user
    userObj = User.objects.get(username=user)

    project = get_project()
    revs, highest_rev = get_revs(project)
    t = loader.get_template('index.html')
    print user
    c = Context({
         "current_version" : highest_rev,
         "revisions" : revs,
         "username" : userObj.username,
         "displayname" : userObj.get_full_name()
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
    
    
