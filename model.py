from flask_sqlalchemy import SQLAlchemy
import bcrypt

from dataclasses import dataclass

db = SQLAlchemy()


# User model class
@dataclass
class User(db.Model):
    """User model class"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    email = db.Column(db.String(30),
                      unique=True,
                      nullable=False)
    password = db.Column(db.String)
    username = db.Column(db.String(20),
                         nullable=False)

    notes = db.relationship("Note", back_populates="user")
    categories = db.relationship("Category", back_populates="user")

    def set_password(self, password):
        """Set encrypted password"""
        hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        self.password = hashed_password.decode()

    def check_password(self, password):
        """check input password and encrypted password"""
        return bcrypt.checkpw(password.encode(), self.password.encode())

    def __repr__(self):
        return f'<User user_id={self.user_id}, email={self.email}>'


# Note model class
@dataclass
class Note(db.Model):
    """Note model class"""

    __tablename__ = "notes"

    def __init__(self, title, body_content, entry_date, user,
                 category, tags):
        self.title = title
        self.body_content = body_content
        self.entry_date = entry_date
        self.user_id = user.user_id
        self.category_id = category.category_id
        self.user = user
        self.category = category
        self.tags = tags

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
    tags = db.Column(db.String)

    def __repr__(self):
        return f'<Note note_id={self.note_id}, title={self.title}>'


# Category model class
@dataclass
class Category(db.Model):
    """Category model class"""

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
    """Connection between Flask and Database"""

    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    # flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app
    connect_to_db(app)
