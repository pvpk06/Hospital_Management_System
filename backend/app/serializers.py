# in myapp/serializers.py
from rest_framework import serializers
from .models import *

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'name', 'specialization', 'qualification', 'location', 'experience', 'email', 'phone', 'languages', 'doctor_username', 'doctor_password']

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'firstname', 'lastname', 'dob', 'gender', 'mobile', 'address', 'email', 'disease', 'appointmentdate', 'medicine_used']


from rest_framework import serializers
from .models import Patient

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminCred
        fields = ['username', 'password']


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'