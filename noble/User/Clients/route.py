from flask import Blueprint, render_template, redirect, url_for, request

client = Blueprint('client',__name__)


#? CLIENT DASHBOARD
@client.route('/noble/client/dashboard',methods=['GET','POST'])
def client_dashboard():
    
    title = "Dashboard"
    return render_template('client/client_dashboard.html',title=title)

#? client PROFILE
@client.route('/noble/client/profile',methods=['GET','POST'])
def client_profile():
    
    title = "My Profile"
    return render_template('client/client_profile.html',title=title)

#? client EDIT PROFILE 
@client.route('/noble/client/edit/profile',methods=['GET','POST'])
def client_edit_profile():
    
    title = "Edit Profile"
    return render_template('client/client_edit_profile.html',title=title)

#? client RESET PROFILE PASSWORD
@client.route('/noble/client/reset/account/password',methods=['GET','POST'])
def client_password():
    
    title = "Reset Password"
    return render_template('client/client_reset_profile_password.html',title=title)