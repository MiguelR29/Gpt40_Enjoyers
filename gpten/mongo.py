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

def crear_log(ip,timestamp,threat,attack_type,device,variable_bool):

    mydict = { "ip": ip, 
              "timestamp": timestamp,
              "threat": threat,
              "attack_type":attack_type,
              "device" : device,
              "blocked": variable_bool
                }
    
    client = connect()
    db = client['firewall']
    col = db['logs']
    try:
        result = col.insert_one(mydict)
        return {'Response':'Se creo un registro correctamente'}
    except Exception as e:
        print(f"Error: {e}")


def crear_blklist(ip,timestamp,reason):

    mydict = { "ip": ip, 
              "timestamp": timestamp,
              "reason": reason
                }
    client = connect()
    db=client['firewall']
    col = db['blacklist']
    try:
        result = col.insert_one(mydict)
        return {'Response':'Se creo un registro correctamente'}
    except Exception as e:
        print(f"Error: {e}")



