from model import User, Note, Category, connect_to_db, db

# About users table
def create_user(email, password, username):
    user = User(email=email, password=password, username=username)
    return user

def get_user(id):
    return User.query.get(id)

def update_user(id, password, username):
    user = User.query.get(id)
    user.password = password
    user.username = username
    return user

def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    return 'User account has been deleted.'

# About notes table
def create_note(title, body_content, entry_date, user, category):
    note = Note(title=title, body_content=body_content,
                entry_date=entry_date, user=user, category=category)
    return note

def get_note(id):
    note = Note.query.get(id)
    return note

def update_note(id, title, body_content, entry_date, category):
    note = Note.query.get(id)
    note.title = title
    note.body_content = body_content
    note.entry_date = entry_date
    note.category = category
    return note

def delete_note(id):
    note = Note.query.get(id)
    db.session.delete(note)
    return "This note has been deleted."

# About categories table
def create_category(name):
    category = Category(name=name)
    return category

def get_category(id):
    return Category.query.get(id)

def update_category(id, name):
    category = Category.query.get(id)
    category.name = name
    return category

def delete_category(id):
    category = Category.query.get(id)
    db.session.delete(category)
    return "This category has been deleted"


if __name__ == "__main__":
    from server import app
    connect_to_db(app)
    