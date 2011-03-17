from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'fedex.views.index', name='home'),
    url(r'^upload/', 'fedex.views.upload', name='upload'),
    url(r'^/add/comments','fedex.comments.add',name="add"),
    url(r'^add/revision','fedex.revisions.add',name="addrevision"),
    url(r'^debug/','fedex.views.add_debug',name="debug")
    # url(r'^otter/', include('otter.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
