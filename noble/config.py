class Config:
    #******************** SQLlite DATABASE CONFIG *******************#

    #? 50 CHARACTER LONG SECRETE KEY

    SECRET_KEY = 'b081c94255edcd285425fe1bc513ebb217369ca21f3acf571632edb15df57a0b360ed6242f991a53756aea07'#? 50 CHARACTER LONG WTFROMS SECRETE KEY
    WTF_CSRF_SECRET_KEY = 'f9f1ca4a90b0de0c1bf047069a15fcb0118169a9efa719737a55f11d968bda090a5669b305f98e8aced9857ae'
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10 MB in bytes
    #********************** MySQL DATABASE CONFIG *******************#
    SQLALCHEMY_DATABASE_URI = 'sqlite:///Cargo.db'
    # SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:@localhost:3306/studyliberia?charset=utf8"
