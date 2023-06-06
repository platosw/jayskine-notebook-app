import crud


def get_all_notes(user_id):
    """
    Bringing and converting all notes objects to dictionaries for sending JSON by a given user_id

    Args:
        user_id (int): user id

    Returns:
        list[dict]: a list of all notes' dictionaries
    """
    notes = crud.get_all_notes(user_id)

    notes_json = []
    for note in notes:
        none = None
        if not note.category:
            none = {
                "category_id": "",
                "name": "",
                "user_id": ""
            }
        else:
            none = {
                "category_id": note.category.category_id,
                "name": note.category.name,
                "user_id": note.category.user_id
            }

        notes_json.append({
            "note_id": note.note_id,
            "title": note.title,
            "body_content": note.body_content,
            "entry_date": note.entry_date,
            "user_id": note.user_id,
            "category_id": note.category_id,
            "user": {
                "user_id": note.user.user_id,
                "email": note.user.email,
                "username": note.user.username
            },
            "category": none,
            "tags": note.tags
        })

    return notes_json


def get_all_categories(user_id):
    """
    Bringing and converting all categories objects to dictionaries for sending JSON by a given user_id

    Args:
        user_id (int): user id

    Returns:
        list[dict]: a list of all categories' dictionaries
    """
    categories = crud.get_all_categories(user_id)
    categories_json = []
    for category in categories:
        category_notes_list = []
        for note in category.notes:
            category_notes_list.append(
                {
                    "note_id": note.note_id,
                    "title": note.title,
                    "body_content": note.body_content,
                    "entry_date": note.entry_date,
                    "user_id": note.user_id,
                    "category_id": note.category_id,
                    "user": {
                        "user_id": note.user.user_id,
                        "email": note.user.email,
                        "username": note.user.username
                    },
                    "category": {
                        "category_id": note.category.category_id,
                        "name": note.category.name,
                        "user_id": note.category.user_id
                    },
                    "tags": note.tags
                }
            )

        categories_json.append(
            {
                "category_id": category.category_id,
                "name": category.name,
                "user_id": category.user_id,
                "user": {
                    "user_id": category.user.user_id,
                    "email": category.user.email,
                    "username": category.user.username
                },
                "notes": category_notes_list
            }
        )

    return categories_json


def get_category(category_id):
    """
    Bringing and converting the category's object to dictionaries for sending JSON by a given category_id

    Args:
        category_id (int): category id

    Returns:
        dict: a dictionary containing information about categories and notes
    """
    category = crud.get_category(category_id)

    category_notes_list = []
    for note in category.notes:
        category_notes_list.append(
            {
                "note_id": note.note_id,
                "title": note.title,
                "body_content": note.body_content,
                "entry_date": note.entry_date,
                "user_id": note.user_id,
                "category_id": note.category_id,
                "user": {
                    "user_id": note.user.user_id,
                    "email": note.user.email,
                    "username": note.user.username
                },
                "category": {
                    "category_id": note.category.category_id,
                    "name": note.category.name,
                    "user_id": note.category.user_id
                },
                "tags": note.tags
            }
        )

    category_json = {
        "category_id": category.category_id,
        "name": category.name,
        "user_id": category.user_id,
        "user": {
            "user_id": category.user.user_id,
            "email": category.user.email,
            "username": category.user.username
        },
        "notes": category_notes_list
    }

    return category_json
