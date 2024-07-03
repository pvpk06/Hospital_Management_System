
from django.urls import path, include
from django.http import HttpResponse,HttpResponseRedirect

urlpatterns = [
    path('api/', include('app.urls')),
]
