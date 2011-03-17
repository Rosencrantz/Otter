from django.template import Context, loader
from django.http import HttpResponse
from fedex import models
from django.utils import simplejson
from django.core import serializers

import re



def get(request,revision):
    a = models.Agency.objects.select_related().get(id=1)
    p = models.Project.objects.get(agency=a)
    v = models.Revision.objects.filter(revision_number=revision, projects = p)
    f = models.File.objects.filter(revisions = v)
    return HttpResponse(serializers.serialize("json", f),'application/javascript')