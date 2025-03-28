from gemini import *
from mongo import *
from cloudflare import *
from flask import Flask,request,jsonify
from flask_cors import CORS 

app =  Flask(__name__)


@app.route('/obtain_logs')
def obtain_logs():
    logs = obtener_logs()
    
    return list(logs)




if __name__ == "__main__":
    app.run(debug=True)