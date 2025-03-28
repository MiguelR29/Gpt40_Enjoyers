from google import genai
import os
from dotenv import load_dotenv
from google.genai import types
import json
from datetime import datetime


SECURITY_LOGS = {
  "logs": [
    {
      "ip": "192.168.1.10",
      "timestamp": "2025-03-27T14:30:00Z",
      "threat_level": 4,
      "attack_type": "Brute Force",
      "device": "Cámara IP",
      "blocked": True
    },
    {
      "ip": "203.0.113.10",
      "timestamp": "2025-03-27T15:00:10Z",
      "threat_level": 3,
      "attack_type": "Port Scanning",
      "device": "Router",
      "blocked": False
    },
    {
      "ip": "45.67.89.101",
      "timestamp": "2025-03-27T16:45:30Z",
      "threat_level": 5,
      "attack_type": "DDoS",
      "device": "Smart TV",
      "blocked": True
    }
  ]
}
BlackList = {
    "blacklist": [
    {
      "ip": "192.168.1.10",
      "added_on": "2025-03-27T14:35:00Z",
      "reason": "Múltiples intentos de acceso no autorizado"
    },
    {
      "ip": "45.67.89.101",
      "added_on": "2025-03-27T16:50:00Z",
      "reason": "Ataques DDoS detectados"
    }
  ]
}

def load_api_key():
    """Load API key from .env file"""
    load_dotenv()
    api_key = os.getenv("API_KEY")
    if not api_key:
        print("Error: API_KEY not found in .env file")
        exit(1)
    return api_key

def initialize_client(api_key):
    """Initialize the Gemini client"""
    return genai.Client(api_key=api_key)

def analyze_logs(client,logs):
    """Analyze the security logs and provide initial recommendations"""
    model = "gemini-2.0-flash"
    
    log_summary = json.dumps(logs, indent=2)
    
    contents = [
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=f"""Analiza estos registros de seguridad de IoT y proporciona un resumen conciso de las amenazas detectadas y recomendaciones prioritarias. 
            
            Registros:
            {log_summary}""")],
        )
    ]
    
    generate_content_config = types.GenerateContentConfig(
        response_mime_type="text/plain",
        system_instruction=[
            types.Part.from_text(text="""Eres un analista de seguridad de IoT especializado en identificar amenazas y proporcionar recomendaciones accionables. Analiza los registros de seguridad y proporciona:
1. Resumen de amenazas detectadas
2. Evaluación de la gravedad
3. Recomendaciones específicas para cada dispositivo afectado
4. Sugerencias para mejorar la seguridad general""")
        ],
    )
    
    full_response = ""
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        if chunk.text:
            print(chunk.text, end="")
            full_response += chunk.text
    
    return full_response

def generate_response(client, user_input, conversation_history,Logs):
    """Generate a response from the Gemini model"""
    model = "gemini-2.0-flash"
    
    # Include logs in the context if the question is security-related
    if any(keyword in user_input.lower() for keyword in ['registro', 'log', 'ataque', 'seguridad', 'threat', 'attack']):
        log_context = f"\nContexto de registros actuales:\n{json.dumps(Logs, indent=2)}"
        user_input += log_context
    
    # Build the conversation contents
    contents = conversation_history + [
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=user_input)],
        )
    ]
    
    # Configuration for the model
    generate_content_config = types.GenerateContentConfig(
        response_mime_type="text/plain",
        system_instruction=[
            types.Part.from_text(text="""Eres un experto en ciberseguridad IoT con acceso a registros de seguridad recientes. Proporciona:
1. Explicaciones claras de problemas de seguridad
2. Recomendaciones específicas basadas en los registros
3. Pasos accionables para mejorar la seguridad
4. Referencia a amenazas recientes cuando sea relevante
Mantén las respuestas concisas pero informativas.""")
        ],
    )
    
    # Generate and stream the response
    full_response = ""
    print("\nAsistente: ", end="")
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        if chunk.text:
            print(chunk.text, end="")
            full_response += chunk.text
    
    return full_response

def display_log_summary(Logs,Blacklist):
    """Display a formatted summary of the current logs"""
    print("\n" + "="*50)
    print("RESUMEN DE REGISTROS ACTUALES".center(50))
    print("="*50)
    
    # Count threats
    threat_counts = {}
    blocked_count = 0
    for log in Logs['logs']:
        attack_type = log['attack_type']
        threat_counts[attack_type] = threat_counts.get(attack_type, 0) + 1
        if log['blocked']:
            blocked_count += 1
    
    print(f"\nTotal de eventos de seguridad: {len(Logs['logs'])}")
    print(f"Intentos bloqueados: {blocked_count}")
    print("\nTipos de ataques detectados:")
    for attack, count in threat_counts.items():
        print(f"- {attack}: {count}")
    
    print("\nDirecciones IP en lista negra:")
    for entry in Blacklist['blacklist']:
        print(f"- {entry['ip']} ({entry['reason']})")

def main():
    api_key = load_api_key()
    client = initialize_client(api_key)
    
    # Initial security analysis
    initial_analysis = analyze_logs(client,SECURITY_LOGS)
    
    print("\n" + "="*50)
    print("IoT Cybersecurity Chatbot".center(50))
    print("="*50)
    print("\nHe analizado los registros de seguridad recientes de tu red IoT.")
    print("Puedes preguntarme sobre amenazas específicas o solicitar recomendaciones.")
    print("Comandos especiales: 'registros', 'lista_negra', 'salir'\n")
    
    conversation_history = [
        types.Content(
            role="model",
            parts=[types.Part.from_text(text=initial_analysis)],
        )
    ]
    
    while True:
        try:
            user_input = input("\nTú: ").strip()
            
            if user_input.lower() in ['salir', 'exit', 'quit']:
                print("\nHasta luego! Recomiendo revisar tus dispositivos IoT regularmente.")
                break
                
            if user_input.lower() == 'registros':
                display_log_summary()
                continue
                
            if user_input.lower() == 'lista_negra':
                print("\nDirecciones IP en lista negra:")
                for entry in BlackList['blacklist']:
                    print(f"- {entry['ip']} (Agregado: {entry['added_on']})")
                    print(f"  Razón: {entry['reason']}\n")
                continue
                
            if not user_input:
                print("Por favor, ingresa una pregunta o consulta.")
                continue
                
            response = generate_response(client, user_input, conversation_history,SECURITY_LOGS)
            
            # Update conversation history (keeping last few exchanges)
            conversation_history.extend([
                types.Content(role="user", parts=[types.Part.from_text(text=user_input)]),
                types.Content(role="model", parts=[types.Part.from_text(text=response)])
            ])
            
            # Keep conversation history manageable
            if len(conversation_history) > 6:  # Keep last 3 exchanges
                conversation_history = conversation_history[-6:]
                
        except KeyboardInterrupt:
            print("\n\nConversación interrumpida. ¡Hasta pronto!")
            break
        except Exception as e:
            print(f"\nOcurrió un error: {str(e)}")
            print("Por favor, intenta de nuevo o formula tu pregunta de otra manera.")

if __name__ == "__main__":
    main()