from gemini import *
from mongo import *
from flask import Flask,request,jsonify
from flask_cors import CORS 

app =  Flask(__name__)


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

@app.route("/detect",methods = ['POST'])
async def detect(event:dict):
    client = connect()
    db = client['logs']
    if event["threat_level"] > 3:
        db.insert_one(event)
    return {"message": "Evento registrado"}

@app.route('/logs',methods=['POST'])
async def log_event(event: dict):
    client = connect()
    logs = client['logs']
    logs.insert_one(event)
    
    return {"message": "Log guardado"}

@app.route('/chatbot',methods = ['POST'])
async def chatbot():
    chatbot()

if __name__ == "__main__":
    app.run(debug=True)