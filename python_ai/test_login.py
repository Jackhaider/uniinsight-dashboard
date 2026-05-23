import urllib.request
import urllib.parse
import json

url = "http://127.0.0.1:8000/api/v1/auth/login/access-token"
data = urllib.parse.urlencode({"username": "admin@uniinsight.edu", "password": "password"}).encode("utf-8")
req = urllib.request.Request(url, data=data)
try:
    with urllib.request.urlopen(req) as f:
        print("Success:", f.read().decode("utf-8"))
except urllib.error.HTTPError as e:
    print("Failed:", e.code, e.read().decode("utf-8"))
