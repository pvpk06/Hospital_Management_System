# # in myapp/models.py
from django.db import models

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    qualification = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    experience = models.IntegerField()
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    languages = models.CharField(max_length=200)
    doctor_username = models.TextField()
    doctor_password = models.CharField(max_length=50)
    class Meta:
        db_table = 'app_doctor'

    def __str__(self):
        return self.name

class Patient(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    dob = models.DateField()
    gender = models.CharField(max_length=100)
    mobile = models.IntegerField()
    address = models.TextField()
    email = models.EmailField()
    disease = models.CharField(max_length=200)
    appointmentdate = models.DateField()
    medicine_used = models.CharField(max_length=200)

    def __str__(self):
        return self.name


from django.db import models


class AdminCred(models.Model):
    admin_username = models.CharField(max_length=100)
    admin_password = models.CharField(max_length=100)

    class Meta:
        db_table = 'app_admin_cred'


class Appointment(models.Model):
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    address = models.CharField(max_length=255)
    email = models.EmailField()
    mobile = models.CharField(max_length=15)
    disease = models.CharField(max_length=255)

    def __str__(self):
        return self.name
