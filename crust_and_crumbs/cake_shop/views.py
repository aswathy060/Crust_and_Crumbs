from django.shortcuts import render, redirect
from .models import CakeBooking, Cake

def home(request):
    cakes = Cake.objects.all()
    return render(request, 'cake_shop/index.html', {'cakes': cakes})


def cakes(request):
    cakes = Cake.objects.all()
    return render(request, 'cake_shop/cakes.html', {'cakes': cakes})

def contact(request):
    return render(request, 'cake_shop/contact.html')

def booking(request):

    if request.method == 'POST':

        customer_name = request.POST.get('customer_name')
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        flavour = request.POST.get('flavour')
        cake_size = request.POST.get('cake_size')
        quantity = request.POST.get('quantity')
        booking_date = request.POST.get('booking_date')
        message = request.POST.get('message')

        CakeBooking.objects.create(
            customer_name=customer_name,
            phone=phone,
            email=email,
            flavour=flavour,
            cake_size=cake_size,
            quantity=quantity,
            booking_date=booking_date,
            message=message
        )

        return redirect('home')

    return render(request, 'cake_shop/booking.html')
