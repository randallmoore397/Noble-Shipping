from flask import Blueprint, render_template, redirect, url_for, request
from noble import db, bcrypt,user_datastore
from flask_security import current_user
from flask_security import login_required, current_user,roles_required, login_user, utils,roles_accepted,logout_user 
from noble.Main.forms import ExtendedLogin,ContainerTracking,AircargoTracking
from noble.models import Staffs, User, Staffs,Aircargo, Cargo
from flask.helpers import flash
from datetime import datetime
from noble.User.utils import validate_tracking_number

main = Blueprint('main',__name__)



@main.route('/logout',methods=['GET','POST'])
def logout():
    logout_user() 

    return redirect(url_for('main.login'))


@main.route('/login',methods=['GET','POST'])
def login():
    ExtendedLoginForm = ExtendedLogin()
    if current_user.is_authenticated:
        #* AFTER SUCCESSFULLY LOGIN REDIRECT USER TO NEXT ROUTE IF ANY
        # next_url = session.get('next_url')
        # if next_url:
        #     session.pop('next_url', None)  # Remove the stored URL
        #     return redirect(next_url)
        # else:
        #     pass
        
        if  current_user.has_role('admin'):
            return redirect(url_for('admin.admin_dashboard'))
        elif current_user.has_role('staff'):
            return redirect(url_for('admin.admin_dashboard'))

    is_exist = Staffs.query.filter_by(user_attribute='admin').first()
    if is_exist:
        pass
    else:
        #* CREATE A SUPER USER ACCOUNT MY DEFAULT
        default_password = 'NobleTracking@231' # PASSWORD
        StaffRole1 = 'admin'
        StaffRole2 = 'Administrator'
        staff_ID = 'SUP-MAX100'
        staffEmail = 'nobleshipping@gmail.com'
        sex = 'Male'
        first_name = 'Randall'
        middle_name = 'Alexander'
        last_name = 'Moore'
        phone1 = '0778065593'
        address = 'St. Mark Junction, Airfield, Sinkor Monrovia'

        # ADDING NEW USER TO USERDATA STORE
        hashed_password = bcrypt.generate_password_hash(default_password).decode('utf-8')
        adduser = user_datastore.create_user(user_id=staff_ID,email=staffEmail,password=hashed_password)
        db.session.commit()
        

        # userId = User.query.filter_by(email=staffEmail).first()
        addinfo = Staffs(
                first_name = first_name,
                middle_name = middle_name,
                last_name = middle_name,
                position = StaffRole2,
                gender = sex,
                telephone_phone = '',
                mobile = phone1,
                user_attribute = StaffRole1,
                address = address,
                user_id = adduser.id
                
        )
        db.session.add(addinfo)
        db.session.commit()

        add_new_role = user_datastore.find_or_create_role(StaffRole1)
        user_datastore.add_role_to_user(adduser, add_new_role)
        db.session.commit()
        
        return redirect(url_for('main.login'))
    
    
    if ExtendedLoginForm.validate_on_submit():
        print('-------------------->> Form Validated successfully')
        user_session = User.query.filter_by(email=ExtendedLoginForm.email.data).first()


        if user_session and bcrypt.check_password_hash(user_session.password,ExtendedLoginForm.password.data):
            login_user(user_session,ExtendedLoginForm.remember.data)
            
            
            user_session.last_login_at = datetime.now()
            user_session.last_login_ip = request.remote_addr
            db.session.commit()

            
            if current_user.user_staff:               
                if  current_user.has_role('admin'):
                    return redirect(url_for('admin.admin_dashboard'))
                elif current_user.has_role('staff'):
                    return redirect(url_for('admin.admin_dashboard'))
            
        else:
            # session["error"] = f"invalid credentials..."
            flash(r'Authentication Failed!','error')
            print("Password Check Failed.....")
    
    # if ExtendedLoginForm.submit():
    #     pass
    title = "Login"
    return render_template('main/login.html', title=title, ExtendedLoginForm=ExtendedLoginForm)



@main.route('/',methods=['GET','POST'])
def index():
    
    title = "home"
    return render_template('main/index.html',title=title)


@main.route('/aircargo/tracking',methods=['GET','POST'])
def air_cargo_tracking():
    AircargoTrackingForm = AircargoTracking()
    
    if AircargoTrackingForm.validate_on_submit():
        tracking_number = AircargoTrackingForm.tracking_number.data
        #? VALIDATE THE TRACKING NUMBER BEFORE RENDERING RESULTS
        is_valid = validate_tracking_number(tracking_number)
        if is_valid == True:
            return redirect(url_for('main.air_cargo_tracking_results',tracking_number=tracking_number))
        else:
            flash(f"This Tracking is not valid, please check number and try again",'error')
            return redirect(url_for('main.air_cargo_tracking'))
    
    title = "Air Cargo Tracking"
    return render_template('main/aircargo-tracking.html',title=title,AircargoTrackingForm=AircargoTrackingForm)



@main.route('/aircargo/tracking/results/<string:tracking_number>',methods=['GET','POST'])
def air_cargo_tracking_results(tracking_number):
    tracking_details = Aircargo.query.filter_by(tracking_number=tracking_number).first()
    if tracking_details:
        pass
    else:
        flash(f"This Tracking Number is not a valid Aircargo Tracking Number ",'error')
        return redirect(url_for('main.air_cargo_tracking'))
        
    
    title = "Aircargo Tracking Results"
    return render_template('main/aircargo-tracking-results.html',title=title,tracking_details=tracking_details)



@main.route('/container/tracking',methods=['GET','POST'])
def container_tracking():
    ContainerTrackingForm = ContainerTracking()
    if ContainerTrackingForm.validate_on_submit():
        tracking_number = ContainerTrackingForm.tracking_number.data
        #? VALIDATE THE TRACKING NUMBER BEFORE RENDERING RESULTS
        is_valid = validate_tracking_number(tracking_number)
        if is_valid == True:
            return redirect(url_for('main.container_tracking_results',tracking_number=tracking_number))
        else:
            flash(f"This Tracking is not valid, please check number and try again",'error')
            return redirect(url_for('main.container_tracking'))
    
    title = "Container Tracking"
    return render_template('main/container-tracking.html',title=title,ContainerTrackingForm=ContainerTrackingForm)



@main.route('/container/tracking/results/<string:tracking_number>',methods=['GET','POST'])
def container_tracking_results(tracking_number):
    tracking_details = Cargo.query.filter_by(tracking_number=tracking_number).first()
    if tracking_details:
        pass
    else:
        flash(f"This Tracking Number is not a valid Container Cargo Tracking Number ",'error')
        return redirect(url_for('main.container_tracking'))
        
    
    title = "Aircargo Tracking Results"
    return render_template('main/container-tracking-results.html',title=title,tracking_details=tracking_details)


@main.route('/our/services',methods=['GET','POST'])
def our_services():
    
    title = "Our Services"
    return render_template('main/our-service.html',title=title)


@main.route('/contact/us',methods=['GET','POST'])
def contact_us():
    
    title = "Contact Us"
    return render_template('main/contact_us.html',title=title)


@main.route('/about/us',methods=['GET','POST'])
def about_us():
    
    title = "About Us"
    return render_template('main/about-us.html',title=title)





#? All Services
@main.route('/services/all',methods=['GET','POST'])
def all_service():
    
    title = "All Services"
    return render_template('main/our-service.html',title=title)

#? Aircargo-services
@main.route('/services/aircargo',methods=['GET','POST'])
def services_aircargo():
    
    title = "Aircargo Services"
    return render_template('main/services-aircargo.html',title=title)

#? Container-services
@main.route('/services/container',methods=['GET','POST'])
def services_container():
    
    title = "Container Services"
    return render_template('main/services-container.html',title=title)

#? Parcel-services
@main.route('/services/parcel',methods=['GET','POST'])
def services_parcel():
    
    title = "Parcel Services"
    return render_template('main/services-parcel.html',title=title)


#? Security-guard-services
@main.route('/services/security/guard',methods=['GET','POST'])
def services_security_guard():
    
    title = "Security Guard Services"
    return render_template('main/security-guard.html',title=title)

#? goods-logistics-services
@main.route('/services/goods/logistics',methods=['GET','POST'])
def services_goods_logistics():
    
    title = "Logistics Services"
    return render_template('main/services-logistics.html',title=title)

#? bullion-vault-services
@main.route('/services/bullion/vault',methods=['GET','POST'])
def services_bullion_vault():
    
    title = "Bullion Vault Services"
    return render_template('main/services-bullion-vault.html',title=title)



