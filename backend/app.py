from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

    return jsonify({"message": "Data received successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
