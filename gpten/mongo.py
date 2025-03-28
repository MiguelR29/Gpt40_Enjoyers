from pymongo import MongoClient
import pymongo
from dotenv import load_dotenv
import os



def connect():
    load_dotenv()
    uri = os.getenv("DB_URL")
    client = MongoClient(uri, server_api=pymongo.server_api.ServerApi(
    version="1", strict=True, deprecation_errors=True))
    return client

def obtener_logs():
    client = connect()
    db = client["firewall"]
    logs = db["logs"]

    return list(logs.find())

def obtener_blacklist():
    client = connect()
    db = client["firewall"]
    blacklist = db["blacklist"]
    
    return list(blacklist.find())





