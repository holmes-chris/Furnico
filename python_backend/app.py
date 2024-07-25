from flask import Flask, jsonify
from flask_cors import CORS 
from pymongo import MongoClient 
from dotenv import load_dotenv
import os

app = Flask(__name__)
#accept requests to any route preppended by /admin from localhost:3000 or local IP only
CORS(app, resources={r"/admin/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})
# loading env variables
load_dotenv()

#mongo connection setup
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client["test"]

collection = db["shipments"]
print("Connected to the database: ", db)
print("Connected to collection: ", collection)



@app.route("/admin/shipment_costs", methods=["GET"])
def getShipmentCosts():
    #querying the shipment collection and grabbing the shipmentCost field
    #{} means empty filter object (querying every shipment collection for shipment cost )
    
    # shipmentCosts = list(collection.find({}, {"_id": 0, "shipmentCost": 1, "shipmentDate": 1}))
    # x = [shipment['date']]
    try: 
        shipmentCosts = list(collection.find({}, {"_id": 0, "shipmentCost": 1, "shipmentDate": 1}))
        return jsonify(shipmentCosts)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)