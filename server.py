import os
from flask import Flask, render_template, request, flash, session, redirect


app = Flask(__name__)
app.secret_key = "dev"

from model import db, connect_to_db
import crud


# About show routes
@app.route("/")
def index():
    notes = crud.get_all_notes()
    categories = crud.get_all_categories()
    return render_template("index.html", notes=notes, categories=categories)

@app.route("/categories/<category_id>")
def show_detail_category(category_id):
    category = crud.get_category(category_id)
    return render_template("detail_category.html", category=category)

@app.route("/notes/<note_id>")
def show_detail_note(note_id):
    note = crud.get_note(note_id)
    categories = crud.get_all_categories()
    return render_template("detail_note.html", note=note, categories=categories)


# About create routes
@app.route("/add_category", methods=["POST"])
def add_category():
    name = request.form.get("category_name")
    new_category = crud.create_category(name)
    db.session.add(new_category)
    db.session.commit()
    return redirect("/")

@app.route("/add_note", methods=["POST"])
def add_note():
    title = request.form.get("note_title")
    body_content = request.form.get("note_context")
    user_email = request.form.get("note_user_email")
    category_id = request.form.get("note_category_id")
    user = crud.get_user_by_email(user_email)
    category = crud.get_category(category_id)
    new_note = crud.create_note(title, body_content, user, category)
    db.session.add(new_note)
    db.session.commit()
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
    new_category = crud.get_category(new_category_id)
    update_note = crud.update_note(id, new_title, new_body_content, new_category)
    db.session.add(update_note)
    db.session.commit()
    return redirect(f"/notes/{id}")


# About athentication routes
@app.route("/login", methods=["POST"])
def login():
    email = request.form.get("user_email")
    password = request.form.get("user_password")
    user = crud.get_user_by_email(email)
    if user.password == password:
        session["user_email"] = user.email
        flash(f"Welcome {user.username}!")
    else:
        flash("Your email or password does not match. Please try again.")

    return redirect("/")

@app.route("/logout")
def logout():
    session.clear()
    flash("You are logged out.")
    return redirect("/")


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)