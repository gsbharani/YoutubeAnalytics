import pandas as pd
from pathlib import Path

FILE_PATH = Path("app/data/youtube_data.xlsx")

def load_channels():
    df = pd.read_excel(FILE_PATH, sheet_name="channels")
    return df.to_dict(orient="records")
