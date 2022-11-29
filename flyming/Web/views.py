from django.shortcuts import render
from django.core.mail import send_mail

# Create your views here.
def contact(request):
    if request.method == "POST":
        name = request.POST['name']
        email = request.POST['email']
        subject = request.POST['subject']
        content = request.POST['content']

        send_mail(subject, content, email, )