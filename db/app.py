from distutils.log import debug
import re
from wsgiref.handlers import read_environ
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Resource, Api 
import uuid 

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Borrower (db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    relationship = db.Column(db.String(50))
    city = db.Column(db.String(50))
    books = db.relationship('Books', backref='borrower', lazy='dynamic')

    def __init__(self, id, first_name, last_name, relationship, city, books) -> None:
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.relationship = relationship
        self.city = city

class BorrowerManager(Resource):
    @staticmethod
    def post():
        id = uuid.uuid1()
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        relationship = request.json['relationship']
        city = request.json['city']

        borrower = Borrower(id, first_name, last_name, relationship, city)
        db.session.add(borrower)
        db.session.commit()

        return jsonify({
            'Message: borrower was inserted'
        })

api.add_resource(BorrowerManager, '/api/borrower')


class BorrowerSchema(ma.Schema):
    class Meta: 
        fields = ('id', 'first_name', 'last_name', 'relationship', 'city', 'books')

class Book (db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    title = db.Column(db.String(50))
    author = db.Column(db.String(50))
    checkout_id = db.Column(db.Integer, db.ForeignKey('borrower.id'))

    def __init__(self, id, title, author, checkout_id) -> None:
        self.id = id
        self.title = title
        self.author = author
        self.checkout_id = checkout_id

class BookSchema(ma.Schema):
    class Meta: 
        fields = ('id', 'title', 'author', 'checkout_id')

borrower_schema = BorrowerSchema()
borrowers_schema = BorrowerSchema(many=True)


book_schema = BookSchema()
books_schema = BookSchema(many=True)

if __name__ == '__main__':
    app.run(debug=True)






