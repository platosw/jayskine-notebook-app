--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Homebrew)
-- Dumped by pg_dump version 14.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_user_id_fkey;
ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_category_id_fkey;
ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_user_id_fkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_pkey;
ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
ALTER TABLE public.notes ALTER COLUMN note_id DROP DEFAULT;
ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
DROP SEQUENCE public.users_user_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.notes_note_id_seq;
DROP TABLE public.notes;
DROP SEQUENCE public.categories_category_id_seq;
DROP TABLE public.categories;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    name character varying(30) NOT NULL,
    user_id integer
);


--
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- Name: notes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notes (
    note_id integer NOT NULL,
    title character varying(35) NOT NULL,
    body_content text,
    entry_date timestamp without time zone,
    user_id integer,
    category_id integer,
    tags character varying
);


--
-- Name: notes_note_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.notes_note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notes_note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.notes_note_id_seq OWNED BY public.notes.note_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(30) NOT NULL,
    password character varying,
    username character varying(20) NOT NULL
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- Name: notes note_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notes ALTER COLUMN note_id SET DEFAULT nextval('public.notes_note_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (category_id, name, user_id) FROM stdin;
1	Category 1	10
2	Category 2	10
3	Category 3	2
5	Category 5	3
7	Test	\N
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notes (note_id, title, body_content, entry_date, user_id, category_id, tags) FROM stdin;
1	Title 1	This is just testing.	2023-06-09 16:24:05.827023	10	1	
2	Title 2	This is just testing.	2023-06-09 16:24:05.827148	10	1	
3	Title 3	This is just testing.	2023-06-09 16:24:05.82722	10	1	
4	Title 1	This is just testing.	2023-06-09 16:24:05.827328	10	2	
5	Title 2	This is just testing.	2023-06-09 16:24:05.827403	10	2	
6	Title 3	This is just testing.	2023-06-09 16:24:05.827465	10	2	
13	Title 1	This is just testing.	2023-06-09 16:24:05.834736	3	5	
14	Title 2	This is just testing.	2023-06-09 16:24:05.834829	3	5	
15	Title 3	This is just testing.	2023-06-09 16:24:05.834906	3	5	
7	Title 1	This is just testing.	2023-06-09 16:28:59.869912	2	3	Ray
8	Title 2	This is just testing.	2023-06-09 16:29:11.756464	2	3	Ray
9	Title 3	This is just testing.	2023-06-09 16:29:23.143195	2	3	Ray
10	Title 4	This is just testing.	2023-06-09 16:29:32.628427	2	3	Sean
12	Title 6	This is just testing.	2023-06-09 16:29:41.597439	2	3	Sean
11	Title 5	This is just testing.	2023-06-09 16:29:51.065652	2	3	Sean
16	JAYJAY	#Testing..	2023-06-09 16:54:10.214516	\N	7	HAHA ray
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, email, password, username) FROM stdin;
1	user1@users.com	$2b$12$VeLvthlI430zDLt65L5pVu2/JR2eI6dNeMGjhyxIO18uPymLXvEj.	User 1
2	user2@users.com	$2b$12$.z93Wrp7kWzWuib1WosF6eMX6Ks2UL4MokjMHcdX86.CA/x3MQcYq	User 2
3	user3@users.com	$2b$12$v54aR.QjeT6B5TSRJ4oSVe2vtETDGvGHoY/C8qwATZvlzefAO6S2K	User 3
4	user4@users.com	$2b$12$ZWKSmzrs029RNBjm/iPCROc3n6LL8gSuuhy0vc51y3keezdMToNJG	User 4
5	user5@users.com	$2b$12$cYhBSvL4jJCLkKUyhCQP6.A7F6Ur51BJNbzvTxuKU33O3WPt53TMa	User 5
6	user6@users.com	$2b$12$w2SpTnt4LE6SgsjE2nJtR.JHIYx1J7XqW93g0N9HLhqIxo/0Spqx6	User 6
7	user7@users.com	$2b$12$qiQ8CcuQ4KIDPHip.hwnieq.Mapp3qap1oiXoCp8IC6raaENa212K	User 7
8	user8@users.com	$2b$12$fFpHhpm28HIO7Ul8XOOK5uL/fwFbtxDvjdMSezje3vsO94R2OJGvq	User 8
9	user9@users.com	$2b$12$BW58pTj2sV3q6rBwNBbAdOLT3o6hJBuF828eJ08NbBNQGNRe4DEV2	User 9
10	user10@users.com	$2b$12$fv4oAli0ve/ip4YJdYhP4uMJr95gtp9eIMmVfHqE47nTL.OtqXyxO	User 10
\.


--
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 7, true);


--
-- Name: notes_note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.notes_note_id_seq', 16, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 11, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: notes notes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (note_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: categories categories_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: notes notes_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- Name: notes notes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

