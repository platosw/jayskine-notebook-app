from model import connect_to_db
import crud

notes = crud.get_all_notes()
notes_json = []
for note in notes:
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
                   "category": {
                                "category_id": note.category.category_id,
                                "name": note.category.name,
                                "user_id": note.category.user_id
                                },
                   "tags": note.tags
        })

categories = crud.get_all_categories()
categories_json = []
for category in categories:
    category_notes_list = []
    for note in notes:
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


if __name__ == "__main__":
    from server import app
    connect_to_db(app)
