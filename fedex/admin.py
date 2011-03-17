from django.contrib import admin
from fedex.models import *
from django.contrib.auth.models import User

from django.contrib.auth.admin import User

class OtterUserAdmin(admin.ModelAdmin):
    list_display = ('username','email','first_name', 'last_name','password')

class AgencyAdmin(admin.ModelAdmin):
    pass

class ProjectAdmin(admin.ModelAdmin):
    pass

class RevisionAdmin(admin.ModelAdmin):
    pass

class FileAdmin(admin.ModelAdmin):
    pass

class RegionAdmin(admin.ModelAdmin):
    pass

class CommentAdmin(admin.ModelAdmin):
    list_display = ('comment','user')

admin.site.unregister(User)
admin.site.register(User, OtterUserAdmin)
admin.site.register(Agency, AgencyAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Revision, RevisionAdmin)
admin.site.register(File, FileAdmin)
admin.site.register(Region, RegionAdmin)
admin.site.register(Comment, CommentAdmin)

def createUser(username,firstname,lastname,email,staff=False):
    try:
    	user = User.objects.get(username__exact=username)
    except User.DoesNotExist:
	user = User.objects.create_user(username,email,'password')
    	user.first_name = firstname
    	user.last_name = lastname
    	user.email = email
    	user.is_staff = staff
    	user.save()
	


createUser('admin','Admin','','admin@otter.com',True)
createUser('danj@otter.com','Dan','Johnson','danj@otter.com',False)
createUser('gsmith@otter.com','Granny','Smith','gsmith@otter.com',False)
