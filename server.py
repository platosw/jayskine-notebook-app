import crud
from model import db, connect_to_db
import os
from flask import Flask, render_template, request, flash, session, redirect, jsonify
from flask_mde import Mde, MdeField
from flask_wtf import FlaskForm
from wtforms import SubmitField
from flaskext.markdown import Markdown
import openai
from transform_object_to_dictionary import get_all_notes, get_all_categories, get_category

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = os.environ["SECRET_KEYS"]
mde = Mde(app)
Markdown(app, extensions=["nl2br", "fenced_code"],
         extension_configs={
    "footnotes": ("PLACE_MARKER", "~~~~~~~~")
},
    safe_mode=True, output_format='html4',)
app.jinja_env.undefined = StrictUndefined
app.static_folder = 'static'

openai.api_key = os.environ["OPENAI_APIKEY"]


class MdeForm(FlaskForm):
    # Form for the Markdown Editor and Viewer
    editor = MdeField()
    submit = SubmitField()


@app.route("/")
def index():
    """Render the index page."""
    return render_template("index.html")


@app.route("/login_page")
def login_page():
    return render_template("login.html")


@app.route("/signup_page")
def signup_page():
    return render_template("signup.html")


@app.route("/login", methods=["POST"])
def login():
    """Authenticate user login."""
    email = request.form.get("user_email")
    password = request.form.get("user_password")
    user = crud.get_user_by_email(email)

    if user and user.check_password(password):
        session["user"] = {"email": user.email, "username": user.username}
        flash("You're logged in!", "success")
        return redirect("/")
    else:
        flash("Your email or password does not match. Please try again.", "error")
        return redirect("/login_page")


@app.route("/logout")
def logout():
    """Perform user logout."""
    if "user" in session:
        session.clear()
        flash("You are logged out.", "success")
        return redirect("/")
    else:
        return redirect("/")


@app.route("/jayskine.api")
def index_data():
    """API endpoint to retrieve data of the current logged-in user."""
    if "user" in session:
        current_user_id = crud.get_user_by_email(
            session["user"]["email"]).user_id
        return jsonify([get_all_notes(current_user_id), get_all_categories(current_user_id)])
    else:
        return redirect('/')


@app.route("/create_note")
def show_create_note():
    """Render the create note page."""
    if "user" in session:
        form = MdeForm()
        current_user_id = crud.get_user_by_email(
            session["user"]["email"]).user_id
        categories = get_all_categories(current_user_id)
        return render_template("create_note.html", form=form, categories=categories)
    else:
        return redirect("/")


@app.route("/notes/<note_id>")
def show_detail_note(note_id):
    """Render the detail view of a specific note."""
    if "user" in session:
        if session["user"]["email"] == crud.get_note(note_id).user.email:
            form = MdeForm()
            note = crud.get_note(note_id)
            current_user = crud.get_user_by_email(session["user"]["email"])
            content = note.body_content
            categories = crud.get_all_categories(current_user.user_id)
            return render_template("detail_note.html", note=note, categories=categories, content=content, form=form)
        else:
            return redirect("/")
    else:
        return redirect("/")


@app.route("/users/")
def show_user():
    """Render the user detail page."""
    if "user" in session:
        user = crud.get_user_by_email(session["user"]["email"])
        return render_template("detail_user.html", user=user)
    else:
        return redirect("/")


@app.route("/add_category", methods=["POST"])
def add_category():
    """Add a new category."""
    name = request.json.get("name")
    user_email = session["user"]["email"]
    user = crud.get_user_by_email(user_email)
    new_category = crud.create_category(name, user)
    db.session.add(new_category)
    db.session.commit()
    return ""


@app.route("/add_note", methods=["POST"])
def add_note():
    """Add a new note."""
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
    flash(f"Created the {title} note.", "success")
    return redirect("/")


@app.route("/add_user", methods=["POST"])
def add_user():
    """Add a new user."""
    email = request.form.get("email")
    password = request.form.get("password")
    username = request.form.get("username")

    user = crud.get_user_by_email(email)
    if user:
        flash("Cannot create an account with this email. Try again.", "error")
        return redirect("/")
    else:
        user = crud.create_user(email, username)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        flash(f"{user.username}, your account created!", "success")
        session["user"] = {"email": user.email, "username": user.username}
        return redirect("/")


@app.route("/edit_category", methods=["POST"])
def update_category():
    """Update an existing category."""
    id = request.json.get("id")
    name = request.json.get("name")
    updated_category = crud.update_category(id, name)
    db.session.add(updated_category)
    db.session.commit()
    cat = get_category(id)
    return jsonify(cat)


@app.route("/edit_note", methods=["POST"])
def update_note():
    """Update an existing note."""
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
    flash(f"Updated the {new_title} note.", "success")
    return redirect(f"/notes/{id}")


@app.route("/edit_user", methods=["POST"])
def update_user():
    """Update the current user's information."""
    email = session["user"]["email"]
    user = crud.get_user_by_email(email)
    new_username = request.form.get("username")
    new_password = request.form.get("password")

    update_user = crud.update_user(user.user_id, new_username)
    update_user.set_password(new_password)
    db.session.add(update_user)
    db.session.commit()
    session["user"] = {"email": user.email, "username": user.username}
    flash(f"Updated the {new_username}.", "success")
    return redirect("/users")


@app.route("/delete_user/<user_id>")
def delete_user(user_id):
    """Delete a user."""
    msg = crud.delete_user(user_id)
    session.clear()
    flash(msg, "warning")
    return redirect("/")


@app.route("/delete_category/<category_id>")
def delete_category(category_id):
    """Delete a category."""
    msg = crud.delete_category(category_id)
    flash(msg, "warning")
    return redirect("/")


@app.route("/delete_note/<note_id>")
def delete_note(note_id):
    """Delete a note."""
    msg = crud.delete_note(note_id)
    flash(msg, "warning")
    return redirect("/")


chat_history = []


@app.route('/reset', methods=['POST'])
def reset():
    global chat_history
    chat_history = []
    print("reset success.")
    return jsonify({'message': 'Chat session has been reset.'})


@app.route('/chat', methods=['POST'])
def chat():
    """Request and Response with Open AI ChatGPT"""
    data = request.get_json()
    message = data['message']

    if message == '/reset':
        reset()
        return jsonify({'message': 'Chat session has been reset.'})

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=chat_history + [{"role": "system", "content": message}],
        temperature=0.7,
        max_tokens=750,
        n=1,
        stop=None,
    )

    if 'choices' in response and len(response.choices) > 0:
        reply = response.choices[0].message['content']
        chat_history.append({"role": "user", "content": message})
        chat_history.append({"role": "assistant", "content": reply})
        return jsonify({'message': reply})

    return jsonify({'message': 'Sorry, I could not generate a response.'})


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0")

# This is just Testing for github
