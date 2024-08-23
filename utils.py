
#? Function to Generate Tracking Number
import random
import string
import re

def generate_tracking_number():
    prefix = ''.join(random.choices(string.ascii_uppercase, k=3))
    digits = ''.join(random.choices(string.digits, k=6))
    suffix = ''.join(random.choices(string.ascii_uppercase, k=2))
    return f"{prefix}{digits}{suffix}"


#? Function to Validate Tracking Number
def validate_tracking_number(tracking_number):
    pattern = re.compile(r'^[A-Z]{3}\d{6}[A-Z]{2}$')
    return bool(pattern.match(tracking_number))



track_number = generate_tracking_number()
result = validate_tracking_number(track_number)
if result == True:
    print(f"Tracking Number: {track_number}")
elif result == False:
    print("Invalid Tracking Number")
else:
    print("Please enter a tracking number")