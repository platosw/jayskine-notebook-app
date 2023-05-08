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
    new_user = crud.create_user(f"user{num}@users.com", "user1234", f"User {num}")
    users.append(new_user)

model.db.session.add_all(users)
model.db.session.commit()

# add categories
categories = []
for num in range(1, 6):
    new_category = crud.create_category(f"Category {num}")
    categories.append(new_category)

model.db.session.add_all(categories)
model.db.session.commit()

# add notes
notes = []
for title in range(1, 21):
    new_note = crud.create_note(f"Title {title}",
                            "This is just testing.",
                            choice(users),
                            choice(categories))
    notes.append(new_note)

model.db.session.add_all(notes)
model.db.session.commit()
