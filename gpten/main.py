from gemini import *
from mongo import *
from gpten.scapy import *
from flask import Flask,request,jsonify
from flask_cors import CORS 

app =  Flask(__name__)


@app.route('/obtain_logs')
def obtain_logs():
    logs = obtener_logs()
    logs_real = json.dumps(logs, default=str)
    
    print(type(logs_real))
    return logs_real 



if __name__ == "__main__":
    app.run(debug=True)