from email.policy import default
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Resource, Api
from sqlalchemy.dialects.postgresql import UUID
import uuid

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)


class Borrower (db.Model):
    id = db.Column(db.String(50), primary_key=True)
    first_name = db.Column(db.Text)
    last_name = db.Column(db.Text)
    relationship = db.Column(db.Text)
    city = db.Column(db.Text)
    books = db.relationship(
        'Book', backref='borrower', lazy='dynamic')

    def __init__(self, id, first_name, last_name, relationship, city) -> None:
        print("made it")
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.relationship = relationship
        self.city = city


class BorrowerManager(Resource):
    @staticmethod
    def get():
        try:
            id = request.args['id']
        except Exception as _:
            id = None

        if not id:
            users = Borrower.query.all()
            print(users)
            return jsonify(borrowers_schema.dump(users))

        user = Borrower.query.get(id)
        return jsonify(borrower_schema.dump(user))

    @staticmethod
    def post():
        id = str(uuid.uuid1())
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        relationship = request.json['relationship']
        city = request.json['city']

        borrower = Borrower(id, first_name, last_name,
                            relationship, city)
        db.session.add(borrower)
        db.session.commit()

        return jsonify({
            'Message': f'Borrower {first_name} {last_name} inserted.'
        })


api.add_resource(BorrowerManager, '/api/borrower')


class BorrowerSchema(ma.Schema):
    class Meta:
        fields = ('id', 'first_name', 'last_name',
                  'relationship', 'city')


borrower_schema = BorrowerSchema()
borrowers_schema = BorrowerSchema(many=True)


class Book (db.Model):
    id = db.Column(db.String(50), primary_key=True, unique=True)
    title = db.Column(db.String(50))
    author = db.Column(db.String(50))
    checkout_id = db.Column(db.String(50), db.ForeignKey('borrower.id'))

    def __init__(self, id, title, author) -> None:
        print('HERE')
        self.id = id
        self.title = title
        self.author = author
        self.checkout_id = None


class BookManager(Resource):
    @staticmethod
    def get():
        try:
            id = request.args['id']
        except Exception as _:
            id = None

        if not id:
            users = Book.query.all()
            print(users)
            return jsonify(books_schema.dump(users))

        user = Book.query.get(id)
        return jsonify(book_schema.dump(user))

    @staticmethod
    def post():
        print("here")
        id = str(uuid.uuid1())
        title = request.json['title']
        author = request.json['author']
        print(author)

        book = Book(id, title, author)
        print(book)
        db.session.add(book)
        db.session.commit()

        return jsonify({
            'Message': f'{title} by {author} inserted.'
        })


api.add_resource(BookManager, '/api/book')


class BookSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'author', 'checkout_id')


book_schema = BookSchema()
books_schema = BookSchema(many=True)

if __name__ == '__main__':
    app.run(debug=True)
