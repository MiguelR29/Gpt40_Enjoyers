from gemini import *
from mongo import *
from flask import Flask,request,jsonify
from flask_cors import CORS 

app =  Flask(__name__)

CORS(app)
API_KEY = load_api_key()
CLIENT = initialize_client(API_KEY)

initial_analysis_done = False

conversation_history = []





@app.route('/obtain_logs')
def obtain_logs():  
    logs = obtener_logs()
    logs_real = json.dumps(logs, default=str)
    return logs_real 

@app.route('/obtain_blacklist')
def obtain_blacklist():
    blacklist = obtener_blacklist()
    blacklist_real = json.dumps(blacklist, default=str)
    

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

@app.route('/chat',methods = ['POST'])
def chat():
    global conversation_history
    logs = obtener_logs()
    blacklist = obtener_blacklist()
    try:
        data= request.get_json()
        user_input = data['pregunta']
        if not user_input:
            return jsonify({"response":"Ingrese un mensaje"})
        
        if user_input.lower() in ['salir','exit','quit']:
            return jsonify({"response": "Hasta luego! Recomiendo revisar tus dispositivos IoT regularmente."})
        
        if user_input.lower() in['registros','registers'] :
            registros = json.dumps(logs, default=str)
            return registros
        
        if user_input.lower() == 'lista_negra':
            blklist = json.dumps(blacklist, default=str)
            return blklist
        
        response = generate_response(CLIENT, user_input, conversation_history, logs)
        
        conversation_history.extend([
            types.Content(role="user", parts=[types.Part.from_text(text=user_input)]),
            types.Content(role="model", parts=[types.Part.from_text(text=response)])
        ])

        if len(conversation_history) > 6:  # Keep last 3 exchanges
            conversation_history = conversation_history[-6:]

        return jsonify({"response": response})
    except Exception as e:
        print(f"Error: {e}")

        return jsonify({"response": f"Ocurrió un error: {str(e)}. Por favor, intenta de nuevo."}), 500

@app.route('/init')
def initialize():
    logs = obtener_logs()
    logs_real = json.dumps(logs,default=str)
    global API_KEY, CLIENT, conversation_history
    if not API_KEY:
        return jsonify({"error": "API key is required."}), 400
    try:
        initial_analysis = analyze_logs(CLIENT,logs_real)
        analisis= json.dumps(initial_analysis, default=str)
        conversation_history = [ 
            types.Content(
                role="model",
                parts=[types.Part.from_text(text=analisis)],
            )
        ]
        
        return jsonify({"message": analisis})
    except Exception as e:
        return jsonify({"error": f"Failed to initialize chatbot: {str(e)}"}), 500
        


if __name__ == "__main__":
    app.run(debug=True)