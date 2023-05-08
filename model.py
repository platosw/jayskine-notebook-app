from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User():

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

    def __repr__(self):
        return f'<User user_id={self.user_id}, email={self.email}>'

def connect_to_db(flask_app, db_uri="postgresql:///jayskine", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")

if __name__ == '__main__':
    from server import app
    connect_to_db(app)