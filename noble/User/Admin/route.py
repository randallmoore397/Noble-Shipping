from noble import db
from flask import Blueprint, render_template, redirect, url_for, request
from noble.Shipping.forms import ContainerTracking,ContainerTrackingHistory
from noble.Airline.forms import AircargoTracking,AircargoTrackingHistory
from noble.Airline.utils import generate_flight_number,generate_airway_bill_number
from noble import db, bcrypt,user_datastore
from noble.User.utils import generate_tracking_number,validate_tracking_number
from noble.User.Admin.forms import Registration,ResetMyPassword,ResetPassword,MyProfile
from noble.User.Admin.utils import save_profile,userIDGenerator,gen_QRCode
from noble.models import Cargo,Aircargo,Staffs,User,AircargoStatusHistory,CargoStatusHistory,RequestQuote,GetInTouch
from datetime import datetime, date
from flask.helpers import flash
from flask_security import login_required, current_user,roles_required, login_user, utils,roles_accepted,logout_user 

admin = Blueprint('admin',__name__)


#? ADMIN DASHBOARD
@admin.route('/noble/admin/dashboard',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_dashboard():
    
    #? TOTAL AIRCARGO TRACKING
    total_aircargo_tracking = None
    air_tracking = Aircargo.query.all()
    total_aircargo_tracking = len(air_tracking)
    print(f'air_tracking :{air_tracking}')
    print(f'total_aircargo_tracking :{total_aircargo_tracking}')
    
    #? TOTAL CONTAINER CARGO TRACKING
    total_container_cargo_tracking = None
    container_tracking = Cargo.query.all()
    total_container_cargo_tracking = len(container_tracking)
    print(f'container_tracking :{container_tracking}')
    print(f'total_container_cargo_tracking :{total_container_cargo_tracking}')
    
    #? TOTAL ACTIVE USERS
    total_active_users = None
    users = User.query.all()
    total_active_users = len(users)
    print(f'users :{users}')
    print(f'total_active_users :{total_active_users}')
    
    #? TOTAL VISITORS TODAY
    total_visitors_total = None
    
    #? 10 RECENT AIRCARGO
    ten_recent_aircargo = Aircargo.query.order_by(Aircargo.id.desc()).limit(10).all()
    
    #? 10 RECENT CONTAINER CARGO
    ten_recent_container_cargo = Cargo.query.order_by(Cargo.id.desc()).limit(10).all()
    print(f"ten_recent_container_cargo: {ten_recent_container_cargo}")
    
    
    title = "Dashboard"
    return render_template(
        'admin/admin_dashboard.html',
        title=title,
        total_aircargo_tracking=total_aircargo_tracking,
        total_container_cargo_tracking=total_container_cargo_tracking,
        total_active_users=total_active_users,
        total_visitors_total=total_visitors_total,
        ten_recent_aircargo=ten_recent_aircargo,
        ten_recent_container_cargo=ten_recent_container_cargo
    )

#? admin PROFILE
@admin.route('/noble/admin/profile',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_profile():
    MyProfileForm = MyProfile()
    
    if MyProfileForm.validate_on_submit(): #request.method == 'POST'
        current_user.email = MyProfileForm.email.data
        current_user.user_staff[0].first_name = MyProfileForm.first_name.data
        current_user.user_staff[0].middle_name = MyProfileForm.middle_name.data
        current_user.user_staff[0].last_name = MyProfileForm.last_name.data
        # current_user.user_staff[0].position = MyProfileForm.position.data
        current_user.user_staff[0].telephone_phone = MyProfileForm.telephone_phone.data
        current_user.user_staff[0].mobile = MyProfileForm.mobile.data
        current_user.user_staff[0].address = MyProfileForm.address.data
        current_user.user_staff[0].address_two = MyProfileForm.address_two.data
        
        
        if MyProfileForm.profile_pic.data is None:
            pass
        else:
            profile = MyProfileForm.profile_pic.data
            profile_pic = save_profile(profile,None)
            current_user.user_staff[0].profile_pic = profile_pic
        
        if MyProfileForm.gender.data == '1':
            current_user.user_staff[0].gender = "Male"
        elif MyProfileForm.gender.data == '2':
            current_user.user_staff[0].gender = "Female"
    
        db.session.commit()
        flash(f'Your Profile details has been updated successfully','success')
        return redirect(url_for('admin.admin_profile'))
    
    MyProfileForm.email.data = current_user.email
    MyProfileForm.first_name.data =  current_user.user_staff[0].first_name
    MyProfileForm.middle_name.data = current_user.user_staff[0].middle_name
    MyProfileForm.last_name.data = current_user.user_staff[0].last_name

    MyProfileForm.position.data = current_user.user_staff[0].position
    MyProfileForm.telephone_phone.data = current_user.user_staff[0].telephone_phone
    MyProfileForm.mobile.data = current_user.user_staff[0].mobile
    MyProfileForm.address.data = current_user.user_staff[0].address
    MyProfileForm.address_two.data = current_user.user_staff[0].address_two  
    
    
    if current_user.user_staff[0].gender == 'Male':
        MyProfileForm.gender.data = "1"
    elif current_user.user_staff[0].gender == 'Female':
        MyProfileForm.gender.data = "2" 
    
    title = "My Profile"
    menu_item1 = "Account"
    menu_item2 = "User"
    menu_item3 = "Profile"
    return render_template(
        'admin/admin_profile.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        MyProfileForm=MyProfileForm
    )

#? admin EDIT PROFILE 
@admin.route('/noble/admin/edit/profile/<string:user_id>',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_edit_profile(user_id):
    MyProfileForm = MyProfile()

    
    if MyProfileForm.validate_on_submit(): #request.method == 'POST'
        current_user.email = MyProfileForm.email.data
        current_user.user_staff[0].first_name = MyProfileForm.first_name.data
        current_user.user_staff[0].middle_name = MyProfileForm.middle_name.data
        current_user.user_staff[0].last_name = MyProfileForm.last_name.data
        # current_user.user_staff[0].position = MyProfileForm.position.data
        current_user.user_staff[0].telephone_phone = MyProfileForm.telephone_phone.data
        current_user.user_staff[0].mobile = MyProfileForm.mobile.data
        current_user.user_staff[0].address = MyProfileForm.address.data
        current_user.user_staff[0].address_two = MyProfileForm.address_two.data
        
        
        if MyProfileForm.profile_pic.data is None:
            pass
        else:
            profile = MyProfileForm.profile_pic.data
            profile_pic = save_profile(profile,current_user.user_staff[0].profile_pic)
            current_user.user_staff[0].profile_pic = profile_pic
        
        if MyProfileForm.gender.data == '1':
            current_user.user_staff[0].gender = "Male"
        elif MyProfileForm.gender.data == '2':
            current_user.user_staff[0].gender = "Female"
    
        db.session.commit()
        flash(f'Your Profile details has been updated successfully','success')
        return redirect(url_for('admin.admin_edit_profile',user_id=user_id))
    
    MyProfileForm.email.data = current_user.email
    MyProfileForm.first_name.data =  current_user.user_staff[0].first_name
    MyProfileForm.middle_name.data = current_user.user_staff[0].middle_name
    MyProfileForm.last_name.data = current_user.user_staff[0].last_name

    MyProfileForm.position.data = current_user.user_staff[0].position
    MyProfileForm.telephone_phone.data = current_user.user_staff[0].telephone_phone
    MyProfileForm.mobile.data = current_user.user_staff[0].mobile
    MyProfileForm.address.data = current_user.user_staff[0].address
    MyProfileForm.address_two.data = current_user.user_staff[0].address_two  
    
    
    if current_user.user_staff[0].gender == 'Male':
        MyProfileForm.gender.data = "1"
    elif current_user.user_staff[0].gender == 'Female':
        MyProfileForm.gender.data = "2" 
        
        
    title = "Edit Profile"
    menu_item1 = "Account"
    menu_item2 = "Edit"
    menu_item3 = "Profile"
    return render_template(
        'admin/admin_edit_profile.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        MyProfileForm=MyProfileForm
    )

#? ADMIN RESET PROFILE PASSWORD
@admin.route('/noble/admin/reset/account/password',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_password():
    ResetMyPasswordForm = ResetMyPassword()

    if ResetMyPasswordForm.validate_on_submit():
        email_addr = ResetMyPasswordForm.email_addr.data
        
        user_session = User.query.filter_by(email=email_addr).first()
        
        #? CHECK IF OLD PASSWORD MATCH WHAT USER ENTER
        right_old_password = user_session.password
        password_entered =  ResetMyPasswordForm.old_password.data
        
        #? DECRYPTING THE PASSWORD TO CHECK IF MATCH IS FOUND, AND COMPARING EMAIL ADDRESS OF USER
        password_match = bcrypt.check_password_hash(user_session.password,password_entered)
        print(f"password_match: {password_match}")
        if  current_user.email == email_addr and password_match == True:
            user_session.email = email_addr
            user_session.password = bcrypt.generate_password_hash(ResetMyPasswordForm.password_two.data).decode('utf-8')
            db.session.commit()
        
            flash(f'Account Password has been reset for {email_addr}','success')
            return redirect(url_for('admin.admin_password'))
        
        else:
            flash(f'The Old Password you enter does not match, Try again','error')
            return redirect(url_for('admin.admin_password'))
    
    ResetMyPasswordForm.email_addr.data = current_user.email
    title = "Reset Password"
    menu_item1 = "Account"
    menu_item2 = "Reset"
    menu_item3 = "Password"
    return render_template(
        'admin/admin_reset_profile_password.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        ResetMyPasswordForm=ResetMyPasswordForm
    )


#? CONTAINER TRACKING
@admin.route('/noble/admin/container/tracking',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_container_tracking():
    ContainerTrackingForm = ContainerTracking()
    
    if  request.method == 'POST' and ContainerTrackingForm.validate_on_submit(): #ContainerTrackingForm.validate_on_submit()
        tracking_number = ContainerTrackingForm.tracking_number.data
        origin = ContainerTrackingForm.origin.data
        destination = ContainerTrackingForm.destination.data
        
        status = None        
        if ContainerTrackingForm.status.data == '1':
            status = 'Pending'
        elif ContainerTrackingForm.status.data == '2':
            status = 'Collected'
        elif ContainerTrackingForm.status.data == '3':
            status = 'In Transit'
        elif ContainerTrackingForm.status.data == '4':
            status = 'Held at Customs'
        elif ContainerTrackingForm.status.data == '5':
            status = 'Delivered'
        elif ContainerTrackingForm.status.data == '6':
            status = 'Awaiting Pickup'
        elif ContainerTrackingForm.status.data == '7':
            status = 'Delayed'
        elif ContainerTrackingForm.status.data == '8':
            status = 'Returned to Sender'

        
        last_location = ContainerTrackingForm.last_location.data
        estimated_delivery = ContainerTrackingForm.estimated_delivery.data
        current_carrier = ContainerTrackingForm.current_carrier.data
        weight = ContainerTrackingForm.weight.data
        dimensions = ContainerTrackingForm.dimensions.data
        contents_description = ContainerTrackingForm.contents_description.data
        value = ContainerTrackingForm.value.data
        
        barcode = gen_QRCode()
        
        updated_at = ContainerTrackingForm.updated_at.data
        print(f"Inside updated_at : {type(updated_at)}")
        

        # # Ensure that updated_at is a datetime object
        # if isinstance(updated_at, str):
        #     updated_at = datetime.strptime(updated_at, '%Y-%m-%d %H:%M:%S')
        # elif isinstance(updated_at, date):
        #     updated_at = datetime.combine(updated_at, datetime.min.time())
        
        # Convert date to datetime
        # if isinstance(updated_at, date):  # DateField will return a date object
        #     updated_at = datetime.combine(updated_at, datetime.min.time())
        # updated_at = datetime.strptime(str(updated_at), '%Y-%m-%d %H:%M:%S')
        # print(f"parsed updated_at : {type(updated_at)}")
        
        insurance = None
        
        
        if ContainerTrackingForm.insurance.data == '1':
            insurance = 'No Insurance'
        elif ContainerTrackingForm.insurance.data == '2':
            insurance = 'Insured'
                
        create_cargo = Cargo(
                tracking_number=tracking_number,
                cargo_type="container",
                origin=origin,
                destination=destination,
                status=status,
                last_location=last_location,
                estimated_delivery=estimated_delivery,
                current_carrier=current_carrier,
                weight=weight,
                dimensions=dimensions,
                contents_description=contents_description,
                value=value,
                insurance=insurance,
                created_at=updated_at,
                updated_at=updated_at,
                barcode=barcode
        )
        db.session.add(create_cargo)
        db.session.commit()
        
        #? ADD CONTAINER UPDATE HISTORY HERE
        create_history = CargoStatusHistory(
            cargo_id=create_cargo.id,
            status=status,
            location=last_location,
            current_carrier=current_carrier
        )
        db.session.add(create_history)
        db.session.commit()
        
        flash(f"Tracking Information added successfully, tracking number  {tracking_number}",'success')
        return redirect(url_for('admin.admin_container_tracking'))
    
    # Set updated_at to the current date and time
    # ContainerTrackingForm.updated_at.data = datetime.today()
    
        
    track_number = generate_tracking_number()
    result = validate_tracking_number(track_number)
    if result == True:
        ContainerTrackingForm.tracking_number.data = track_number
    ContainerTrackingForm.updated_at.data = date.today()
    ContainerTrackingForm.status.data = "In Transit"
    


    title = "Container Tracking"
    menu_item1 = "Home"
    menu_item2 = "Tracking"
    menu_item3 = "Form"
    return render_template(
        'admin/admin-container-tracking.html',
        title=title,
        ContainerTrackingForm=ContainerTrackingForm,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3
    )


#? VIEW CONTAINER TRACKING
@admin.route('/noble/admin/view/container/tracking',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_view_container_tracking():
    


    # Query to get the last 100 records, ordered by `id` in descending order
    all_container_tracking = Cargo.query.filter_by(cargo_type='container')\
                              .order_by(Cargo.id.desc())\
                              .limit(100)\
                              .all()
    
    title = "View Container Tracking"
    menu_item1 = "Home"
    menu_item2 = "View"
    menu_item3 = "Container Info"
    return render_template(
        'admin/admin-view-container-tracking.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        all_container_tracking=all_container_tracking
        )
    


#? VIEW CONTAINER TRACKING HISTORY
@admin.route('/noble/admin/view/container/tracking/history/<string:container_id>',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_view_container_tracking_history(container_id):

    # Query to get the last 100 records, ordered by `id` in descending order
    all_tracking_history = CargoStatusHistory.query.filter_by(cargo_id=container_id)\
                              .order_by(CargoStatusHistory.id.desc())\
                              .limit(100)\
                              .all()
    
    print(f"all_tracking_history : {all_tracking_history}")
    title = "Container Tracking History"
    menu_item1 = "Container"
    menu_item2 = "Tracking"
    menu_item3 = "History"
    return render_template(
        'admin/admin-view-container-tracking-history.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        all_tracking_history=all_tracking_history
        )


#? EDIT CONTAINER TRACKING HISTORY USING HISTORY ID
@admin.route('/noble/admin/edit/container/tracking/history/<string:history_id>',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_edit_container_tracking_history(history_id):
    ContainerTrackingHistoryForm = ContainerTrackingHistory()
    
    prev_route = request.referrer
    is_history = CargoStatusHistory.query.filter_by(id=history_id).first()
    
    if ContainerTrackingHistoryForm.validate_on_submit():

        is_history.current_carrier=ContainerTrackingHistoryForm.current_carrier.data
        is_history.location=ContainerTrackingHistoryForm.location.data
        is_history.timestamp=ContainerTrackingHistoryForm.timestamp.data
        
        
        is_history.status= None        
        if ContainerTrackingHistoryForm.status.data == '1':
            is_history.status = 'Pending'
        elif ContainerTrackingHistoryForm.status.data == '2':
            is_history.status = 'Collected'
        elif ContainerTrackingHistoryForm.status.data == '3':
            is_history.status = 'In Transit'
        elif ContainerTrackingHistoryForm.status.data == '4':
            is_history.status = 'Held at Customs'
        elif ContainerTrackingHistoryForm.status.data == '5':
            is_history.status = 'Delivered'
        elif ContainerTrackingHistoryForm.status.data == '6':
            is_history.status = 'Awaiting Pickup'
        elif ContainerTrackingHistoryForm.status.data == '7':
            is_history.status = 'Delayed'
        elif ContainerTrackingHistoryForm.status.data == '8':
            is_history.status = 'Returned to Sender'
        
        db.session.commit()
        flash("History was updated successfully",'success')
        return redirect(url_for('admin.admin_view_container_tracking_history',container_id=is_history.cargo_id))
    
    ContainerTrackingHistoryForm.current_carrier.data=is_history.current_carrier
    ContainerTrackingHistoryForm.location.data=is_history.location
    ContainerTrackingHistoryForm.timestamp.data=is_history.timestamp
    
    if is_history.status == 'Pending':
        ContainerTrackingHistoryForm.status.data = '1'
    elif is_history.status == 'Collected':
        ContainerTrackingHistoryForm.status.data = '2'
    elif is_history.status == 'In Transit':
        ContainerTrackingHistoryForm.status.data = '3'
    elif is_history.status == 'Held at Customs':
        ContainerTrackingHistoryForm.status.data = '4'
    elif is_history.status == 'Delivered':
        ContainerTrackingHistoryForm.status.data = '4'
    elif is_history.status == 'Awaiting Pickup':
        ContainerTrackingHistoryForm.status.data = '6'
    elif is_history.status == 'Delayed':
        ContainerTrackingHistoryForm.status.data = '7'
    elif is_history.status == 'Returned to Sender':
        ContainerTrackingHistoryForm.status.data = '8'
    
    title = "Edit Tracking History"
    menu_item1 = "Edit"
    menu_item2 = "Tracking"
    menu_item3 = "History"
    return render_template(
        'admin/admin-edit-container-tracking-history.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        is_history=is_history,
        ContainerTrackingHistoryForm=ContainerTrackingHistoryForm
        )

#? CONTAINER TRACKING
@admin.route('/noble/admin/container/tracking/edit/<string:tracking_number>',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_cargo_edit(tracking_number):
    ContainerTrackingForm = ContainerTracking()
    prev_route = request.referrer
    is_container_cargo = Cargo.query.filter_by(tracking_number=tracking_number).first()
    if is_container_cargo:
        if ContainerTrackingForm.validate_on_submit():
            insurance = None
            
            is_container_cargo.tracking_number=ContainerTrackingForm.tracking_number.data
            is_container_cargo.origin=ContainerTrackingForm.origin.data
            is_container_cargo.destination=ContainerTrackingForm.destination.data
            
            is_container_cargo.status = None        
            if ContainerTrackingForm.status.data == '1':
                is_container_cargo.status = 'Pending'
            elif ContainerTrackingForm.status.data == '2':
                is_container_cargo.status = 'Collected'
            elif ContainerTrackingForm.status.data == '3':
                is_container_cargo.status = 'In Transit'
            elif ContainerTrackingForm.status.data == '4':
                is_container_cargo.status = 'Held at Customs'
            elif ContainerTrackingForm.status.data == '5':
                is_container_cargo.status = 'Delivered'
            elif ContainerTrackingForm.status.data == '6':
                is_container_cargo.status = 'Awaiting Pickup'
            elif ContainerTrackingForm.status.data == '7':
                is_container_cargo.status = 'Delayed'
            elif ContainerTrackingForm.status.data == '8':
                is_container_cargo.status = 'Returned to Sender'
            
            is_container_cargo.last_location=ContainerTrackingForm.last_location.data
            is_container_cargo.estimated_delivery=ContainerTrackingForm.estimated_delivery.data
            is_container_cargo.current_carrier=ContainerTrackingForm.current_carrier.data
            is_container_cargo.weight=ContainerTrackingForm.weight.data
            is_container_cargo.dimensions=ContainerTrackingForm.dimensions.data
            is_container_cargo.contents_description=ContainerTrackingForm.contents_description.data
            is_container_cargo.value=ContainerTrackingForm.value.data
            
            if ContainerTrackingForm.insurance.data == '1':
                insurance = 'No Insurance'
            elif ContainerTrackingForm.insurance.data == '2':
                insurance = 'Insured'
                    
            is_container_cargo.insurance=insurance
            is_container_cargo.created_at=ContainerTrackingForm.updated_at.data
            is_container_cargo.updated_at=ContainerTrackingForm.updated_at.data
            db.session.commit()
            
            #? ADD CONTAINER UPDATE HISTORY HERE
            create_history = CargoStatusHistory(
                cargo_id=is_container_cargo.id,
                status= is_container_cargo.status,
                location=ContainerTrackingForm.last_location.data,
                current_carrier=ContainerTrackingForm.current_carrier.data
            )
            db.session.add(create_history)
            db.session.commit()
        
            flash(f'Information has been updated successfully for Tracking Number {tracking_number}','success')
            return redirect(url_for('admin.admin_view_container_tracking'))
        else:
            pass
    else:
        flash(f'Error: The Container Cargo information you are trying to edit does not exist','error')
        return redirect(url_for('admin.admin_view_container_tracking'))
    
    ContainerTrackingForm.tracking_number.data=is_container_cargo.tracking_number
    ContainerTrackingForm.origin.data=is_container_cargo.origin
    ContainerTrackingForm.destination.data=is_container_cargo.destination
    ContainerTrackingForm.status.data=is_container_cargo.status
    
    
    # ContainerTrackingForm.status.data = None
    print(f"Printing the container status information: {is_container_cargo.status}")
    if is_container_cargo.status == 'Pending':
        ContainerTrackingForm.status.data = '1'
    elif is_container_cargo.status == 'Collected':
        ContainerTrackingForm.status.data = '2'
    elif is_container_cargo.status == 'In Transit':
        ContainerTrackingForm.status.data = '3'
    elif is_container_cargo.status == 'Held at Customs':
        ContainerTrackingForm.status.data = '4'
    elif is_container_cargo.status == 'Delivered':
        ContainerTrackingForm.status.data = '4'
    elif is_container_cargo.status == 'Awaiting Pickup':
        ContainerTrackingForm.status.data = '6'
    elif is_container_cargo.status == 'Delayed':
        ContainerTrackingForm.status.data = '7'
    elif is_container_cargo.status == 'Returned to Sender':
        ContainerTrackingForm.status.data = '8'

        
    ContainerTrackingForm.last_location.data=is_container_cargo.last_location
    ContainerTrackingForm.estimated_delivery.data=date.today() #is_container_cargo.estimated_delivery
    ContainerTrackingForm.current_carrier.data=is_container_cargo.current_carrier
    ContainerTrackingForm.weight.data=is_container_cargo.weight
    ContainerTrackingForm.dimensions.data=is_container_cargo.dimensions
    ContainerTrackingForm.contents_description.data=is_container_cargo.contents_description
    ContainerTrackingForm.value.data=is_container_cargo.value
    
    if is_container_cargo.insurance  == 'No Insurance':
        insurance = '1'
    elif is_container_cargo.insurance == 'Insured':
        insurance = '2'
            
    ContainerTrackingForm.insurance.data=insurance
    ContainerTrackingForm.updated_at.data=is_container_cargo.created_at
    ContainerTrackingForm.updated_at.data=is_container_cargo.updated_at
        
    title = "Container Cargo Edit"
    menu_item1 = "Home"
    menu_item2 = "Tracking"
    menu_item3 = "Form"
    return render_template(
        'admin/admin-edit-container.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        ContainerTrackingForm=ContainerTrackingForm,
        tracking_number=tracking_number
    )


#? AIRCARGO TRACKING
@admin.route('/noble/admin/aircargo/tracking',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_aircargo_tracking():
    AircargoTrackingForm = AircargoTracking()
    
    if  AircargoTrackingForm.validate_on_submit():
        tracking_number = AircargoTrackingForm.tracking_number.data
        origin = AircargoTrackingForm.origin.data
        destination = AircargoTrackingForm.destination.data
        
        status = None        
        if AircargoTrackingForm.status.data == '1':
            status = 'Pending'
        elif AircargoTrackingForm.status.data == '2':
            status = 'Collected'
        elif AircargoTrackingForm.status.data == '3':
            status = 'In Transit'
        elif AircargoTrackingForm.status.data == '4':
            status = 'Held at Customs'
        elif AircargoTrackingForm.status.data == '5':
            status = 'Delivered'
        elif AircargoTrackingForm.status.data == '6':
            status = 'Awaiting Pickup'
        elif AircargoTrackingForm.status.data == '7':
            status = 'Delayed'
        elif AircargoTrackingForm.status.data == '8':
            status = 'Returned to Sender'
            
        last_location = AircargoTrackingForm.last_location.data
        estimated_delivery = AircargoTrackingForm.estimated_delivery.data
        current_carrier = AircargoTrackingForm.current_carrier.data
        weight = AircargoTrackingForm.weight.data
        dimensions = AircargoTrackingForm.dimensions.data
        contents_description = AircargoTrackingForm.contents_description.data
        value = AircargoTrackingForm.value.data
        # flight_number = AircargoTrackingForm.flight_number.data
        airway_bill_number = AircargoTrackingForm.airway_bill_number.data
        arrival_date = AircargoTrackingForm.arrival_date.data
        departure_date = AircargoTrackingForm.departure_date.data
        sender_name = AircargoTrackingForm.sender_name.data
        sender_contact=AircargoTrackingForm.sender_contact.data
        receiver_name=AircargoTrackingForm.receiver_name.data
        receiver_contact=AircargoTrackingForm.receiver_contact.data
        
        updated_at = AircargoTrackingForm.updated_at.data
        print(f"Inside updated_at : {type(updated_at)}")
        
        insurance = None
        
        if AircargoTrackingForm.insurance.data == '1':
            insurance = 'No Insurance'
        elif AircargoTrackingForm.insurance.data == '2':
            insurance = 'Insured'
            
        airline = current_carrier
        flight_number = generate_flight_number(airline)
        
        
        carrier = current_carrier
        airway_bill_number = generate_airway_bill_number(carrier)      
        
        barcode = gen_QRCode()  
                
        create_cargo = Aircargo(                
                tracking_number=tracking_number,
                cargo_type="aircargo",
                origin=origin,
                destination=destination,
                status=status,
                last_location=last_location,
                estimated_delivery=estimated_delivery,
                current_carrier=current_carrier,
                weight=weight,
                dimensions=dimensions,
                contents_description=contents_description,
                value=value,
                insurance=insurance,
                sender_name = sender_name,
                sender_contact = sender_contact,
                receiver_name = receiver_name,
                receiver_contact = receiver_contact,
                airway_bill_number = airway_bill_number,
                departure_date = departure_date,
                arrival_date = arrival_date,
                created_at=updated_at,
                updated_at=updated_at,
                barcode=barcode
        )
        db.session.add(create_cargo)
        db.session.commit()
        
        
        #? ADD THE AIRCARGO UPDATE HISTORY HERE 
        aircargo_history = AircargoStatusHistory(
            aircargo_id=create_cargo.id,
            status=status,
            location=last_location,
            current_carrier=current_carrier
        )
        db.session.add(aircargo_history)
        db.session.commit()
        
        flash(f"Tracking Information added successfully, tracking number  {tracking_number}",'success')
        return redirect(url_for('admin.admin_aircargo_tracking'))
    
    # Set updated_at to the current date and time
    # ContainerTrackingForm.updated_at.data = datetime.today()
    
        
    track_number = generate_tracking_number()
    result = validate_tracking_number(track_number)
    if result == True:
        AircargoTrackingForm.tracking_number.data = track_number
    AircargoTrackingForm.updated_at.data = date.today()
    AircargoTrackingForm.departure_date.data = date.today()
    AircargoTrackingForm.arrival_date.data = date.today()
    # AircargoTrackingForm.status.data = "In Transit"
    
    airline = "Emirates Airlines"
    flight_number = generate_flight_number(airline)
    # AircargoTrackingForm.flight_number.data  = flight_number
    
    carrier = "Delta Airlines"
    awb_number = generate_airway_bill_number(carrier)
    AircargoTrackingForm.airway_bill_number.data  = awb_number
    
    


    title = "Aircargo Tracking"
    menu_item1 = "Home"
    menu_item2 = "Tracking"
    menu_item3 = "Form"
    return render_template(
        'admin/admin-aircargo-tracking.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        AircargoTrackingForm=AircargoTrackingForm
        )


#? VIEW AIRCARGO TRACKING
@admin.route('/noble/admin/view/aircargo/tracking',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_view_aircargo_tracking():
        # Query to get the last 100 records, ordered by `id` in descending order
    all_container_tracking = Aircargo.query.filter_by(cargo_type='aircargo')\
                              .order_by(Aircargo.id.desc())\
                              .limit(100)\
                              .all()
    
    title = "View Aircargo Tracking"
    menu_item1 = "Home"
    menu_item2 = "View"
    menu_item3 = "Container Info"
    return render_template(
        'admin/admin-view-aircargo-tracking.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        all_container_tracking=all_container_tracking
    )



#? VIEW AIRCARGO TRACKING HISTORY
@admin.route('/noble/admin/view/aircargo/tracking/history/<string:aircargo_id>',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_view_aircargo_tracking_history(aircargo_id):

    # Query to get the last 100 records, ordered by `id` in descending order
    all_tracking_history = AircargoStatusHistory.query.filter_by(aircargo_id=aircargo_id)\
                              .order_by(AircargoStatusHistory.id.desc())\
                              .limit(100)\
                              .all()
    
    print(f"all_tracking_history : {all_tracking_history}")
    title = "Aircargo Tracking History"
    menu_item1 = "Aircargo"
    menu_item2 = "Tracking"
    menu_item3 = "History"
    return render_template(
        'admin/admin-view-aircargo-tracking-history.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        all_tracking_history=all_tracking_history
        )


#? EDIT AIRCARGO TRACKING HISTORY USING HISTORY ID
@admin.route('/noble/admin/edit/aircargo/tracking/history/<string:history_id>',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_edit_aircargo_tracking_history(history_id):
    AircargoTrackingHistoryForm = AircargoTrackingHistory()
    
    prev_route = request.referrer
    is_history = AircargoStatusHistory.query.filter_by(id=history_id).first()
    
    if AircargoTrackingHistoryForm.validate_on_submit():

        is_history.current_carrier=AircargoTrackingHistoryForm.current_carrier.data
        is_history.location=AircargoTrackingHistoryForm.location.data
        is_history.timestamp=AircargoTrackingHistoryForm.timestamp.data
        
        
        is_history.status= None        
        if AircargoTrackingHistoryForm.status.data == '1':
            is_history.status = 'Pending'
        elif AircargoTrackingHistoryForm.status.data == '2':
            is_history.status = 'Collected'
        elif AircargoTrackingHistoryForm.status.data == '3':
            is_history.status = 'In Transit'
        elif AircargoTrackingHistoryForm.status.data == '4':
            is_history.status = 'Held at Customs'
        elif AircargoTrackingHistoryForm.status.data == '5':
            is_history.status = 'Delivered'
        elif AircargoTrackingHistoryForm.status.data == '6':
            is_history.status = 'Awaiting Pickup'
        elif AircargoTrackingHistoryForm.status.data == '7':
            is_history.status = 'Delayed'
        elif AircargoTrackingHistoryForm.status.data == '8':
            is_history.status = 'Returned to Sender'
        
        db.session.commit()
        flash("History was updated successfully",'success')
        return redirect(url_for('admin.admin_view_aircargo_tracking_history',aircargo_id=is_history.aircargo_id))
    
    AircargoTrackingHistoryForm.current_carrier.data=is_history.current_carrier
    AircargoTrackingHistoryForm.location.data=is_history.location
    AircargoTrackingHistoryForm.timestamp.data=is_history.timestamp
    
    if is_history.status == 'Pending':
        AircargoTrackingHistoryForm.status.data = '1'
    elif is_history.status == 'Collected':
        AircargoTrackingHistoryForm.status.data = '2'
    elif is_history.status == 'In Transit':
        AircargoTrackingHistoryForm.status.data = '3'
    elif is_history.status == 'Held at Customs':
        AircargoTrackingHistoryForm.status.data = '4'
    elif is_history.status == 'Delivered':
        AircargoTrackingHistoryForm.status.data = '4'
    elif is_history.status == 'Awaiting Pickup':
        AircargoTrackingHistoryForm.status.data = '6'
    elif is_history.status == 'Delayed':
        AircargoTrackingHistoryForm.status.data = '7'
    elif is_history.status == 'Returned to Sender':
        AircargoTrackingHistoryForm.status.data = '8'
    
    title = "Edit Tracking History"
    menu_item1 = "Edit"
    menu_item2 = "Tracking"
    menu_item3 = "History"
    return render_template(
        'admin/admin-edit-aircargo-tracking-history.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        is_history=is_history,
        AircargoTrackingHistoryForm=AircargoTrackingHistoryForm
        )
    
    

#? AIRCARGO TRACKING
@admin.route('/noble/admin/aircargo/tracking/edit/<string:tracking_number>',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_aircargo_edit(tracking_number):
    AircargoTrackingForm = AircargoTracking()
    prev_route = request.referrer
    is_container_cargo = Aircargo.query.filter_by(tracking_number=tracking_number).first()
    if is_container_cargo:
        if AircargoTrackingForm.validate_on_submit():
            insurance = None
            
            is_container_cargo.tracking_number=AircargoTrackingForm.tracking_number.data
            is_container_cargo.origin=AircargoTrackingForm.origin.data
            is_container_cargo.destination=AircargoTrackingForm.destination.data
            
            is_container_cargo.status = None        
            if AircargoTrackingForm.status.data == '1':
                is_container_cargo.status = 'Pending'
            elif AircargoTrackingForm.status.data == '2':
                is_container_cargo.status = 'Collected'
            elif AircargoTrackingForm.status.data == '3':
                is_container_cargo.status = 'In Transit'
            elif AircargoTrackingForm.status.data == '4':
                is_container_cargo.status = 'Held at Customs'
            elif AircargoTrackingForm.status.data == '5':
                is_container_cargo.status = 'Delivered'
            elif AircargoTrackingForm.status.data == '6':
                is_container_cargo.status = 'Awaiting Pickup'
            elif AircargoTrackingForm.status.data == '7':
                is_container_cargo.status = 'Delayed'
            elif AircargoTrackingForm.status.data == '8':
                is_container_cargo.status = 'Returned to Sender'
            
            is_container_cargo.last_location=AircargoTrackingForm.last_location.data
            is_container_cargo.estimated_delivery=AircargoTrackingForm.estimated_delivery.data
            is_container_cargo.current_carrier=AircargoTrackingForm.current_carrier.data
            is_container_cargo.weight=AircargoTrackingForm.weight.data
            is_container_cargo.dimensions=AircargoTrackingForm.dimensions.data
            is_container_cargo.contents_description=AircargoTrackingForm.contents_description.data
            is_container_cargo.value=AircargoTrackingForm.value.data
            
            if AircargoTrackingForm.insurance.data == '1':
                insurance = 'No Insurance'
            elif AircargoTrackingForm.insurance.data == '2':
                insurance = 'Insured'
                    
            is_container_cargo.insurance=insurance
            is_container_cargo.created_at=AircargoTrackingForm.updated_at.data
            is_container_cargo.updated_at=AircargoTrackingForm.updated_at.data
            
            is_container_cargo.sender_name=AircargoTrackingForm.sender_name.data
            is_container_cargo.sender_contact=AircargoTrackingForm.sender_contact.data
            is_container_cargo.receiver_name=AircargoTrackingForm.receiver_name.data
            is_container_cargo.receiver_contact=AircargoTrackingForm.receiver_contact.data
            # is_container_cargo.flight_number=AircargoTrackingForm.flight_number.data
            is_container_cargo.airway_bill_number=AircargoTrackingForm.airway_bill_number.data
            is_container_cargo.departure_date=AircargoTrackingForm.departure_date.data
            is_container_cargo.arrival_date=AircargoTrackingForm.arrival_date.data
    
            db.session.commit()
            
            #? ADD THE AIRCARGO UPDATE HISTORY HERE 
            aircargo_history = AircargoStatusHistory(
                aircargo_id=is_container_cargo.id,
                status=is_container_cargo.status,
                location=is_container_cargo.last_location,
                current_carrier=AircargoTrackingForm.current_carrier.data
            )
            db.session.add(aircargo_history)
            db.session.commit()
            
            flash(f'Information has been updated successfully for Tracking Number {tracking_number}','success')
            return redirect(url_for('admin.admin_view_aircargo_tracking'))
        else:
            pass
    else:
        flash(f'Error: The Container Cargo information you are trying to edit does not exist','error')
        return redirect(url_for('admin.admin_view_aircargo_tracking'))
    
    AircargoTrackingForm.tracking_number.data=is_container_cargo.tracking_number
    AircargoTrackingForm.origin.data=is_container_cargo.origin
    AircargoTrackingForm.destination.data=is_container_cargo.destination
    AircargoTrackingForm.status.data=is_container_cargo.status
    
    
    # ContainerTrackingForm.status.data = None
    print(f"Printing the container status information: {is_container_cargo.status}")
    if is_container_cargo.status == 'Pending':
        AircargoTrackingForm.status.data = '1'
    elif is_container_cargo.status == 'Collected':
        AircargoTrackingForm.status.data = '2'
    elif is_container_cargo.status == 'In Transit':
        AircargoTrackingForm.status.data = '3'
    elif is_container_cargo.status == 'Held at Customs':
        AircargoTrackingForm.status.data = '4'
    elif is_container_cargo.status == 'Delivered':
        AircargoTrackingForm.status.data = '4'
    elif is_container_cargo.status == 'Awaiting Pickup':
        AircargoTrackingForm.status.data = '6'
    elif is_container_cargo.status == 'Delayed':
        AircargoTrackingForm.status.data = '7'
    elif is_container_cargo.status == 'Returned to Sender':
        AircargoTrackingForm.status.data = '8'

        
    AircargoTrackingForm.last_location.data=is_container_cargo.last_location
    AircargoTrackingForm.estimated_delivery.data=date.today() #is_container_cargo.estimated_delivery
    AircargoTrackingForm.current_carrier.data=is_container_cargo.current_carrier
    AircargoTrackingForm.weight.data=is_container_cargo.weight
    AircargoTrackingForm.dimensions.data=is_container_cargo.dimensions
    AircargoTrackingForm.contents_description.data=is_container_cargo.contents_description
    AircargoTrackingForm.value.data=is_container_cargo.value
    
    if is_container_cargo.insurance  == 'No Insurance':
        insurance = '1'
    elif is_container_cargo.insurance == 'Insured':
        insurance = '2'
            
    AircargoTrackingForm.insurance.data=insurance
    AircargoTrackingForm.updated_at.data=is_container_cargo.created_at
    AircargoTrackingForm.updated_at.data=is_container_cargo.updated_at
    
    AircargoTrackingForm.sender_name.data=is_container_cargo.sender_name
    AircargoTrackingForm.sender_contact.data=is_container_cargo.sender_contact
    AircargoTrackingForm.receiver_name.data=is_container_cargo.receiver_name
    AircargoTrackingForm.receiver_contact.data=is_container_cargo.receiver_contact
    # AircargoTrackingForm.flight_number.data=is_container_cargo.flight_number
    AircargoTrackingForm.airway_bill_number.data=is_container_cargo.airway_bill_number
    AircargoTrackingForm.departure_date.data=is_container_cargo.departure_date
    AircargoTrackingForm.arrival_date.data=is_container_cargo.arrival_date
        
    title = "Aircargo Edit"
    menu_item1 = "Home"
    menu_item2 = "Tracking"
    menu_item3 = "Form"
    return render_template(
        'admin/admin-edit-aircargo.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        AircargoTrackingForm=AircargoTrackingForm,
        tracking_number=tracking_number
    )



#? PARCEL TRACKING
@admin.route('/noble/admin/parcel/tracking',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_parcel_tracking():
    
    title = "Parcel Tracking"
    menu_item1 = "Account"
    menu_item2 = "Parcel"
    menu_item3 = "Tracking"
    return render_template(
        'admin/admin-parcel-tracking.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3
    )


#? VIEW PARCEL TRACKING
@admin.route('/noble/admin/view/parcel/tracking',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_view_parcel_tracking():
    
    title = "View Parcel"
    menu_item1 = "Account"
    menu_item2 = "View"
    menu_item3 = "Trackings"
    return render_template(
        'admin/admin-view-parcel-tracking.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3
    )


#? SEND NOTIFICATION
@admin.route('/noble/admin/view/request/quotes',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_request_quotes():                              
    request_quotes = RequestQuote.query.order_by(RequestQuote.id.desc()).limit(100).all()
    
    title = "Request Quotes"
    menu_item1 = "View"
    menu_item2 = "Request"
    menu_item3 = "Quotes"
    return render_template(
        'admin/admin-view-request-quotes.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        request_quotes=request_quotes
    )


#? VIEW NOTIFICATION
@admin.route('/noble/admin/contact/us/messages',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_contact_us():
    
    contact_us_messages = GetInTouch.query.order_by(GetInTouch.id.desc()).limit(100).all()
    
    title = "Contact Us Messages"
    menu_item1 = "Contact"
    menu_item2 = "US"
    menu_item3 = "Messages"
    return render_template(
        'admin/admin-view-contact-us-messages.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        contact_us_messages=contact_us_messages
    )



#? CREATE USER ACCOUNT
@admin.route('/noble/admin/create/account',methods=['GET','POST'])
@login_required
@roles_required('admin')
def admin_create_account():
    RegistrationForm = Registration()
    
    if RegistrationForm.validate_on_submit():
        profile_pic = None
        email_address = RegistrationForm.email.data
        first_name = RegistrationForm.first_name.data
        middle_name = RegistrationForm.middle_name.data
        last_name = RegistrationForm.last_name.data
        password = RegistrationForm.password_one.data
        confirm_password = RegistrationForm.password_two.data
        
        # profile = RegistrationForm.profile_pic.data
        # profile_pic = save_profile(profile,None)
        
        if RegistrationForm.profile_pic.data is None:
            profile_pic = "default.png"
        else:
            profile = RegistrationForm.profile_pic.data
            profile_pic = save_profile(profile,None)
        
        staff_ID = userIDGenerator()
        
        #? CODE TO CREATE THE ACTUAL ACCOUNT HERE
        StaffRole1 = 'staff'
        StaffRole2 = 'staff'
        phone1 = ''
        address = ''

        #? ADDING NEW USER TO USERDATA STORE
        hashed_password = bcrypt.generate_password_hash(confirm_password).decode('utf-8')
        adduser = user_datastore.create_user(user_id=staff_ID,email=email_address,password=hashed_password)
        db.session.commit()

        #? ADD USER INFORMATION TO STAFF TABLE
        addinfo = Staffs(
                profile_pic = profile_pic,
                first_name = first_name,
                middle_name = middle_name,
                last_name = last_name,
                position = StaffRole2,
                gender = 'Male',
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
        
        flash(f'Account has been created successfully','success')
        return redirect(url_for('admin.admin_create_account'))

    
    title = "Create Account"
    menu_item1 = "Home"
    menu_item2 = "Create"
    menu_item3 = "User"
    return render_template(
        'admin/admin-create-account.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        RegistrationForm=RegistrationForm
    )



#? EDIT USER ACCOUNT DETAILS
@admin.route('/noble/admin/edit/account/<string:user_id>',methods=['GET','POST'])
@login_required
@roles_required('admin')
def admin_edit_account(user_id):
    RegistrationForm = Registration()
    
    is_user = Staffs.query.filter_by(id=user_id).first()
    if RegistrationForm.validate_on_submit():
        profile_pic = None
        email_address = RegistrationForm.email.data
        first_name = RegistrationForm.first_name.data
        middle_name = RegistrationForm.middle_name.data
        last_name = RegistrationForm.last_name.data
        password = None
        
        if RegistrationForm.password_one.data == '********':
            password = is_user.user_staff.password
            print("Password did not change")
        else:
            password = RegistrationForm.password_one.data
            print("Password changed")
        
        if RegistrationForm.profile_pic.data is None:
            profile_pic = is_user.profile_pic
        else:
            profile = RegistrationForm.profile_pic.data
            profile_pic = save_profile(profile,is_user.profile_pic)
        
        staff_ID = userIDGenerator()
        
        #? CODE TO CREATE THE ACTUAL ACCOUNT HERE
        StaffRole1 = 'staff'
        StaffRole2 = 'staff'
        phone1 = ''
        address = ''

        #? ADDING NEW USER TO USERDATA STORE
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        
        #? ADD USER INFORMATION TO STAFF TABLE
        is_user.profile_pic = profile_pic
        is_user.user_staff.email = email_address
        is_user.user_staff.password = hashed_password
        is_user.first_name = first_name
        is_user.middle_name = middle_name
        is_user.last_name = last_name
        
        db.session.commit()

        
        flash(f'Account details has been updated successfully','success')
        return redirect(url_for('admin.admin_view_users'))


    if is_user:
        RegistrationForm.email.data = is_user.user_staff.email
        RegistrationForm.first_name.data = is_user.first_name
        RegistrationForm.middle_name.data = is_user.middle_name
        last_name = RegistrationForm.last_name.data = is_user.last_name
        RegistrationForm.password_one.data = '********'
        RegistrationForm.password_two.data = '********'
    
    title = "Edit Account"
    menu_item1 = "Home"
    menu_item2 = "Create"
    menu_item3 = "User"
    return render_template(
        'admin/admin-edit-account.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        RegistrationForm=RegistrationForm
    )
    

#? VIEW ALL USERS
@admin.route('/noble/admin/view/all/users',methods=['GET','POST'])
@login_required
@roles_accepted('admin','staff')
def admin_view_users():
    all_staffs = Staffs.query.all()
    
    title = "All Users"
    menu_item1 = "Home"
    menu_item2 = "View"
    menu_item3 = "Users"
    return render_template(
        'admin/admin-view-users.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        all_staffs=all_staffs
    )

#? RESET USER PASSWORD
@admin.route('/noble/admin/reset/password',methods=['GET','POST'])
@login_required
@roles_required('admin')
def admin_reset_password():
    ResetPasswordForm = ResetPassword()
    # qr_code = gen_QRCode()
    # print(f"QR Code: {gen_QRCode}")

    if ResetPasswordForm.validate_on_submit():
        email_addr = ResetPasswordForm.email_addr.data
        is_user = User.query.filter_by(email=email_addr).first()
                    
                    
        confirm_password = bcrypt.generate_password_hash(ResetPasswordForm.password_two.data).decode('utf-8')
        is_user.email = email_addr
        is_user.password = confirm_password
        db.session.commit()
        
        
        flash(f'Account Password has been reset for {email_addr}','success')
        return redirect(url_for('admin.admin_reset_password'))
    
    title = "Reset Password"
    menu_item1 = "Home"
    menu_item2 = "Reset"
    menu_item3 = "Password"
    return render_template(
        'admin/admin-reset-password.html',
        title=title,
        menu_item1=menu_item1,
        menu_item2=menu_item2,
        menu_item3=menu_item3,
        ResetPasswordForm=ResetPasswordForm
    )
