
import uuid
import random

def generate_airway_bill_number(carrier_name):
    """_summary_

    Args:
        carrier_name (_type_): _description_
    
    Carrier Initials Extraction:
    The initials are derived from the carriers name by taking the first letter of each word in
    the carrier's name. For example, "Emirates Airlines" would give "EA".

    Unique Identifier:
    uuid.uuid4() generates a random unique identifier, which ensures that each airway bill number
    is unique. You can replace this with a sequential number if needed.

    Returns:
        Example Outputs
        generate_airway_bill_number("Emirates Airlines") might return EA-1A2B3C4D.
        generate_airway_bill_number("Qatar Airways") might return QA-4E5F6G7H._
    """
    
    # Extract the initials from the carrier's name
    initials = ''.join([word[0].upper() for word in carrier_name.split()])

    # Generate a unique identifier (you can replace this with a sequential number or other method)
    unique_id = str(uuid.uuid4()).split('-')[0].upper()

    # Combine the initials with the unique identifier
    airway_bill_number = f"{initials}-{unique_id}"
    return airway_bill_number

# Example usage
# carrier = "Emirates Airlines"
# awb_number = generate_airway_bill_number(carrier)
# print(awb_number)  # Example output: "EA-1A2B3C4D"



def generate_flight_number(airline_name):
    """_summary_

    Args:
        Airline Initials:
            The function extracts the first letter of each word in the airline's name, similar to the airway_bill_number function. For example, "Emirates Airlines" gives "EA".

        Random Number:
            A random 3 or 4-digit number is generated to ensure each flight number is unique. You can control the range depending on your requirements.

        Combination:
            The initials are combined with the random number to create the full flight number

    Returns:
        Example Outputs
            generate_flight_number("Emirates Airlines") might return EA234.
            generate_flight_number("Qatar Airways") might return QA789.
    """
    # Extract the initials or IATA code from the airline's name (for simplicity, let's use initials)
    initials = ''.join([word[0].upper() for word in airline_name.split()])

    # Generate a random 3 or 4-digit number for the flight number
    flight_number = random.randint(100, 9999)

    # Combine the initials with the flight number
    full_flight_number = f"{initials}{flight_number}"
    return full_flight_number

# # Example usage
# airline = "Emirates Airlines"
# flight_number = generate_flight_number(airline)
# print(flight_number)  # Example output: "EA1234"
