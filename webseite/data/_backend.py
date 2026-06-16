# Direkte API Anbindung

import requests

class API:
    def __init__(self, url):
        self.url = url
        
    def request(self, path, method="GET", body=None):
        
        allowedMethods = ["GET", "OPTIONS", "HEAD", "POST", "PUT", "PATCH", "DELETE"]
        if not method in allowedMethods: print("Debug: Method not allowed!")
        
        url = self.url + path
        
        r = requests.request(method, url, data=body)
        
        if not r.ok: print("Debug: ")
        
        data = r.json()
        
        
api = API("") # URL vom Backend
print(api.request("/booking"))