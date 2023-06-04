from model import User, Note, Category, connect_to_db, db
from datetime import datetime


# About users table
def create_user(email, username):
    """
    Creating new user

    Args:
        email (str): user's email
        username (str): user's name (such as nickname)

    returns:
        User: created user object
    """
    user = User(email=email, username=username)
    return user


def get_user(id):
    """
    Getting the user data corresponding to a given id

    Args:
        id (int): user's id

    returns:
        User: user object or None (if a given id is not in the database)
    """
    return User.query.get(id)


def get_user_by_email(email):
    """
    Bringing user's data by a given user email

    Args:
        email (str): user email

    Returns:
        User: user object or None (if a given id is not in the database)
    """
    return User.query.filter_by(email=email).first()


def update_user(id, username):
    """
    Updating user's data

    Agrs:
        id (int): user id
        username (str): username for updating

    Returns:
        User: updated user's object
    """
    user = User.query.get(id)
    user.username = username
    return user


def delete_user(id):
    """
    Removing user's object

    Args:
        id (int): user id

    Returns:
        str: user account deletion completed message
    """
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return 'User account has been deleted.'

# About notes table


def create_note(title, body_content, user, category="", tags=""):
    """
    Creating new note

    Args:
        title (str): note's title
        body_content (str): note's content
        user (User): owner
        category (Category): note's category (default: "")
        tags (str): note's hashtag (default: "")

    Returns:
        Note: created note object
    """
    note = Note(title=title, body_content=body_content,
                entry_date=datetime.now().strftime('%c'),
                user=user, category=category, tags=tags)
    return note


def get_all_notes(id):
    """
    Bringing all notes by a given user's id(owner)

    Args:
        id (int): user id(owner)

    Returns:
        list[Note]: user's all notes
    """
    notes = Note.query.filter_by(user_id=id).all()
    return notes


def get_note(id):
    """
    Bringing the note by a given note id

    Args:
        id (int): note id

    Returns:
        Note: the note object or None (if a given id is not in the database)
    """
    note = Note.query.get(id)
    return note


def update_note(id, title, body_content, category, tags):
    """
    Updating note's data

    Args:
        id (int): note id
        title (str): note's title for updating
        body_content (str): note's contents for updating
        category (Category): note's category for updating
        tags (str): note's hashtags for updating

    Returns:
        Note: updated note object
    """
    note = Note.query.get(id)
    note.title = title
    note.body_content = body_content
    note.entry_date = datetime.now().strftime('%c')
    note.category = category
    note.tags = tags
    return note


def delete_note(id):
    """
    Removing note's object

    Args:
        id (int): note id

    Returns:
        str: the note deletion completed message
    """
    note = Note.query.get(id)
    db.session.delete(note)
    db.session.commit()
    return "This note has been deleted."

# About categories table


def create_category(name, user):
    """
    Creating new category

    Args:
        name (str): category name
        user (User): owner

    Returns:
        Category: created category object
    """
    category = Category(name=name, user=user)
    return category


def get_all_categories(user_id):
    """
    Bringing all categories by a given user's id(owner)

    Args:
        user_id (int): user id

    Returns:
        list[Category]: user(owner)'s all categories
    """
    categories = Category.query.filter_by(user_id=user_id).all()
    return categories


def get_category(id):
    """
    Bringing the note by a given note id

    Args:
        id (int): category id

    Returns:
        Category: Note: the category object or None (if a given id is not in the database)
    """
    return Category.query.get(id)


def update_category(id, name):
    """
    Updating category's data

    Args:
        id (int): category id
        name (str): category name for updating

    Returns:
        Category: updated category object
    """
    category = Category.query.get(id)
    category.name = name
    return category


def delete_category(id):
    """
    Removing category's object

    Args:
        id (int): category id

    Returns:
        str: the category deletion completed message
    """
    category = Category.query.get(id)
    db.session.delete(category)
    db.session.commit()
    return "This category has been deleted"


if __name__ == "__main__":
    from server import app
    connect_to_db(app)
