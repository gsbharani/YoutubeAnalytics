# backend/app/database.py
import pymssql
import os
from dotenv import load_dotenv

load_dotenv()  # Load variables from backend/.env

# ---------------- CONFIG ----------------
DB_SERVER = os.getenv("DB_SERVER", "VPRC-SANTHANABH")
DB_USER = os.getenv("DB_USER", "")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "YouTubeAnalytics")

# ---------------- CONNECTION ----------------
def get_connection():
    """
    Returns a pymssql connection object.
    """
    try:
        conn = pymssql.connect(
            server=DB_SERVER,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            charset='UTF8'
        )
        return conn
    except Exception as e:
        print("Error connecting to SQL Server:", e)
        raise e

def get_cursor():
    """
    Returns a cursor from the connection.
    """
    conn = get_connection()
    return conn, conn.cursor()
