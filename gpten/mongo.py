from pymongo import MongoClient
import pymongo
from dotenv import load_dotenv
import os


load_dotenv()


uri = os.getenv("DB_URL")
client = MongoClient(uri, server_api=pymongo.server_api.ServerApi(
 version="1", strict=True, deprecation_errors=True))

def obtener_logs():
    

