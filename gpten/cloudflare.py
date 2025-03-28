import requests

CLOUDFLARE_WORKER_URL = "https://firewall-worker.hramirez03.workers.dev"

def check_traffic(ip):
    headers = {"CF-Connecting-IP": ip}
    response = requests.get(CLOUDFLARE_WORKER_URL, headers=headers)
    return response.text
