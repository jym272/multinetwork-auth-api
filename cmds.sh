#!/usr/bin/env bash


# curl to localhost:8080/signup with { "email": jym282@gmail.com, "password": "password" }
curl -s -X POST -H "Content-Type: application/json" -d '{"email": "jym272@email.com", "password": "password"}' http://localhost:3050/signup | jq




token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGUiOnRydWUsImlhdCI6MTY3MzkwNjk2NywiZXhwIjoxNjczOTkzMzY3fQ.0WPCmbOrnYA6WMz81--jlfydR9rUFSASwSqLnCU5cYg


curl -s localhost:3051/verify-token/$token | jq