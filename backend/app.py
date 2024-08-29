from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient


app = Flask(__name__)
CORS(app)

# Connect to DocumentDB
client = MongoClient("docdbcluster.cluster-c9ioi86a4odf.us-east-2.docdb.amazonaws.com:27017", 
                     username="Administrator", 
                     password="mypassword",
                     tls=True, 
                     tlsAllowInvalidCertificates=True)

# Access the database and collection
db = client['ai_food_therapy_db']
collection = db['user_responses']

@app.route('/submit', methods=['POST'])
def submit_form():
    data = request.json

    # Print form data to the console
    print("Received data:")
    print(f"Age: {data.get('age')}")
    print(f"Gender: {data.get('gender')}")
    print(f"Country: {data.get('country')}")
    print(f"Energy Level: {data.get('energyLevel')}")
    print(f"Health Issues: {', '.join(data.get('healthIssues', []))}")
    print(f"Health Goals: {', '.join(data.get('healthGoals', []))}")
    print(f"Other Health Goal: {data.get('otherHealthGoal')}")
    print(f"Email: {data.get('email')}")
    print(f"Receive Updates: {data.get('receiveUpdates')}")

    # Insert the data into DocumentDB
    collection.insert_one({
                        "age": data.get('age'), 
                        "gender": data.get('gender'), 
                        "country": data.get('country'), 
                        "energy_level": data.get('energyLevel'),
                        "health_issues": ', '.join(data.get('healthIssues', [])),
                        "health_goals": ', '.join(data.get('healthGoals', [])),
                        "other_health_goal": data.get('otherHealthGoal'),
                        "email": data.get('email'),
                        "receive_updates": data.get('receiveUpdates')
                          })

    return jsonify({"message": "Data received and stored successfully!"})


if __name__ == '__main__':
    app.run(debug=True)

