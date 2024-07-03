from django.urls import path
from .views import *

urlpatterns = [
    path('doctors/', DoctorListView.as_view(), name='doctor-list'),
    path('doctors/<int:doctor_id>/', delete_doctor, name='delete_doctor'),
    path('patients/', PatientListView.as_view(), name='patient-list'),
    path('patients/<int:patient_id>/', delete_patient, name='delete_patient'),
    path('patients/update_patient/<int:patient_id>/', update_patient_medicine, name='update_patient_medicine'),
    path('doctors/login/', DoctorLoginView.as_view(), name='doctor-login'),
    path('doctor/<int:doctor_id>/username/', get_doctor_username, name='get_doctor_username'),
    path('doctors/appointment', get_doctors_by_username_and_date, name='get_doctors_by_username_and_date'),
    path('doctors/<str:username>/', get_doctor_username, name='get_doctor_name'),
    path('admin/create_patient/', create_patient, name='create_appointment'),
    path('admin/add_doctor/', add_doctor, name='add_doctor'),
    path('admin_cred', admin_login, name='admin_cred'),
    path('make_appointment/', AppointmentCreateView.as_view(), name='make_appointment'),
    path('appointments/', AppointmentListView.as_view(), name='appointments_list'),
]
