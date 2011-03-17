from django.template import Context, loader
from django.http import HttpResponse
from fedex import models
import re


def generate_next_revision(current_revision):
    p = re.compile('\d+')
    number = p.findall(current_revision)[0]
    number = int(number) + 1;
    return str("v"+ str(number))

def add(request):
    filename =  request.META["HTTP_FILE_NAME"]
    version = request.META["HTTP_REVISION"]
    filedata = request.raw_post_data
    a = models.Agency.objects.select_related().get(id=1)
    p = models.Project.objects.get(agency=a)
    version = generate_next_revision(version)
    r = models.Revision(revision_number=version,projects = p)
    r.save()
    f = models.File(name = filename,filedata = filedata, revisions = r)
    f.save()
    return HttpResponse(version)