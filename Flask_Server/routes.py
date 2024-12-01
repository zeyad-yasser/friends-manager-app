from app import app,db
from flask import request, jsonify
from models import Friend

#Get all friends

@app.route("/api/friends",methods=["GET"])
def get_friends():
    friends = Friend.query.all()
    result = [friend.to_json() for friend in friends]
   
    return jsonify(result),200

#creat a friend
@app.route("/api/friends",methods=["post"])
def create_friend():
    try:
        data=request.json
        name= data.get("name")
        role= data.get("role")
        description= data.get("description")
        gender = data.get("gender")

        #Fetch avatar image based on gender
        if gender =="male":
            img_url=f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url=f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None

        new_friend=Friend(name= name,role=role,description=description,gender=gender,img_url=img_url)
        db.session.add(new_friend)
        db.session.commit()
        return jsonify({"msg":"Firend created successfully"}),201
        #git add .
        #git commit -m "message"
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}),500

#Delete a Friend
@app.route("/api/friends/<int:id>",methods=["DELETE"])
def delete_friend(id):
    try:
       friend =Friend.query.get(id)
       if friend is None:
            return jsonify({"error":"Friend no found"}),404
       db.session.delete(friend)
       db.session.commit() 
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}),500

#Update a Friend
@app.route("/api/friends/<int:id>",methods=["PATCH"])
def update_friend(id):
    try:
      friend=Friend.query.get(id)
      if friend is None:
        return jsonify({"error":"Friend is not found"})
      
      data = request.json
      
      friend.name= data.get("name",friend.name)
      friend.role = data.get("role",friend.role)
      friend.description = data.get("description",friend.description)
      friend.gender= data.get("gender",friend.gender)
      db.session.commit()
      return jsonify(friend.to_json()),200
    
    except Exception as e:
       db.session.rollback()
       return jsonify({"error":str(e)}),500