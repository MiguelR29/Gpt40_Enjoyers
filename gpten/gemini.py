from google import genai
import os
from dotenv import load_dotenv
from google.genai import types

def load_api_key():

    load_dotenv()
    api_key = os.getenv("API_KEY")
    if not api_key:
        print("Error: API_KEY not found in .env file")
        exit(1)
    return api_key

def initialize_client(api_key):

    return genai.Client(api_key=api_key)

def generate_response(client, user_input, conversation_history):
    """Generate a response from the Gemini model"""
    model = "gemini-2.0-flash"
    
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
            types.Part.from_text(text="""Eres un experto en la ciberseguridad del IoT. Proporciona recomendaciones claras y prácticas sobre seguridad en dispositivos IoT, explicando los conceptos de manera sencilla para usuarios no técnicos. Sé conciso pero informativo, y ofrece pasos accionables cuando sea posible.""")
        ],
    )
    
    # Generate and stream the response
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

def main():
    """Main chatbot function"""
    api_key = load_api_key()
    client = initialize_client(api_key)
    
    conversation_history = []
    
    while True:
        try:
            user_input = input("\nTú: ")
            
            if user_input.lower() in ['salir', 'exit', 'quit']:
                print("\nHasta luego! Recuerda mantener actualizados tus dispositivos IoT.")
                break
                
            if not user_input.strip():
                print("Por favor, ingresa una pregunta o consulta.")
                continue
                
            print("\nAsistente: ", end="")
            response = generate_response(client, user_input, conversation_history)
            
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