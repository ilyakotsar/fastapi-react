import string
from argon2 import PasswordHasher
from datetime import datetime


def argon2_hash(text:str) -> str:
    ph = PasswordHasher()
    return ph.hash(text)


def argon2_verify(hashed:str, plain:str):
    ph = PasswordHasher()
    return ph.verify(hashed, plain)


def valid_username(db, User, username, current_username=None):
    valid = False
    if 5 <= len(username) <= 30:
        valid = True
        check = {
            'l': 0
        }
        for i in username:
            if i in string.ascii_letters:
                check['l'] += 1
                continue
            elif i in string.digits:
                continue
            elif i == '_':
                continue
            else:
                return False
        if valid is True and check['l'] > 0:
            prohibited = ('admin')
            if username.lower() in prohibited:
                valid = False
            else:
                if current_username is not None and username.lower() == current_username.lower():
                    valid = True
                else:
                    if db.query(User).filter_by(username_lower=username.lower()).first():
                        valid = False
                    else:
                        valid = True
        else:
            valid = False
    return valid


def valid_email(db, User, email, current_email=None):
    if '@' in email:
        if db.query(User).filter_by(email=email).first():
            valid = False
        else:
            valid = True
    else:
        valid = False
    return valid


def valid_password(password):
    valid = False
    if 10 <= len(password) <= 60:
        valid = True
        check = {
            'l': 0,
            'u': 0,
            'd': 0
        }
        for i in password:
            if i in string.ascii_lowercase:
                check['l'] += 1
                continue
            if i in string.ascii_uppercase:
                check['u'] += 1
                continue            
            elif i in string.digits:
                check['d'] += 1
                continue
            elif i in string.punctuation:
                continue
            else:
                return False
        if check['l'] > 0 and check['u'] > 0 and check['d'] > 0:
            data = {}
            for i in password:
                if i in data:
                    data[i] += 1
                else:
                    data[i] = 0
                sorted_data = sorted(data.items(), key=lambda x:x[1], reverse=True)
                x = round(len(password) / 3)
                if sorted_data[0][1] >= x:
                    valid = False
        else:
            valid = False
    return valid

