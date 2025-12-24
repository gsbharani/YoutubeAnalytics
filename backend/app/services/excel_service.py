import csv

def load_channels():
    with open("data/channel_summary.csv", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        return list(reader)
