from django.contrib import admin
from fedex.models import *
from django.contrib.auth.models import User 

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
    pass

admin.site.register(Agency, AgencyAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Revision, RevisionAdmin)
admin.site.register(File, FileAdmin)
admin.site.register(Region, RegionAdmin)
admin.site.register(Comment, CommentAdmin)

adminUser = User.objects.get(username__exact='admin')
if not adminUser:
    User.objects.create_user('admin', 'admin@otter.com', 'admin')
    adminUser.is_staff = True
    adminUser.save()
else:
    adminUser.set_password('admin')
    adminUser.save()	

