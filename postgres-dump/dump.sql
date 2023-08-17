--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg120+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg120+1)

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

--
-- Name: RoleName; Type: TYPE; Schema: public; Owner: user
--

CREATE TYPE public."RoleName" AS ENUM (
    'Nurse',
    'Company',
    'Teacher'
);


ALTER TYPE public."RoleName" OWNER TO "user";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Company; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Company" (
    "userId" text NOT NULL,
    cnpj text NOT NULL,
    address text NOT NULL,
    phone text NOT NULL,
    activity text NOT NULL
);


ALTER TABLE public."Company" OWNER TO "user";

--
-- Name: Nurse; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Nurse" (
    "userId" text NOT NULL,
    coren text NOT NULL,
    "birthDate" timestamp(3) without time zone NOT NULL,
    address text NOT NULL,
    phone text NOT NULL,
    university text NOT NULL,
    postgraduated boolean NOT NULL,
    specialization text NOT NULL
);


ALTER TABLE public."Nurse" OWNER TO "user";

--
-- Name: Role; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    name public."RoleName" NOT NULL
);


ALTER TABLE public."Role" OWNER TO "user";

--
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Role_id_seq" OWNER TO "user";

--
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- Name: Teacher; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Teacher" (
    "userId" text NOT NULL,
    document text NOT NULL
);


ALTER TABLE public."Teacher" OWNER TO "user";

--
-- Name: User; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "reconstruireId" text NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL,
    "roleId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO "user";

--
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- Data for Name: Company; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Company" ("userId", cnpj, address, phone, activity) FROM stdin;
\.


--
-- Data for Name: Nurse; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Nurse" ("userId", coren, "birthDate", address, phone, university, postgraduated, specialization) FROM stdin;
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Role" (id, name) FROM stdin;
\.


--
-- Data for Name: Teacher; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Teacher" ("userId", document) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."User" (id, email, password, "reconstruireId", "isAdmin", "roleId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public."Role_id_seq"', 1, false);


--
-- Name: Company Company_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("userId");


--
-- Name: Nurse Nurse_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Nurse"
    ADD CONSTRAINT "Nurse_pkey" PRIMARY KEY ("userId");


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: Teacher Teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY ("userId");


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Role_name_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_reconstruireId_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "User_reconstruireId_key" ON public."User" USING btree ("reconstruireId");


--
-- Name: Company Company_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Nurse Nurse_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Nurse"
    ADD CONSTRAINT "Nurse_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Teacher Teacher_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

