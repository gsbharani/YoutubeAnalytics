import pyodbc

conn = pyodbc.connect(
    'DRIVER={ODBC Driver 18 for SQL Server};'
    'SERVER=VPRC-SANTHANABH;'
    'DATABASE=YouTubeAnalytics;'
    'Trusted_Connection=yes;'
    'TrustServerCertificate=yes;'
)

def get_cursor():
    return conn.cursor()
