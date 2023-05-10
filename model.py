from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import desc, event, func, orm
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy_utils import ArrowType, auto_delete_orphans
import slugify

db = SQLAlchemy()


class User(db.Model):

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    email = db.Column(db.String(30),
                      unique=True,
                      nullable=False)
    password = db.Column(db.String,
                         nullable=False)
    username = db.Column(db.String(20),
                         nullable=False)
    
    notes = db.relationship("Note", back_populates="user")
    categories = db.relationship("Category", back_populates="user")

    def __repr__(self):
        return f'<User user_id={self.user_id}, email={self.email}>'


class Note(db.Model):

    __tablename__ = "notes"

    def __init__(self, title, body_content, entry_date, user,
                 category):
        self.title = title
        self.body_content = body_content
        self.entry_date = entry_date
        self.user_id = user.user_id
        self.category_id = category.category_id
        self.user = user        
        self.category = category
    
    note_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    title = db.Column(db.String(35),
                      nullable=False)
    body_content = db.Column(db.Text)
    entry_date = db.Column(db.DateTime)
    user_id = db.Column(db.Integer,
                        db.ForeignKey("users.user_id"))
    category_id = db.Column(db.Integer,
                            db.ForeignKey("categories.category_id"))
    
    user = db.relationship("User", back_populates="notes")
    category = db.relationship("Category", back_populates="notes")

    def __repr__(self):
        return f'<Note note_id={self.note_id}, title={self.title}>'
    

class Category(db.Model):

    __tablename__ = "categories"

    def __init__(self, name, user):
        self.name = name
        self.user_id = user.user_id
        self.user = user
        

    category_id = db.Column(db.Integer,
                            autoincrement=True,
                            primary_key=True)
    name = db.Column(db.String(30),
                     nullable=False)
    user_id = db.Column(db.Integer,
                        db.ForeignKey("users.user_id"))
    
    user = db.relationship("User", back_populates="categories")
    notes = db.relationship("Note", back_populates="category")
    
    def __repr__(self):
        return f'<Category category_id={self.category_id}, name={self.name}>'


def connect_to_db(flask_app, db_uri="postgresql:///jayskine", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")

if __name__ == "__main__":
    from server import app
    connect_to_db(app)