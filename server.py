from flask import Flask, render_template, request, flash, session, redirect

app = Flask(__name__)

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
    return render_template("detail_note.html", note=note)


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)