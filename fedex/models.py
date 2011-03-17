from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class OtterUser(models.Model):
    user_display_name = models.CharField(max_length=40)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=40)
    user_type = (
        ('D', 'Designer'),
        ('G', 'General'),
    )

class Agency(models.Model):
    name = models.CharField(max_length=40)

class Project(models.Model):
    name = models.CharField(max_length=40)
    agency = models.ForeignKey(Agency)

class Revision(models.Model):
    revision_number = models.CharField(max_length=40)
    projects = models.ForeignKey(Project)

class File(models.Model):
    name = models.CharField(max_length=40)
    filedata = models.TextField()
    revisions = models.ForeignKey(Revision)
    
class Region(models.Model):
    x = models.FloatField()
    y = models.FloatField()
    width = models.FloatField()
    height = models.FloatField()
    annotation_type = (
        ('D', 'Designer'),
        ('G', 'General'),
    )
    region_type = models.CharField(max_length=1, choices=annotation_type)
    files = models.ForeignKey(File)
    
class Comment(models.Model):
    user = models.OneToOneField(User)
    comment = models.CharField(max_length=10000)
    region = models.ForeignKey(Region)
    created_at = models.DateField()
    parent = models.ForeignKey('self', null=True, related_name='parent_comment')

