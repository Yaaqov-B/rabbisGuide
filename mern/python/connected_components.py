import pymongo
import json
import bson
from bson.objectid import ObjectId
import networkx as nx
import pymongo
import bson
import json
import chardet
import codecs
from pyvis.network import Network
from bson.objectid import ObjectId
import os


def get_documents():
    with open("../db/29nov23.json", "r") as f:
        return json.load(f)


def create_graph(data, directed=False):
    g = nx.Graph()

    if directed:
        g = nx.DiGraph()

    for i, d in enumerate(data):
        g.add_node(d['name'])

    for i, d in enumerate(data):

        if 'students' in d and d['students'] is not None:
            for s in d['students']:
                try:
                    g.add_edge(d['name'],s['name'])
                except:
                    print(d['name'], s['name'])
        if 'teachers' in d and d['teachers'] is not None:
            for t in d['teachers']:
                try:
                    g.add_edge(t['name'],d['name'])
                except:
                    print(t['name'], d['name'])
    return g


def load_data(data):
    url = os.getenv('ATLAS_URI')
    print(url)
    # Connect to MongoDB database
    mongo_client = pymongo.MongoClient(url)
    mongo_db = mongo_client["sample_training5"]
    collection = mongo_db["records"]
    for d in data:
        d["_id"] = ObjectId(d["_id"])
        collection.insert_one(d)


def add_connected_component(g, data):
    cc = nx.connected_components(g)
    for i, c in enumerate(cc):
        for n in list(c):
            for d in data:
                if d['name'] == n:
                    d['cc'] = i


def save_visualisation(g):
    nt = Network(height="1000px", width="100%",bgcolor="#222222",font_color="grey", directed=True,select_menu=False,filter_menu=False)
    nt.from_nx(g)
    nt.set_options('{"physics": {"enabled": true, "solver": "forceAtlas2Based"}}')
    nt.write_html('../html/ht.html')


documents = get_documents()
G = create_graph(documents)
add_connected_component(G, documents)
G = create_graph(documents, True)
save_visualisation(G)