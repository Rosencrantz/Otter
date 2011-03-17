from django.template import Context, loader
from django.http import HttpResponse, HttpResponseServerError
from fedex import models

import simplejson

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
        
        file_obj = File.objects.get(id=file_id)

        new_region = Region(x=xpos,y=ypos,width=width,height=height, \
                region_type=annotation_type,files=file_obj,title=region_title)
        new_region.save()
        
        new_comment = Comment.objects.create(comment=comment_text,user=user,region=new_region)
        new_comment.save()

        data = {}
    except KeyError:
        HttpResponseServerError("Malformed data!")
    
    HttpResponse(simplejson.dumps(data), mimetype='application/json')
    
