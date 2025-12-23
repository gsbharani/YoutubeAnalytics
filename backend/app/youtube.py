from googleapiclient.discovery import build

API_KEY = "AIzaSyBX2kO4Bxx1ChWHnSPeAItXOuL-va-Y4Ho"
youtube = build("youtube", "v3", developerKey=API_KEY)

def resolve_channel_id(url):
    if "/channel/" in url:
        return url.split("/channel/")[1]
    if "@" in url:
        handle = url.split("@")[-1]
        res = youtube.search().list(
            part="snippet",
            q=f"@{handle}",
            type="channel",
            maxResults=1
        ).execute()
        if res["items"]:
            return res["items"][0]["snippet"]["channelId"]
    return None

def fetch_stats(channel_id):
    res = youtube.channels().list(
        part="statistics,snippet",
        id=channel_id
    ).execute()

    item = res["items"][0]
    return {
        "channel_id": channel_id,
        "name": item["snippet"]["title"],
        "subs": int(item["statistics"]["subscriberCount"]),
        "views": int(item["statistics"]["viewCount"]),
        "videos": int(item["statistics"]["videoCount"])
    }
