from gemini import *
from mongo import *
from flask import Flask,request,jsonify
from flask_cors import CORS 

app =  Flask(__name__)

CORS(app)

@app.route('/obtain_logs')
def obtain_logs():
    logs = obtener_logs()
    logs_real = json.dumps(logs, default=str)
    
    print(type(logs_real))
    return logs_real 

@app.route('/obtain_blacklist')
def obtain_blacklist():
    blacklist = obtener_blacklist()
    blacklist_real = json.dumps(blacklist, default=str)
    
    print(type(blacklist_real))
    return blacklist_real


if __name__ == "__main__":
    app.run(debug=True)