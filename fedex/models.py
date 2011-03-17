from django.db import models

# Create your models here.
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
    filepath = models.CharField(max_length=40)
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
    user_display_name = models.CharField(max_length=40)
    comment = models.CharField(max_length=10000)
    regions = models.ForeignKey(Region)



