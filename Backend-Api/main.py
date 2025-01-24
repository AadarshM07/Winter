from flask import request, jsonify ,session
from config import app, db
from models import Authorize,Reviews,Movies
from datetime import datetime
from datetime import date

app.secret_key="hakkunamattata"

@app.route("/register", methods=["POST"])
def create_user():
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]

    user_exists = Authorize.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    new_user = Authorize(name=name, email=email, password=password)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created kindly SignIN your Account!"}), 201


@app.route("/register",methods=["GET"])
def get_data():
    details=Authorize.query.all()
    json_details=list(map(lambda x: x.to_confirm(), details))
    return jsonify({"Details": json_details})



@app.route("/login",methods=["GET", "POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
     

    user = Authorize.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "User does not exist"}), 401

    if user.password!=password:
        return jsonify({"error": "Password doesnt match"}), 401

    return jsonify({
        "id": user.id,
        "email": user.email,
        "name":user.name
    })


@app.route("/status",methods=["GET"])
def user_status():
    if "Status" in session:
        name=session["Name"]
        email=session["Email"]
        return jsonify({
            "name":name,
            "email":email
        })
    else:
        return jsonify({"UserNotLoggedIN":"Login to continue"})


@app.route("/Movies",methods=["POST"])
def get_movies():
    name = request.json.get("name")
    small_description = request.json.get("smallDescription")
    image_url = request.json.get("imageUrl")
    web_url = request.json.get("weburl")
    release_date_str = request.json.get("releaseDate")
    rating = request.json.get("rating")
    director = request.json.get("director")
    cast = request.json.get("cast")  
    production = request.json.get("production")
    country = request.json.get("country")
    genre = request.json.get("genre")


    try:
        release_date = datetime.strptime(release_date_str, "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"message": "Invalid date format. Use 'YYYY-MM-DD'."}), 400

    status=Movies.query.filter_by(name=name).first() is None

    if(status):
        try:
            new_movie = Movies(
                    name=name,
                    small_description=small_description,
                    image_url=image_url,
                    web_url=web_url,
                    release_date=release_date,  
                    rating=rating,
                    director=director,
                    cast=cast,  
                    production=production,
                    country=country,
                    genre=genre
               )
            db.session.add(new_movie)
            db.session.commit()
        
        except Exception as e:
            return jsonify({"message": str(e)}), 400

        return jsonify({"message": "Movie Added!"}), 201
    else:
        return jsonify({"message":"MovieName already exist"}),404
    

@app.route("/Movies",methods=["GET"])
def send_movietemplates():
    details=Movies.query.all()
    json_details=list(map(lambda x: x.to_header(), details))
    return jsonify({"Movies": json_details})

@app.route("/homepage",methods=["GET"])
def send_home():
    users=Authorize.query.count()
    movies=Movies.query.count()
    reviews=Reviews.query.count()
    return jsonify({"users":users,
                    "movies":movies,
                    "reviews":reviews
                    })

@app.route("/sendMovies/<string:mvname>", methods=["GET"])
def send_movies(mvname):
    details = Movies.query.filter_by(name=mvname).first()  

    if not details:
        return jsonify({"message": "Movie not found"}), 404
    json_details = details.to_footer()

    return jsonify({"Movies": json_details})

@app.route("/reviews",methods=["POST"])

def fetch_reviews():
    user_name = request.json["username"]
    mname = request.json["moviename"]
    review = request.json["review"]
    dat = date.today()  

    new_review = Reviews(user_name=user_name, mname=mname, review=review, date=dat)
    try:
        db.session.add(new_review)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Review added to the database"}), 201


@app.route("/review/<string:mvname>", methods=["GET"])
def send_reviews(mvname):
    details = Reviews.query.filter_by(mname=mvname).all()  

    if not details:
        return jsonify({"message": "Reviews not found"}), 404
    json_details=list(map(lambda x: x.to_review(), details))

    return jsonify({"Reviews": json_details})

@app.route("/recentmovies",methods=["GET"])
def receent_movies():
     details = Movies.query.order_by(Movies.release_date.desc()).limit(3).all()
     json_details=list(map(lambda x: x.to_header(), details))
     return jsonify({"Movies": json_details})


@app.route("/reviews/<string:user>",methods=["GET"])
def user_review(user):
    details=Reviews.query.filter_by(user_name=user).all()
    if not details:
        return jsonify({"message": "Reviews not found"}), 404
    json_details=list(map(lambda x: x.to_review(), details))
    return jsonify({"Reviews": json_details})

    



    


@app.route('/clear', methods=['GET'])   #delete entire table data or i will switch the command to delete any certain
def clear_table():
    try:
        db.session.query(Movies).delete()     #Movies,Authorize,Reviews
        db.session.commit()

        return jsonify({"message": "Table data cleared successfully!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
