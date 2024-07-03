from rest_framework.response import Response
from rest_framework import status 
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate 
from .models import Doctor, Patient
from .serializers import *
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404


class DoctorListView(APIView):
    def get(self, request):
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)

class PatientListView(APIView):
    def get(self, request):
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)


@api_view(['DELETE'])
def delete_doctor(request, doctor_id):
    try:
        doctor = Doctor.objects.get(id=doctor_id)
        doctor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
def delete_patient(request, patient_id):  # Fixed the parameter name
    try:
        patient = Patient.objects.get(id=patient_id)
        patient.delete()  # Fixed the object name
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


class DoctorLoginView(APIView):
    def post(self, request):
        doctor_username = request.data.get('doctor_username')
        doctor_password = request.data.get('doctor_password')

        try:
            doctor = Doctor.objects.get(doctor_username=doctor_username)
            if doctor.doctor_password == doctor_password:
                # Authentication successful
                return Response({'message': 'Login successful'})
            else:
                # Authentication failed
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Doctor.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json

@csrf_exempt
def admin_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            if username and password:
                with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM app_admin_cred WHERE admin_username = %s AND admin_password = %s", [username, password])
                    admin = cursor.fetchone()

                if admin:
                    return JsonResponse({'message': 'Login successful'})
                else:
                    return JsonResponse({'message': 'Invalid credentials'}, status=401)
            else:
                return JsonResponse({'message': 'Username and password required'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'message': 'Method not allowed'}, status=405)


def get_doctor_username(request, doctor_id):  # Update parameter name to doctor_id
    doctor = get_object_or_404(Doctor, pk=doctor_id)
    doctor_username = doctor.doctor_username
    return JsonResponse({'doctor_username': doctor_username})

    
def get_doctor_name(request, username):
    doctor = get_object_or_404(Doctor, doctor_username=username)
    serialized_data = DoctorSerializer(doctor).data
    return JsonResponse(serialized_data)


@api_view(['GET'])
def get_doctors_by_username_and_date(request):
    doctor_username = request.GET.get('doctor_username', None)
    date = request.GET.get('date', None)
    
    if doctor_username is None or date is None:
        return Response({'error': 'Doctor username and date must be provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    doctors = Doctor.objects.filter(doctor_username=doctor_username, appointmentdate=date)    
    serialized_doctors = [{'id': doctor.id, 'name': doctor.name, 'specialization': doctor.specialization} for doctor in doctors]
    
    return Response({'doctors': serialized_doctors})


@api_view(['POST'])
def create_patient(request):
    if request.method == 'POST':
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def add_doctor(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            serializer = DoctorSerializer(data=request.data)
            if serializer.is_valid():
                doctor = serializer.save()
                return JsonResponse({"message": "Doctor added successfully"}, status=201)
            else:
                return JsonResponse(serializer.errors, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "GET method not allowed"}, status=405)


from rest_framework import generics
from .models import Appointment
from .serializers import AppointmentSerializer

class AppointmentCreateView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppointmentListView(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer



from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Patient
from .serializers import PatientSerializer
from django.shortcuts import get_object_or_404

@api_view(['PUT'])
def update_patient_medicine(request, patient_id):
    try:
        patient = get_object_or_404(Patient, id=patient_id)
    except Patient.DoesNotExist:
        return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    medicine_used = data.get('medicine_used', None)

    if medicine_used is not None:
        patient.medicine_used = medicine_used
        patient.save()
        return Response({'message': 'Medicine updated successfully'})
    else:
        return Response({'error': 'Medicine data is required'}, status=status.HTTP_400_BAD_REQUEST)
