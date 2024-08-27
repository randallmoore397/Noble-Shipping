import secrets
import os
import random
import string
from PIL import Image, ImageSequence
from flask import current_app, send_file
from pathlib import Path
from werkzeug.utils import secure_filename
from pathlib import Path
from datetime import datetime, timedelta
# import barcode
# from barcode import Code128
# import secrets
# import os




#TODO PROCESS STUDENT PROFILE PICTURE HERE
def save_profile(profile_photo,previous):
    # create random name for new upload picture
    random_name = secrets.token_hex(20)
    
    filename = secure_filename(profile_photo.filename)
    # Get the uploaded picture file extension
    _, f_ext = os.path.splitext(filename)
    
    # Generate a new name by concatenaing the extension
    picture_name = random_name +  '.png'#f_ext
    # Generate full path to save picture on filesystem
    picture_path = os.path.join(current_app.root_path,f'static/profile/{picture_name}')
    ############ Saving picture to file system #############
    # new resize dimention
    # PilloResizer(music_poster,picture_path,320)
    resize_dimention = (873,491)
    img = Image.open(profile_photo) # Disgard resize picture aspect ratio
    img.thumbnail(resize_dimention)
    img.save(picture_path,optimize=True, quality=60)
    
    
    #? DELETE PREVIOUS PROFILE PIC TO SAVE SPACE
    if previous:
        if previous == 'default.png':
            pass
        else:
            try:
                os.remove(os.path.join(current_app.root_path,f'static/profile/{previous}'))
            except:
                print('Image you are deleting is not found on file system')
                # flash(f'Image you are deleting is not found on file system','danger')
                
    print(f"The Image FIlename: {picture_name}")
    return picture_name

def userIDGenerator(stringLength=6):
    """Generate a random string of fixed length """
    letters = string.digits
    return ''.join(random.choice(letters) for i in range(stringLength))


import barcode
from barcode import Code128
from barcode.writer import ImageWriter
import secrets
import os
from flask import current_app

def gen_QRCode():
    
    

    letters = string.digits
    data = ''.join(random.choice(letters) for i in range(15))

    new_file_name = secrets.token_hex(20)

    file_path = os.path.join(current_app.root_path, 'static/QR_Code/', new_file_name)

    import barcode
    from barcode.writer import ImageWriter


    EAN = barcode.get_barcode_class('ean13')
    ean = EAN(data, writer=ImageWriter())
    ean.save(file_path)
    
    return new_file_name