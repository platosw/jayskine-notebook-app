from model import User, Note, Category, connect_to_db, db
from datetime import datetime

# About users table
def create_user(email, password, username):
    user = User(email=email, password=password, username=username)
    return user

def get_user(id):
    return User.query.get(id)

def get_user_by_email(email):
    return User.query.filter_by(email=email).first()

def update_user(id, password, username):
    user = User.query.get(id)
    user.password = password
    user.username = username
    return user

def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return 'User account has been deleted.'

# About notes table
def create_note(title, body_content, user, category):
    note = Note(title=title, body_content=body_content,
                entry_date=datetime.now().strftime('%c'),
                user=user, category=category)
    return note

def get_all_notes():
    notes = Note.query.order_by(Note.entry_date.desc()).all()
    return notes

def get_note(id):
    note = Note.query.get(id)
    return note

def update_note(id, title, body_content, category):
    note = Note.query.get(id)
    note.title = title
    note.body_content = body_content
    note.entry_date = datetime.now().strftime('%c')
    note.category = category
    return note

def delete_note(id):
    note = Note.query.get(id)
    db.session.delete(note)
    db.session.commit()
    return "This note has been deleted."

# About categories table
def create_category(name, user):
    category = Category(name=name, user=user)
    return category

def get_all_categories():
    categories = Category.query.order_by(db.func.lower(Category.name)).all()
    return categories

def get_category(id):
    return Category.query.get(id)

def update_category(id, name):
    category = Category.query.get(id)
    category.name = name
    return category

def delete_category(id):
    category = Category.query.get(id)
    db.session.delete(category)
    db.session.commit()
    return "This category has been deleted"


if __name__ == "__main__":
    from server import app
    connect_to_db(app)
    