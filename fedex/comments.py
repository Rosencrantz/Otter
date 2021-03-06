from django.template import Context, loader
from django.http import HttpResponse, HttpResponseServerError
from fedex import models
from datetime import date
from django.core import serializers
from django.contrib.auth.models import User



from django.utils import simplejson

def getregion(request, fileid=None):
    user = request.user

    if fileid:
        ## file
        regions = models.Region.objects.filter(files=fileid)
            
        s = serializers.serialize
        return HttpResponse(s("json", regions), 'application/json')
    else:
        data = {}
        return HttpResponse(simplejson.dumps(data), mimetype='application/json')
        ## no file
 

def get(request, fileid=None):

    user = request.user

    if fileid:
        ## file
        regions = models.Region.objects.filter(files=fileid)
        comments = list()
        data = []
        for region in regions:
            comment = models.Comment.objects.get(region=region)
            comments.append(comment)
            u = User.objects.get(id=comment.user.id)
            data.append({"comment":comment.comment,"username":u.username,"displayname":u.get_full_name(),"version":region.title})

            
        print comments
        s = serializers.serialize
        #return HttpResponse(s("json", comments), 'application/json')
        return HttpResponse(simplejson.dumps(data), 'application/json')
    else:
        data = {}
        return HttpResponse(simplejson.dumps(data), mimetype='application/json')
        ## no file
    


def add(request):

    user = request.user

    print request.raw_post_data

    # create region
    json = simplejson.loads(request.raw_post_data)
    try:
        print json
        addcomment = json['addcomment']
        region = addcomment['region']

        xpos = region['x']
        ypos = region['y']
        width = region['width']
        height = region['height']
        annotation_type = region['type']
        file_id = region['file']
        region_title = region['title']

        comment = addcomment['comment']
        # crete comment
        comment_text = comment['text']
        
        file_obj = models.File.objects.get(id=file_id)

        new_region = models.Region(x=xpos,y=ypos,width=width,height=height, \
                region_type=annotation_type,files=file_obj,title=region_title)
        new_region.save()
        
        new_comment = models.Comment.objects.create(comment=comment_text,user=user, \
                region=new_region,created_at=date.today())
        new_comment.save()

        data = {}
        return HttpResponse(simplejson.dumps(data), mimetype='application/json')
    except KeyError:
        return HttpResponseServerError("Malformed data!")
    pass 
