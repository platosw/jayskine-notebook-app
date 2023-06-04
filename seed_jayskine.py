# Initialize the database and create test data
# This code initializes the database and creates test data for testing purposes.
import os
from random import choice

import server
import model
import crud


# Drop the existing "jayskine" database using the dropdb command.
os.system("dropdb jayskine")
# Create a new "jayskine" database using the createdb command.
os.system("createdb jayskine")


# Connect the server to the database.
model.connect_to_db(server.app)
# Create all the model tables in the database.
model.db.create_all()


# Add users
users = []
for num in range(1, 11):
    # Create a new user and set the email and username.
    new_user = crud.create_user(f"user{num}@users.com", f"User {num}")
    # Set the password for the user.
    new_user.set_password("user1234")
    # Add the user to the users list.
    users.append(new_user)

# Add all the users in the users list to the database.
model.db.session.add_all(users)
# Commit the changes to the database.
model.db.session.commit()


# Add categories and notes
categories = []
notes = []
for num in range(1, 6):
    # Choose a random user.
    user = choice(users)
    # Create a new category and set the name and user.
    new_category = crud.create_category(f"Category {num}", user)
    # Add the category to the categories list.
    categories.append(new_category)

    for title in range(1, 4):
        # Create a new note and set the title, body content, user, and category.
        new_note = crud.create_note(f"Title {title}",
                                    "This is just testing.",
                                    user,
                                    new_category)
        # Add the note to the notes list.
        notes.append(new_note)

# Add all the categories in the categories list to the database.
model.db.session.add_all(categories)
# Add all the notes in the notes list to the database.
model.db.session.add_all(notes)
# Commit the changes to the database.
model.db.session.commit()
