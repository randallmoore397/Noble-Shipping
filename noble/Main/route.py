from flask import Blueprint, render_template, redirect, url_for, request
main = Blueprint('main',__name__)



@main.route('/login',methods=['GET','POST'])
def login():
    
    title = "Login"
    return render_template('main/login.html',title=title)


@main.route('/',methods=['GET','POST'])
def index():
    
    title = "home"
    return render_template('main/index.html',title=title)


@main.route('/aircargo/tracking',methods=['GET','POST'])
def air_cargo_tracking():
    
    title = "Air Cargo Tracking"
    return render_template('main/aircargo-tracking.html',title=title)

@main.route('/container/tracking',methods=['GET','POST'])
def container_tracking():
    
    title = "Container Tracking"
    return render_template('main/container-tracking.html',title=title)


@main.route('/our/services',methods=['GET','POST'])
def our_services():
    
    title = "Our Services"
    return render_template('main/aircargo-tracking.html',title=title)


@main.route('/contact/us',methods=['GET','POST'])
def contact_us():
    
    title = "Contact Us"
    return render_template('main/contact_us.html',title=title)


@main.route('/about/us',methods=['GET','POST'])
def about_us():
    
    title = "About Us"
    return render_template('main/about-us.html',title=title)





