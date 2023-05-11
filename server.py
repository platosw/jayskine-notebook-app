import os
from flask import Flask, render_template, request, flash, session, redirect, jsonify

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

from model import db, connect_to_db
import crud


# About show routes
@app.route("/")
def index():
     notes = []
     categories = []
     return render_template("index.html", notes=notes, categories=categories)

@app.route("/index_data")
def index_data():
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
         notes_list = []
         for note in notes:
              notes_list.append(
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
                   "notes": notes_list
              }
         )

    json_data = {"notes": notes_json, "categories": categories_json}
    return jsonify(json_data)

@app.route("/categories/<category_id>")
def show_detail_category(category_id):
    if "user" in session:
        category = crud.get_category(category_id)
        return render_template("detail_category.html", category=category)
    else:
        return redirect("/")

@app.route("/notes/<note_id>")
def show_detail_note(note_id):
    if "user" in session:
        note = crud.get_note(note_id)
        categories = crud.get_all_categories()
        return render_template("detail_note.html", note=note, categories=categories)
    else:
        return redirect("/")
    
@app.route("/users/<email>")
def show_user(email):
    user = crud.get_user_by_email(email)
    return render_template("detail_user.html", user=user)


# About create routes
@app.route("/add_category", methods=["POST"])
def add_category():
        name = request.form.get("category_name")
        user_email = session["user"]["email"]
        user = crud.get_user_by_email(user_email)
        new_category = crud.create_category(name, user)
        db.session.add(new_category)
        db.session.commit()
        return redirect("/")

@app.route("/add_note", methods=["POST"])
def add_note():
        title = request.form.get("note_title")
        body_content = request.form.get("note_context")
        user_email = session["user"]["email"]
        category_id = request.form.get("note_category_id")
        user = crud.get_user_by_email(user_email)
        category = crud.get_category(category_id)
        new_note = crud.create_note(title, body_content, user, category)
        db.session.add(new_note)
        db.session.commit()
        return redirect("/")

@app.route("/add_user", methods=["POST"])
def add_user():
    email = request.form.get("email")
    password = request.form.get("password")
    username = request.form.get("username")

    user = crud.get_user_by_email(email)
    if user:
        flash("Cannot create an account with this email. Try again.")
        return redirect("/")
    else:
        user = crud.create_user(email, password, username)
        db.session.add(user)
        db.session.commit()
        flash(f"{user.username}, your account created!")
        session["user"] = {"email": user.email, "username": user.username}
        return redirect("/")



# About update routes
@app.route("/edit_category", methods=["POST"])
def update_category():
        id = request.form.get("category_id")
        name = request.form.get("edit_category_name")
        updated_category = crud.update_category(id, name)
        db.session.add(updated_category)
        db.session.commit()
        return redirect(f"/categories/{id}")

@app.route("/edit_note", methods=["POST"])
def update_note():
        id = request.form.get("note_id")
        new_title = request.form.get("note_title")
        new_body_content = request.form.get("body_content")
        new_category_id = request.form.get("note_category")
        new_tags = request.form.get("tags")
        new_category = crud.get_category(new_category_id)
        update_note = crud.update_note(id, new_title, new_body_content, new_category, new_tags)
        db.session.add(update_note)
        db.session.commit()
        return redirect(f"/notes/{id}")

@app.route("/edit_user", methods=["POST"])
def update_user():
     email = session["user"]["email"]
     user = crud.get_user_by_email(email)
     new_username = request.form.get("username")
     new_password = request.form.get("password")
     update_user = crud.update_user(user.user_id, new_password, new_username)
     db.session.add(update_user)
     db.session.commit()
     session["user"] = {"email": user.email, "username": user.username}
     return redirect(f"/users/{email}")


# About Delete routes
@app.route("/delete_user/<user_id>")
def delete_user(user_id):
     msg = crud.delete_user(user_id)
     session.clear()
     flash(msg)
     return redirect("/")

@app.route("/delete_category/<category_id>")
def delete_category(category_id):
     msg = crud.delete_category(category_id)
     flash(msg)
     return redirect("/")

@app.route("/delete_note/<note_id>")
def delete_note(note_id):
     msg = crud.delete_note(note_id)
     flash(msg)
     return redirect("/")


# About authentication routes
@app.route("/login", methods=["POST"])
def login():
    email = request.form.get("user_email")
    password = request.form.get("user_password")
    user = crud.get_user_by_email(email)
    if user and user.password == password:
        session["user"] = {"email": user.email, "username": user.username}
        flash("You're logged in!")
    else:
        flash("Your email or password does not match. Please try again.")

    return redirect("/")

@app.route("/logout")
def logout():
    if "user" in session:
        session.clear()
        flash("You are logged out.")
        return redirect("/")
    else:
        return redirect("/")


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)