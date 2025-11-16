import bcrypt

def hashPassword(raw_password):
    encode_password = raw_password.encode('utf-8')
    salt = bcrypt.gensalt()
    password_hashed = bcrypt.hashpw(encode_password,salt).decode('utf-8')
    return password_hashed

def checkPassword(entered_password,hashed_password):
    return  bcrypt.checkpw(entered_password.encode('utf-8'),hashed_password.encode('utf-8'))
