from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('cakes/',views.cakes, name='cakes'),
    path('booking/', views.booking, name='booking'),
    path('contact/', views.contact, name='contact'),
]