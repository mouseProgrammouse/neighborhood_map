import json
import os

from flask import Flask
from yelpapi import YelpAPI
from flask import request
from flask.json import jsonify
from flask_cors import CORS

yelp_api = YelpAPI("7LgYxOlDAZm3sQI3jcyxuDnX2KCI1apQAMZkgB1qDlIpjYQgCr-yZ2q1Abeu7C5dE8kxCrPtjbTY_p29v2b2fosjP8evmheO4hDuEoHEkOheEqBBXX5t-Bp8ogYtW3Yx")

app = Flask(__name__)
CORS(app)

def read_json(filename):
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), filename), 'r') as f:
        return json.loads(f.read())

@app.route("/search")
def search_yelp():
    term = request.args.get('term')
    lat = request.args.get('lat')
    lng = request.args.get('lng')
    loc = request.args.get('loc')
    radius = request.args.get('radius')
    return jsonify(yelp_api.search_query(term=term, latitude=lat, longitude=lng, location=loc, radius=radius))

@app.route("/get_locations")
def get_locations():
    return jsonify(read_json("backendLocations.json"))

@app.route("/get_details")
def get_details():
    business_id = request.args.get('id')
    return jsonify(yelp_api.business_query(id=business_id))

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5959)
