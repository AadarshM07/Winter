from config import db

# Table fro signup/login

class Authorize(db.Model):
    __tablename__ = 'authorize'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def to_confirm(self):
        return {
            "id":self.id,
            "name":self.name,
            "email":self.email,
            "password":self.password,
        }

#Table to store movie details
class Movies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False ,unique=True)
    small_description = db.Column(db.String(500), nullable=False)
    image_url = db.Column(db.String(250), nullable=False)
    web_url = db.Column(db.String(250), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    director = db.Column(db.String(120), nullable=False)
    cast = db.Column(db.String(200), nullable=False)  
    production = db.Column(db.String(250), nullable=False)
    country = db.Column(db.String(120), nullable=False)
    genre = db.Column(db.String(120), nullable=False)
  

    def to_header(self):
        return {
            "id": self.id,
            "name": self.name,
            "smallDescription": self.small_description,
            "imageUrl": self.image_url,
            "releaseDate": self.release_date.isoformat(),
            "genre": self.genre,
            "rating":self.rating,
        }
    
    def to_footer(self):
        return{
            "name": self.name,
            "smallDescription": self.small_description,
            "imageUrl": self.image_url,
            "releaseDate": self.release_date.isoformat(),
            "genre": self.genre,
            "weburl": self.web_url,
            "rating": self.rating,
            "director": self.director,
            "cast": self.cast,
            "production": self.production,
            "country": self.country,

        }

#Table to store all review details
class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name=db.Column(db.String(80),nullable=False)
    mname=db.Column(db.String(120),nullable=False)
    review=db.Column(db.String(500),nullable=False)
    date=db.Column(db.Date, nullable=False)
    likes=db.Column(db.Integer,nullable=True)

    def to_review(self):
        return{
            "id":self.id,
            "name":self.user_name,
            "MovieName":self.mname,
            "review":self.review,
            "ReviewDate":self.date.isoformat(),
        }
