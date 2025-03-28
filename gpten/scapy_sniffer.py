from scapy.all import sniff

def packet_callback(packet):
    if packet.haslayer("IP"):
        print(f"Paquete detectado de {packet['IP'].src} a {packet['IP'].dst}")

sniff(prn=packet_callback, store=0)
