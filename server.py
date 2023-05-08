from flask import Flask, render_template, request, flash, session, redirect

app = Flask(__name__)

from model import db, connect_to_db
import crud

@app.route("/")
def index():
    notes = crud.get_all_notes()
    categories = crud.get_all_categories()
    return render_template("index.html", notes=notes, categories=categories)


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)