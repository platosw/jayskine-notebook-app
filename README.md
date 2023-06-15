# 📑 **Jayskine** - _Hackbright Capstone Project_ 📑

<img src="./static/images/Jayskinedemo.gif?raw=true" alt="The most important Part." width="100%"><br />
This project is a versatile note-taking application that provides users with a convenient and powerful solution for creating, managing, and organizing notes in Markdown format, anytime and anywhere.

## **Description**

### Features

-   Athentication, and Authorization
-   User's password encryption
-   CRUD user, note, and category
-   Hashtags
-   Markdown Editor, and Viewer
-   Responsive Design

### Technologies Used

-   I won't go into detail about the technologies required by Hackbright since they were mandatory. However, React without Create React App (CRA) was an optional choice. I opted for React over vanilla JavaScript because it offers efficient ongoing updates and maintenance in certain aspects.
-   The main advantages of Markdown are its concise and intuitive syntax, which makes document creation and reading easy and fast. It is platform-independent and can be displayed consistently across various platforms. It can be used for a variety of purposes and is well-suited for version control systems, allowing for efficient collaboration and document revision management. Additionally, it can be easily converted to HTML, enabling the incorporation of more complex styling and layout elements when needed.
-   I designed the application with a responsive layout to emphasize the accessibility of our notes anytime and anywhere. By implementing design principles that optimize readability and usability, we ensure that users can conveniently utilize the notes on various devices and screen sizes.

### Challenges

-   I used plain JSX files with React for categories and hashtags, bypassing Create React App (CRA). It was a complex but rewarding process, enhancing my understanding of React. Overcoming challenges resulted in a more efficient user experience. I employed UI components for streamlined state management and an intuitive interface.

### Nice to haves

-   Plans to add a file uploader feature for attaching image files.
-   The ability to convert stored note data to Markdown files for downloading.
-   An AI chatbot function to assist users in writing or serve as a virtual assistant.

## **How to Run**

To begin, clone this repository to your local machine.

```sh
git clone https://github.com/platosw/jayskine-notebook-app.git
```

After cloning, use your CLI to navigate to the project root directory and initialize a virtual environment.

```sh
virtualenv env
source env/bin/activate
```

Once in the virtual environment, install all required depenencies.

```sh
pip3 install -r requirements.txt
```

Create a secrets.sh file.

```sh
touch secrets.sh
```

Write a secret keys in the secrets.sh file.

```sh
export SECRET_KEYS="whatever you want"
```

Connect SECRET_KEYS to the server.

```sh
source secrets.sh
```

Next, create and seed a database for the project. You will need [PostgreSQL] installed for this.

```sh
python3 seed_jayskine.py
```

Finally, start the server to launch **Jayskine**.

```sh
python3 server.py
```

## **Technologies Stacks**

| Category        | Tech                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Client Side** | <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">                                                                                                   |
| **Server Side** | <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"><img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white"><img src="https://img.shields.io/badge/sql alchemy-0099E5?style=for-the-badge&logo=flask&logoColor=white"><img src="https://img.shields.io/badge/Postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"><img src="https://img.shields.io/badge/bcrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white">                                                                                          |
| **Others**      | <img src="https://img.shields.io/badge/MDE flask-3776AB?style=for-the-badge&logo=flask&logoColor=white"><img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/jinja-B41717?style=for-the-badge&logo=jinja&logoColor=white"><img src="https://img.shields.io/badge/amazon aws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"><img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"><img src="https://img.shields.io/badge/pdoc-8CA1AF?style=for-the-badge&logo=readthedocs&logoColor=white"> |

## **Server Side Document**

You can use [pdoc] documentation Before running server.py

```sh
pdoc filepath w/filename
```

examples:

```sh
pdoc ./server.py
```

## **Demo**

Click [here] to view the Jayskine demo video!

## **Author**

Jason Park | <a href="mailto: jason.park.dev@gmail.com"><img src="https://img.shields.io/badge/jason.park.dev@gmail.com-EA4335?style=flat-square&logo=Gmail&logoColor=FFFFFF" /></a> <a href="https://www.linkedin.com/in/platosw" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=Linkedin&logoColor=FFFFFF" /></a>

[Postgresql]: https://www.postgresql.org/
[Github]: https://www.github.com/platosw
[Linkedin]: https://www.linkedin.com/in/platosw
[here]: https://youtu.be/AEjYUKi-yXE
[pdoc]: https://pdoc.dev/

## **Acknowledgments**

-   I would like to express my deep gratitude to Ray Traina-Grandon, Sean Moriarty, and Katarzyna Jablonski. Your guidance, feedback, and assistance throughout the development process have played a significant role in our success. Thank you for your invaluable support.

-   I would like to extend my deep gratitude to Walmart for their generous sponsorship, which has contributed to making our project a reality. Thank you for your invaluable support.
