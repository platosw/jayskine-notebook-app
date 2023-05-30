import crud
from model import db, connect_to_db
import os
from flask import Flask, render_template, request, flash, session, redirect, jsonify
from flask_mde import Mde, MdeField
from flask_wtf import FlaskForm
from wtforms import SubmitField
import markdown
from transform_object_to_dictionary import get_all_notes, get_all_categories, get_category

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
mde = Mde(app)
app.jinja_env.undefined = StrictUndefined


class MdeForm(FlaskForm):
    editor = MdeField()
    submit = SubmitField()


# This is a root route
@app.route("/")
def index():
    return render_template("index.html")

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


# This is only current login user's data api
@app.route("/jayskine.api")
def index_data():
    if "user" in session:
        # print(session['user'])
        current_user_id = crud.get_user_by_email(
            session["user"]["email"]).user_id
        return jsonify([get_all_notes(current_user_id), get_all_categories(current_user_id)])
    else:
        return redirect('/')


@app.route("/categories.api/<category_id>")
def detail_category_data(category_id):
    if "user" in session:
        category = get_category(category_id)
        if session["user"]["email"] == category["user"]["email"]:
            return jsonify(category)
        else:
            return redirect("/")
    else:
        return redirect("/")

# About show routes


@app.route("/create_note")
def show_create_note():
    form = MdeForm()
    current_user_id = crud.get_user_by_email(session["user"]["email"]).user_id
    categories = get_all_categories(current_user_id)
    return render_template("create_note.html", form=form, categories=categories)


@app.route("/notes/<note_id>")
def show_detail_note(note_id):
    if "user" in session:
        form = MdeForm()
        note = crud.get_note(note_id)
        current_user = crud.get_user_by_email(session["user"]["email"])
        content = markdown.markdown(note.body_content)
        categories = crud.get_all_categories(current_user.user_id)
        return render_template("detail_note.html", note=note, categories=categories, content=content, form=form)
    else:
        return redirect("/")


@app.route("/users/<email>")
def show_user(email):
    user = crud.get_user_by_email(email)
    return render_template("detail_user.html", user=user)


@app.route("/tags")
def show_tags():

    return render_template("tags.html")


# About create routes
@app.route("/add_category", methods=["POST"])
def add_category():
    name = request.json.get("name")
    user_email = session["user"]["email"]
    user = crud.get_user_by_email(user_email)
    new_category = crud.create_category(name, user)
    db.session.add(new_category)
    db.session.commit()
    return ""


@app.route("/add_note", methods=["POST"])
def add_note():
    title = request.form.get("note_title")
    body_content = request.form.get("editor")
    user_email = session["user"]["email"]
    category_id = request.form.get("note_category_id")
    tags = request.form.get("tags")
    user = crud.get_user_by_email(user_email)
    category = crud.get_category(category_id)
    new_note = crud.create_note(title, body_content, user, category, tags)
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
    id = request.json.get("id")
    name = request.json.get("name")
    updated_category = crud.update_category(id, name)
    db.session.add(updated_category)
    db.session.commit()
    cat = get_category(id)
    print(cat)
    return jsonify(cat)


@app.route("/edit_note", methods=["POST"])
def update_note():
    id = request.form.get("note_id")
    new_title = request.form.get("note_title")
    new_body_content = request.form.get("body_content")
    new_category_id = request.form.get("note_category")
    new_tags = request.form.get("tags")
    new_category = crud.get_category(new_category_id)
    update_note = crud.update_note(
        id, new_title, new_body_content, new_category, new_tags)
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


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
