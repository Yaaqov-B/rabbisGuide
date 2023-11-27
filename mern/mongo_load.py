import pymongo
import bson
import json
import chardet
import codecs

from bson.objectid import ObjectId

# Connect to MongoDB database
mongo_client = pymongo.MongoClient("mongodb+srv://yaaqov:Wh4LEz3fYb3xJYMm@cluster0.f3shytp.mongodb.net/?retryWrites=true&w=majority")
mongo_db = mongo_client["sample_training3"]
#
# # Create MongoDB collection (if not exists)
collection = mongo_db["records"]

# dump_file_path = "mydump.bson"
#
# with open(dump_file_path, 'rb') as f:
#     raw_data = f.read()
#
# det = chardet.detect(raw_data)['encoding']
# print(det)
#
#
# with codecs.open(dump_file_path, "r", encoding='ISO-8859-8') as f:
#     # Use the mongodump tool to dump the collection to the file
#     data = json.load(f)
#
# for document in data:
#     collection.insert_one(document)

# Open the JSON file and read the data
with open("mydump.json", "r") as f:
    data = json.load(f)

# Insert the JSON data into the collection
for document in data:
    collection.insert_one(document)