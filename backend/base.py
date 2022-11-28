
from flask import Flask
from flask_pymongo import PyMongo
from flask import request, jsonify
import json
from bson.json_util import dumps, loads

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://127.0.0.1:27017/flask12"
app.config["DEBUG"] = True
mongo = PyMongo(app)
names = mongo.db.example
filter_status = 'false'
# name12=''

@app.route('/', methods=['GET'])
def get():
    arg1 = (request.args.get('filter'))
    if len(request.args.keys()) == 0:
        return api_all()
    elif 'filter' in request.args.keys():
       return filter(str(arg1))
    elif request.args.get('sort') == "sortbyasc":
        return sort_Asc()
    elif request.args.get('sort') == "sortbydsc":
        return sort_Dsc()
    # return find(name12)
    
def api_all():
    global filter_status
    x = names.find()
    y = dumps(x) 
    authors = json.loads(y)
    filter_status = 'false'
    return authors 
    
def sort_Asc():
    if filter_status == 'true':
        return (sorted(filterd_1, key=lambda i: (i['Name']),reverse=False))
    elif filter_status == 'false':
        x = names.find().sort("Name",1)
        y = dumps(x) 
        authors = json.loads(y)
        return authors

def sort_Dsc():
    if filter_status == 'true':
        return (sorted(filterd_1, key=lambda i: (i['Name']),reverse=True))
    elif filter_status == 'false':
        x = names.find().sort("Name",-1)
        y = dumps(x) 
        authors = json.loads(y)
        return authors
# # app.add_url_rule("/sortbyasc","sort_Asc",sort_Asc)

def find(name):
    print(name)
    x = names.find()
    y = dumps(list(x), indent = 2) 
    authors = json.loads(y)
    z = []
    for x in authors:
        if name in x['Name']:
            z.append(x)
    a = dumps(z, indent = 2) 
    b = json.loads(a)
    return b
app.add_url_rule("/<string:name>","find",find)

def filter(name):
    global filterd_1,filter_status
    x = names.find()
    y = dumps(list(x), indent = 2) 
    authors = json.loads(y)
    z = []
    for x in authors:
        if name in x['Name']:
            z.append(x)
    a = dumps(z, indent = 2) 
    b = json.loads(a)
    filterd_1,filter_status = b, 'true'
    if request.args.get('sort') == 'sortbyasc':
      return (sorted(b, key=lambda i: (i['Name']),reverse=False))
    elif request.args.get('sort') == 'sortbydsc':
       return (sorted(b, key=lambda i: (i['Name']),reverse=True))

# @app.route("/sortbyasc",methods=['GET'])
# def sort_Asc():
#     x = names.find().sort("Name",1)
#     y = dumps(x) 
#     authors = json.loads(y)
#     return authors

# @app.route("/<string:name>",methods=['GET'])
# def find(name):
#     print(name)
#     x = names.find()
#     y = dumps(list(x), indent = 2) 
#     authors = json.loads(y)
#     z = []
#     for x in authors:
#         if name in x['']:
#             z.append(x)
#     a = dumps(z, indent = 2) 
#     b = json.loads(a)
#     return b


# @app.route("/",methods=['GET'])
# def get_details():    
#     arg1 = (request.args.get('filter'))
#     if len(request.args.keys()) == 0:
#         return home_page()
#     elif 'filter' in request.args.keys():
#        return filter(str(arg1))
#     elif request.args.get('sort') == "sortbyasc":
#         return sort_Asc()
#     elif request.args.get('sort') == "sortbydsc":
#         return sort_Dsc()
        

@app.route('/api/adduser', methods=['POST'])
def api_id():
    req = request.get_json()   
    NAME = req['Name']
    CLASS = req['class']
    ROW1 = req['Rollno']
    MARK2 = req['Mark']
    # mongo.db.example.insert_one({"Name" : NAME, "class" : CLASS, "Roll no" : ROW1,"Mark" : MARK2})
    # return "New data added"  
    names.create_index("Name",unique=True)
    try :
      names.insert_one({"Name" : NAME, "class" : CLASS, "Rollno" : ROW1,"Mark" : MARK2})
    except :
        return "Name already exist" 
    return "New data added" 


app.run()