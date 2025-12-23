# backend/app/utils.py

from datetime import datetime

def today_date():
    return datetime.now().date()

def safe_int(value):
    try:
        return int(value)
    except:
        return 0
