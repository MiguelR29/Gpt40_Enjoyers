import requests

CLOUDFLARE_WORKER_URL = "https://firewall-worker.TU_DOMINIO.workers.dev"

def check_traffic(ip):
    headers = {"CF-Connecting-IP": ip}
    response = requests.get(CLOUDFLARE_WORKER_URL, headers=headers)
    return response.text
