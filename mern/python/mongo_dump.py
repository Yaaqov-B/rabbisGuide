import pymongo
import json
import bson
from bson.objectid import ObjectId
import os
url = os.getenv('ATLAS_URI')
print(url)
# Connect to MongoDB database
mongo_client = pymongo.MongoClient(url)
mongo_db = mongo_client["sample_training4"]
#
# # Create MongoDB collection (if not exists)
collection = mongo_db["records"]

# dump_file_path = "mydump.bson"
#
#
# with open(dump_file_path, "wb") as f:
#     # Use the mongodump tool to dump the collection to the file
#     for document in collection.find():
#         f.write(bson.BSON.encode(document))

# Create the dump file path
dump_file_path = "db/30nov23.json"

# Create a file stream to write the dump to
with open(dump_file_path, "w") as f:
    # List all documents from the collection
    documents = collection.find()

    # Convert documents to JSON format and replace ObjectId with strings
    json_documents = [
        {**doc, "_id": str(doc["_id"])} for doc in documents
    ]

    # Write the JSON data to the file
    json.dump(json_documents, f)