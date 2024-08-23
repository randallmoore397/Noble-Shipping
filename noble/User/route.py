from flask import Blueprint, render_template, redirect, url_for, request

user = Blueprint('user',__name__)


#? USER DASHBOARD
@user.route('/noble/user/dashboard',methods=['GET','POST'])
def user_dashboard():
    
    title = "Dashboard"
    return render_template('user/user_dashboard.html',title=title)
