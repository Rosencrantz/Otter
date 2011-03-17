from django.contrib import admin
from fedex.models import OtterUser
from django.contrib.auth.models import User

class UserAdmin(admin.ModelAdmin):
    pass

admin.site.register(OtterUser, UserAdmin)

adminUser = User.objects.get(username__exact='admin')
print adminUser
if not adminUser:
    User.objects.create_user('admin', 'admin@otter.com', 'admin')
    adminUser.is_staff = True
    adminUser.save()
    print "asdasd"
else:
    adminUser.set_password('admin')
    adminUser.save()	

