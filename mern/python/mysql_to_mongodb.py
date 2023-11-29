import pymongo
import pymysql
from bson.objectid import ObjectId

# Connect to MySQL database
mysql_db = pymysql.connect(host="localhost", user="root", database="guide")
mysql_cursor = mysql_db.cursor()

# Execute SQL query and fetch data
mysql_cursor.execute("SELECT * FROM rabbi_extend")
mysql_data = mysql_cursor.fetchall()

# Connect to MongoDB database
mongo_client = pymongo.MongoClient("mongodb+srv://yaaqov:Wh4LEz3fYb3xJYMm@cluster0.f3shytp.mongodb.net/?retryWrites=true&w=majority")
mongo_db = mongo_client["sample_training2"]
#
# # Create MongoDB collection (if not exists)
mongo_collection = mongo_db["records"]

mongo_collection.delete_many({})

#
# # Transform MySQL data into MongoDB format
mongo_data = []
for row in mysql_data:
    doc = {}
    doc['_id']= ObjectId()
    doc['name']=row[0]
    doc['alias']=row[1]
    doc['born']=row[2]
    doc['died']=row[3]
    doc['birthPlace']=row[4]
    doc['deathPlace']=row[5]
    doc['description']=row[6]
    doc['externalLinks']=row[7]
    if row[8] is not None:
        books = []
        for book in row[8].split(','):
            books.append({'title':book})
        doc['books'] = books
    if row[9] is not None:
        teachers = []
        for teacher in row[9].split(','):
            teachers.append({'name':teacher})
        doc['teachers']= teachers
    if row[10] is not None:
        students = []
        for student in row[10].split(','):
            students.append({'name':student})
        doc['students']= students
    mongo_data.append(doc)

mongo_collection.insert_many(mongo_data)

# for c in mongo_db.list_collections():
#     print(c)
# for d in mongo_collection.find():
#     print(d)

