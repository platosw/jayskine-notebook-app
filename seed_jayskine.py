import os
import json
from random import choice

import server
import model
import crud

os.system("dropdb jayskine")
os.system("createdb jayskine")

model.connect_to_db(server.app)
model.db.create_all()

# add users
users = []
for num in range(1, 11):
    new_user = crud.create_user(f"user{num}@users.com", f"User {num}")
    new_user.set_password("user1234")
    users.append(new_user)

model.db.session.add_all(users)
model.db.session.commit()

# add categories and notes
categories = []
notes = []
for num in range(1, 6):
    user = choice(users)
    new_category = crud.create_category(f"Category {num}", user)
    categories.append(new_category)

    for title in range(1, 4):
        new_note = crud.create_note(f"Title {title}",
                                    "This is just testing.",
                                    user,
                                    new_category)
        notes.append(new_note)

model.db.session.add_all(categories)
model.db.session.add_all(notes)
model.db.session.commit()
