--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

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
-- Name: tourism; Type: SCHEMA; Schema: -; Owner: mac_postgres
--

CREATE SCHEMA tourism;


ALTER SCHEMA tourism OWNER TO mac_postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: organization_modules; Type: TABLE; Schema: public; Owner: mac_postgres
--

CREATE TABLE public.organization_modules (
    organization_id integer NOT NULL,
    module_id integer NOT NULL
);


ALTER TABLE public.organization_modules OWNER TO mac_postgres;

--
-- Name: page_authorities; Type: TABLE; Schema: public; Owner: mac_postgres
--

CREATE TABLE public.page_authorities (
    page_id integer NOT NULL,
    authority_id integer NOT NULL
);


ALTER TABLE public.page_authorities OWNER TO mac_postgres;

--
-- Name: role_pages; Type: TABLE; Schema: public; Owner: mac_postgres
--

CREATE TABLE public.role_pages (
    role_id integer NOT NULL,
    page_id integer NOT NULL
);


ALTER TABLE public.role_pages OWNER TO mac_postgres;

--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: mac_postgres
--

CREATE TABLE public.user_roles (
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.user_roles OWNER TO mac_postgres;

--
-- Name: address_book; Type: TABLE; Schema: tourism; Owner: mac_postgres
--

CREATE TABLE tourism.address_book (
    address_book_id integer NOT NULL,
    created_by character varying(100) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    last_modified_by character varying(255),
    last_modified_date timestamp without time zone,
    status integer NOT NULL,
    address_one character varying(255),
    address_two character varying(255),
    country_id integer NOT NULL,
    email character varying(255),
    fax character varying(255),
    location_id integer NOT NULL,
    mobile character varying(255),
    postal_code character varying(255),
    telephone character varying(255),
    website character varying(255)
);


ALTER TABLE tourism.address_book OWNER TO mac_postgres;

--
-- Name: address_book_id; Type: SEQUENCE; Schema: tourism; Owner: mac_postgres
--

CREATE SEQUENCE tourism.address_book_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tourism.address_book_id OWNER TO mac_postgres;

--
-- Name: authority; Type: TABLE; Schema: tourism; Owner: mac_postgres
--

CREATE TABLE tourism.authority (
    authority_id integer NOT NULL,
    created_by character varying(100) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    last_modified_by character varying(255),
    last_modified_date timestamp without time zone,
    status integer NOT NULL,
    authority_name character varying(255) NOT NULL,
    description character varying(255)
);


ALTER TABLE tourism.authority OWNER TO mac_postgres;

--
-- Name: authority_id; Type: SEQUENCE; Schema: tourism; Owner: mac_postgres
--

CREATE SEQUENCE tourism.authority_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tourism.authority_id OWNER TO mac_postgres;

--
-- Name: country; Type: TABLE; Schema: tourism; Owner: mac_postgres
--

CREATE TABLE tourism.country (
    country_id integer NOT NULL,
    created_by character varying(100) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    last_modified_by character varying(255),
    last_modified_date timestamp without time zone,
    status integer NOT NULL,
    country_code character varying(255) NOT NULL,
    country_name character varying(255) NOT NULL,
    latitude double precision,
    longitude double precision
);


ALTER TABLE tourism.country OWNER TO mac_postgres;

--
-- Name: country_id; Type: SEQUENCE; Schema: tourism; Owner: mac_postgres
--

CREATE SEQUENCE tourism.country_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tourism.country_id OWNER TO mac_postgres;

--
-- Name: customer; Type: TABLE; Schema: tourism; Owner: mac_postgres
--

CREATE TABLE tourism.customer (
    customer_id integer NOT NULL,
    created_by character varying(100) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    last_modified_by character varying(255),
    last_modified_date timestamp without time zone,
    status integer NOT NULL,
    customer_type_id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    gender_type_id integer NOT NULL,
    identification_number character varying(255),
    last_name character varying(255) NOT NULL,
    occupation character varying(255) NOT NULL,
    organization_id integer NOT NULL,
    passport_number character varying(255),
    title_type_id integer NOT NULL,
    address_book_id integer
);


ALTER TABLE tourism.customer OWNER TO mac_postgres;

--
-- Name: customer_id; Type: SEQUENCE; Schema: tourism; Owner: mac_postgres
--

CREATE SEQUENCE tourism.customer_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tourism.customer_id OWNER TO mac_postgres;

--
-- Name: hotel; Type: TABLE; Schema: tourism; Owner: mac_postgres
--

CREATE TABLE tourism.hotel (
    hotel_id integer NOT NULL,
    created_by character varying(100) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    last_modified_by character varying(255),
    last_modified_date timestamp without time zone,
    status integer NOT NULL,
    category_id integer NOT NULL,
    date_of_start timestamp without time zone NOT NULL,
    hotel_description character varying(255),
    hotel_name character varying(255) NOT NULL,
    organization_id integer NOT NULL,
    room_count integer NOT NULL,
    star_grading_id integer,
    address_book_id integer
);


ALTER TABLE tourism.hotel OWNER TO mac_postgres;

--
-- Name: hotel_id; Type: SEQUENCE; Schema: tourism; Owner: mac_postgres
--

CREATE SEQUENCE tourism.hotel_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tourism.hotel_id OWNER TO mac_postgres;

--
-- Name: location; Type: TABLE; Schema: tourism; Owner: mac_postgres
--

CREATE TABLE tourism.location (
    location_id integer NOT NULL,
    created_by character varying(100) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    last_modified_by character varying(255),
    last_modified_date timestamp without time zone,
    status integer NOT NULL,
    country_id integer,
    description character varying(255),
    latitude double precision,
    location_code character varying(255) NOT NULL,
    location_name character varying(255) NOT NULL,
    longitude double precision
);


ALTER TABLE tourism.location OWNER TO mac_postgres;

--
-- Name: location_id; Type: SEQUENCE; Schema: tourism; Owner: mac_postgres
--

CREATE SEQUENCE tourism.location_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tourism.location_id OWNER TO mac_postgres;

--
-- Name: module; Type: TABLE; Schema: tourism; Owner: mac_postgres
--

CREATE TABLE tourism.module (
    module_id integer NOT NULL,
    created_by character varying(100) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    last_modified_by character varying(255),
    last_modified_date timestamp without time zone,
    status integer NOT NULL,
    description character varying(255),
    icon character varying(255),
    module_code character varying(255) NOT NULL,
    module_name character varying(255) NOT NULL,
    organization_id integer NOT NULL,
    url_pattern character varying(255) NOT NULL
);


ALTER TABLE tourism.module OWNER TO mac_postgres;

--
-- Name: module_id; Type: SEQUENCE; Schema: tourism; Owner: mac_postgres
--

CREATE SEQUENCE tourism.module_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tourism.module_id OWNER TO mac_postgres;

--
-- Name: organization; Type: TABLE; Schema: tourism; Owner: mac_postgres
--

CREATE TABLE tourism.organization (
    organization_id integer NOT NULL,
    created_by character varying(100) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    last_modified_by character varying(255),
    last_modified_date timestamp without time zone,
    status integer NOT NULL,
    description character varying(255),
    organization_name character varying(255) NOT NULL,
    svat_no character varying(255),
    short_code character varying(255) NOT NULL,
    vat_no character varying(255),
    address_book_id integer
);


ALTER TABLE tourism.organization OWNER TO mac_postgres;

--
-- Name: organization_id; Type: SEQUENCE; Schema: tourism; Owner: mac_postgres
--

CREATE SEQUENCE tourism.organization_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tourism.organization_id OWNER TO mac_postgres;

--
-- Name: page; Type: TABLE; Schema: tourism; Owner: mac_postgres
--

CREATE TABLE tourism.page (
    page_id integer NOT NULL,
    created_by character varying(100) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    last_modified_by character varying(255),
    last_modified_date timestamp without time zone,
    status integer NOT NULL,
    description character varying(255),
    icon character varying(255) NOT NULL,
    module_id integer NOT NULL,
    order_index integer NOT NULL,
    page_name character varying(255) NOT NULL,
    url_pattern character varying(255) NOT NULL
);


ALTER TABLE tourism.page OWNER TO mac_postgres;

--
-- Name: page_id; Type: SEQUENCE; Schema: tourism; Owner: mac_postgres
--

CREATE SEQUENCE tourism.page_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tourism.page_id OWNER TO mac_postgres;

--
-- Name: refresh_token; Type: TABLE; Schema: tourism; Owner: mac_postgres
--

CREATE TABLE tourism.refresh_token (
    refresh_token_id integer NOT NULL,
    expiry_date timestamp without time zone NOT NULL,
    token character varying(255) NOT NULL,
    user_id integer
);


ALTER TABLE tourism.refresh_token OWNER TO mac_postgres;

--
-- Name: refresh_token_id; Type: SEQUENCE; Schema: tourism; Owner: mac_postgres
--

CREATE SEQUENCE tourism.refresh_token_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tourism.refresh_token_id OWNER TO mac_postgres;

--
-- Name: role; Type: TABLE; Schema: tourism; Owner: mac_postgres
--

CREATE TABLE tourism.role (
    role_id integer NOT NULL,
    created_by character varying(100) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    last_modified_by character varying(255),
    last_modified_date timestamp without time zone,
    status integer NOT NULL,
    role_description character varying(255),
    role_name character varying(255) NOT NULL
);


ALTER TABLE tourism.role OWNER TO mac_postgres;

--
-- Name: role_id; Type: SEQUENCE; Schema: tourism; Owner: mac_postgres
--

CREATE SEQUENCE tourism.role_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tourism.role_id OWNER TO mac_postgres;

--
-- Name: room_feature; Type: TABLE; Schema: tourism; Owner: mac_postgres
--

CREATE TABLE tourism.room_feature (
    room_feature_id integer NOT NULL,
    created_by character varying(100) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    last_modified_by character varying(255),
    last_modified_date timestamp without time zone,
    status integer NOT NULL,
    feature character varying(255) NOT NULL,
    feature_description character varying(255),
    feature_type_id integer NOT NULL,
    room_type_id integer NOT NULL
);


ALTER TABLE tourism.room_feature OWNER TO mac_postgres;

--
-- Name: room_type; Type: TABLE; Schema: tourism; Owner: mac_postgres
--

CREATE TABLE tourism.room_type (
    room_type_id integer NOT NULL,
    created_by character varying(100) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    last_modified_by character varying(255),
    last_modified_date timestamp without time zone,
    status integer NOT NULL,
    hotel_id integer NOT NULL,
    room_type character varying(255) NOT NULL,
    room_type_description character varying(255)
);


ALTER TABLE tourism.room_type OWNER TO mac_postgres;

--
-- Name: room_type_id; Type: SEQUENCE; Schema: tourism; Owner: mac_postgres
--

CREATE SEQUENCE tourism.room_type_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tourism.room_type_id OWNER TO mac_postgres;

--
-- Name: user; Type: TABLE; Schema: tourism; Owner: mac_postgres
--

CREATE TABLE tourism."user" (
    user_id integer NOT NULL,
    created_by character varying(100) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    last_modified_by character varying(255),
    last_modified_date timestamp without time zone,
    status integer NOT NULL,
    email character varying(255) NOT NULL,
    enabled boolean NOT NULL,
    mobile_no character varying(255) NOT NULL,
    organization_id integer NOT NULL,
    password character varying(255) NOT NULL,
    username character varying(255) NOT NULL
);


ALTER TABLE tourism."user" OWNER TO mac_postgres;

--
-- Name: user_id; Type: SEQUENCE; Schema: tourism; Owner: mac_postgres
--

CREATE SEQUENCE tourism.user_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tourism.user_id OWNER TO mac_postgres;

--
-- Data for Name: organization_modules; Type: TABLE DATA; Schema: public; Owner: mac_postgres
--

COPY public.organization_modules (organization_id, module_id) FROM stdin;
1	65
1	64
1	1
1	66
\.


--
-- Data for Name: page_authorities; Type: TABLE DATA; Schema: public; Owner: mac_postgres
--

COPY public.page_authorities (page_id, authority_id) FROM stdin;
7	38
7	39
7	37
7	40
8	44
8	43
8	42
8	41
9	45
9	47
9	46
9	48
10	49
10	52
10	51
10	50
11	54
11	56
11	55
11	53
36	57
36	58
36	59
36	60
37	61
37	62
37	63
37	64
38	65
38	66
38	67
38	68
39	69
39	70
39	71
39	72
40	73
40	74
40	75
40	76
\.


--
-- Data for Name: role_pages; Type: TABLE DATA; Schema: public; Owner: mac_postgres
--

COPY public.role_pages (role_id, page_id) FROM stdin;
1	7
1	8
1	9
1	10
1	11
1	36
1	37
1	38
1	39
1	40
1	41
25	41
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: mac_postgres
--

COPY public.user_roles (user_id, role_id) FROM stdin;
1	1
22	25
\.


--
-- Data for Name: address_book; Type: TABLE DATA; Schema: tourism; Owner: mac_postgres
--

COPY tourism.address_book (address_book_id, created_by, created_date, last_modified_by, last_modified_date, status, address_one, address_two, country_id, email, fax, location_id, mobile, postal_code, telephone, website) FROM stdin;
6	sachigeeth	2021-11-08 19:58:54.89	sachigeeth	2021-11-08 19:58:54.89	2	werwer	ewrewr	1	\N	\N	1	\N	\N	\N	\N
1	SYSTEM	2021-10-17 00:00:00	SYSTEM	2021-10-17 00:00:00	2	16/1, 1st lane, nalluruwa, panadura	\N	1	\N	\N	1	\N	\N	\N	\N
8	sachigeeth	2021-11-08 20:14:11.999	sachigeeth	2021-11-08 20:14:11.999	2	sadasdsd	\N	1	\N	\N	1	\N	\N	\N	\N
5	sachigeeth	2021-11-08 19:54:10.625	sachigeeth	2021-11-08 19:54:10.625	2	qweqwe	qwe	1	\N	\N	1	\N	\N	\N	\N
7	sachigeeth	2021-11-08 20:01:58.712	sachigeeth	2021-11-08 20:01:58.712	2	234234234	\N	1	\N	\N	1	\N	\N	\N	\N
9	sachigeeth	2021-11-13 20:40:38.193	sachigeeth	2021-11-13 20:40:38.193	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	0782430141	12500	0782430141	\N
10	sachigeeth	2021-11-13 21:12:13.405	sachigeeth	2021-11-13 21:12:13.405	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	0782430142	12500	0782430141	\N
16	sachigeeth	2021-11-13 21:41:27.592	sachigeeth	2021-11-13 21:41:35.981	0	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
21	sachigeeth	2021-11-14 23:06:57.305	sachigeeth	2021-11-15 01:24:48.877	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	0782430142	12500	0782430141	www.abc.com
22	sachigeeth	2021-11-15 02:04:52.055	sachigeeth	2021-11-15 02:04:52.055	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
35	sachigeeth	2021-11-15 02:07:56.54	sachigeeth	2021-11-15 02:07:56.54	2	16/1, 1ST LANE, DIBBEDDA ROAD, NALLURUWA, PANADURA	\N	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
36	sachigeeth	2021-11-15 02:18:23.261	sachigeeth	2021-11-15 02:18:23.261	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
37	sachigeeth	2021-11-15 09:49:52.795	sachigeeth	2021-11-15 09:49:52.795	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
38	sachigeeth	2021-11-15 12:40:51.842	sachigeeth	2021-11-15 12:40:57.469	0	16/1, 1ST LANE, DIBBEDDA ROAD, NALLURUWA, PANADURA	\N	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
39	sachigeeth	2021-11-15 12:49:59.144	sachigeeth	2021-11-15 12:50:27.532	0	16/1, 1ST LANE, DIBBEDDA ROAD, NALLURUWA, PANADURA	\N	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
40	sachigeeth	2021-11-15 12:55:36.818	sachigeeth	2021-11-15 12:55:47.714	0	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
41	sachigeeth	2021-11-15 12:58:51.77	sachigeeth	2021-11-15 12:58:51.77	2	16/1, 1ST LANE, DIBBEDDA ROAD, NALLURUWA, PANADURA	\N	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
42	sachigeeth	2021-11-15 13:15:11.419	sachigeeth	2021-11-15 13:15:11.419	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
43	sachigeeth	2021-11-15 13:16:49.674	sachigeeth	2021-11-15 13:16:49.674	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
44	sachigeeth	2021-11-15 13:20:44.376	sachigeeth	2021-11-15 13:20:44.376	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
45	sachigeeth	2021-11-15 13:36:08.672	sachigeeth	2021-11-15 13:36:08.672	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
46	sachigeeth	2021-11-15 16:50:00.448	sachigeeth	2021-11-15 16:50:00.448	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
48	sachigeeth	2021-11-15 17:57:08.718	sachigeeth	2021-11-15 17:57:08.718	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
49	sachigeeth	2021-11-16 19:48:41.642	sachigeeth	2021-11-16 19:48:41.642	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
47	sachigeeth	2021-11-15 17:33:05.499	sachigeeth	2021-11-15 17:57:56.664	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
50	sachigeeth	2021-11-18 17:49:34.994	sachigeeth	2021-11-18 17:49:34.994	2	Panadura	Sri Lanka	1	sachigeeth@gmail.com	\N	1	\N	12500	0782430141	\N
\.


--
-- Data for Name: authority; Type: TABLE DATA; Schema: tourism; Owner: mac_postgres
--

COPY tourism.authority (authority_id, created_by, created_date, last_modified_by, last_modified_date, status, authority_name, description) FROM stdin;
45	sachigeeth	2021-11-13 14:45:43.516	sachigeeth	2021-11-13 14:45:43.516	2	ROLE_config@module_VIEW	Module Authority
46	sachigeeth	2021-11-13 14:45:43.519	sachigeeth	2021-11-13 14:45:43.519	2	ROLE_config@module_UPDATE	Module Authority
47	sachigeeth	2021-11-13 14:45:43.52	sachigeeth	2021-11-13 14:45:43.52	2	ROLE_config@module_CREATE	Module Authority
48	sachigeeth	2021-11-13 14:45:43.523	sachigeeth	2021-11-13 14:45:43.523	2	ROLE_config@module_DELETE	Module Authority
49	sachigeeth	2021-11-13 14:45:49.816	sachigeeth	2021-11-13 14:45:49.816	2	ROLE_config@organization_VIEW	Organization Authority
50	sachigeeth	2021-11-13 14:45:49.818	sachigeeth	2021-11-13 14:45:49.818	2	ROLE_config@organization_UPDATE	Organization Authority
51	sachigeeth	2021-11-13 14:45:49.821	sachigeeth	2021-11-13 14:45:49.821	2	ROLE_config@organization_CREATE	Organization Authority
52	sachigeeth	2021-11-13 14:45:49.823	sachigeeth	2021-11-13 14:45:49.823	2	ROLE_config@organization_DELETE	Organization Authority
73	sachigeeth	2021-11-16 16:52:39.709	sachigeeth	2021-11-16 16:52:39.709	2	ROLE_operationalInfo@package_VIEW	Package Authority
74	sachigeeth	2021-11-16 16:52:39.715	sachigeeth	2021-11-16 16:52:39.715	2	ROLE_operationalInfo@package_UPDATE	Package Authority
75	sachigeeth	2021-11-16 16:52:39.717	sachigeeth	2021-11-16 16:52:39.717	2	ROLE_operationalInfo@package_CREATE	Package Authority
76	sachigeeth	2021-11-16 16:52:39.719	sachigeeth	2021-11-16 16:52:39.719	2	ROLE_operationalInfo@package_DELETE	Package Authority
37	sachigeeth	2021-11-13 14:45:25.113	sachigeeth	2021-11-13 14:45:25.113	2	ROLE_config@role_VIEW	Role Authority
38	sachigeeth	2021-11-13 14:45:25.146	sachigeeth	2021-11-13 14:45:25.146	2	ROLE_config@role_UPDATE	Role Authority
39	sachigeeth	2021-11-13 14:45:25.15	sachigeeth	2021-11-13 14:45:25.15	2	ROLE_config@role_CREATE	Role Authority
40	sachigeeth	2021-11-13 14:45:25.153	sachigeeth	2021-11-13 14:45:25.153	2	ROLE_config@role_DELETE	Role Authority
41	sachigeeth	2021-11-13 14:45:30.589	sachigeeth	2021-11-13 14:45:30.589	2	ROLE_config@user_VIEW	User Authority
42	sachigeeth	2021-11-13 14:45:30.592	sachigeeth	2021-11-13 14:45:30.592	2	ROLE_config@user_UPDATE	User Authority
43	sachigeeth	2021-11-13 14:45:30.594	sachigeeth	2021-11-13 14:45:30.594	2	ROLE_config@user_CREATE	User Authority
44	sachigeeth	2021-11-13 14:45:30.596	sachigeeth	2021-11-13 14:45:30.596	2	ROLE_config@user_DELETE	User Authority
53	sachigeeth	2021-11-13 14:46:02.575	sachigeeth	2021-11-13 14:46:02.575	2	ROLE_config@page_VIEW	Page Authority
54	sachigeeth	2021-11-13 14:46:02.578	sachigeeth	2021-11-13 14:46:02.578	2	ROLE_config@page_UPDATE	Page Authority
55	sachigeeth	2021-11-13 14:46:02.581	sachigeeth	2021-11-13 14:46:02.581	2	ROLE_config@page_CREATE	Page Authority
56	sachigeeth	2021-11-13 14:46:02.583	sachigeeth	2021-11-13 14:46:02.583	2	ROLE_config@page_DELETE	Page Authority
57	sachigeeth	2021-11-13 15:23:22.534	sachigeeth	2021-11-13 15:23:22.534	2	ROLE_masterInfo@country_VIEW	Country Authority
58	sachigeeth	2021-11-13 15:23:22.538	sachigeeth	2021-11-13 15:23:22.538	2	ROLE_masterInfo@country_UPDATE	Country Authority
59	sachigeeth	2021-11-13 15:23:22.542	sachigeeth	2021-11-13 15:23:22.542	2	ROLE_masterInfo@country_CREATE	Country Authority
60	sachigeeth	2021-11-13 15:23:22.545	sachigeeth	2021-11-13 15:23:22.545	2	ROLE_masterInfo@country_DELETE	Country Authority
61	sachigeeth	2021-11-13 15:26:24.482	sachigeeth	2021-11-13 15:26:24.482	2	ROLE_masterInfo@location_VIEW	Location Authority
62	sachigeeth	2021-11-13 15:26:24.484	sachigeeth	2021-11-13 15:26:24.484	2	ROLE_masterInfo@location_UPDATE	Location Authority
63	sachigeeth	2021-11-13 15:26:24.486	sachigeeth	2021-11-13 15:26:24.486	2	ROLE_masterInfo@location_CREATE	Location Authority
64	sachigeeth	2021-11-13 15:26:24.488	sachigeeth	2021-11-13 15:26:24.488	2	ROLE_masterInfo@location_DELETE	Location Authority
65	sachigeeth	2021-11-13 20:32:03.072	sachigeeth	2021-11-13 20:32:03.072	2	ROLE_operationalInfo@customer_VIEW	Customer Authority
66	sachigeeth	2021-11-13 20:32:03.075	sachigeeth	2021-11-13 20:32:03.075	2	ROLE_operationalInfo@customer_UPDATE	Customer Authority
67	sachigeeth	2021-11-13 20:32:03.077	sachigeeth	2021-11-13 20:32:03.077	2	ROLE_operationalInfo@customer_CREATE	Customer Authority
68	sachigeeth	2021-11-13 20:32:03.079	sachigeeth	2021-11-13 20:32:03.079	2	ROLE_operationalInfo@customer_DELETE	Customer Authority
69	sachigeeth	2021-11-14 14:58:31.741	sachigeeth	2021-11-14 14:58:31.741	2	ROLE_operationalInfo@hotel_VIEW	Hotel Authority
70	sachigeeth	2021-11-14 14:58:31.84	sachigeeth	2021-11-14 14:58:31.84	2	ROLE_operationalInfo@hotel_UPDATE	Hotel Authority
71	sachigeeth	2021-11-14 14:58:31.843	sachigeeth	2021-11-14 14:58:31.843	2	ROLE_operationalInfo@hotel_CREATE	Hotel Authority
72	sachigeeth	2021-11-14 14:58:31.845	sachigeeth	2021-11-14 14:58:31.845	2	ROLE_operationalInfo@hotel_DELETE	Hotel Authority
77	sachigeeth	2021-11-17 19:46:58.529	sachigeeth	2021-11-17 19:46:58.529	2	ROLE_operationalAction@booking_VIEW	Booking Authority
78	sachigeeth	2021-11-17 19:46:58.567	sachigeeth	2021-11-17 19:46:58.567	2	ROLE_operationalAction@booking_UPDATE	Booking Authority
79	sachigeeth	2021-11-17 19:46:58.569	sachigeeth	2021-11-17 19:46:58.569	2	ROLE_operationalAction@booking_CREATE	Booking Authority
80	sachigeeth	2021-11-17 19:46:58.572	sachigeeth	2021-11-17 19:46:58.572	2	ROLE_operationalAction@booking_DELETE	Booking Authority
\.


--
-- Data for Name: country; Type: TABLE DATA; Schema: tourism; Owner: mac_postgres
--

COPY tourism.country (country_id, created_by, created_date, last_modified_by, last_modified_date, status, country_code, country_name, latitude, longitude) FROM stdin;
1	SYSTEM	2021-11-13 00:00:00	SYSTEM	2021-11-13 00:00:00	2	SL	SRI LANKA	\N	\N
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: tourism; Owner: mac_postgres
--

COPY tourism.customer (customer_id, created_by, created_date, last_modified_by, last_modified_date, status, customer_type_id, first_name, gender_type_id, identification_number, last_name, occupation, organization_id, passport_number, title_type_id, address_book_id) FROM stdin;
\.


--
-- Data for Name: hotel; Type: TABLE DATA; Schema: tourism; Owner: mac_postgres
--

COPY tourism.hotel (hotel_id, created_by, created_date, last_modified_by, last_modified_date, status, category_id, date_of_start, hotel_description, hotel_name, organization_id, room_count, star_grading_id, address_book_id) FROM stdin;
\.


--
-- Data for Name: location; Type: TABLE DATA; Schema: tourism; Owner: mac_postgres
--

COPY tourism.location (location_id, created_by, created_date, last_modified_by, last_modified_date, status, country_id, description, latitude, location_code, location_name, longitude) FROM stdin;
1	SYSTEM	2021-11-13 00:00:00	SYSTEM	2021-11-13 00:00:00	2	1	\N	\N	PANADURA	PA	\N
\.


--
-- Data for Name: module; Type: TABLE DATA; Schema: tourism; Owner: mac_postgres
--

COPY tourism.module (module_id, created_by, created_date, last_modified_by, last_modified_date, status, description, icon, module_code, module_name, organization_id, url_pattern) FROM stdin;
65	sachigeeth	2021-11-13 20:30:24.034	sachigeeth	2021-11-13 20:30:24.034	2	Operational Info Module	info	OPI	Operational Info	1	operationalInfo
1	SYSTEM	2021-10-19 00:00:00	sachigeeth	2021-10-29 13:37:42.193	2	Config Module	tune	config	Config	1	config
64	sachigeeth	2021-11-13 15:00:21.529	sachigeeth	2021-11-13 15:00:21.529	2	Master Information Module	bedroom_parent	MI	Master Info	1	masterInfo
66	sachigeeth	2021-11-17 19:45:26.173	sachigeeth	2021-11-17 19:45:26.173	2	Operational Actions	attractions 	OPA	Operational Actions	1	operationalAction
\.


--
-- Data for Name: organization; Type: TABLE DATA; Schema: tourism; Owner: mac_postgres
--

COPY tourism.organization (organization_id, created_by, created_date, last_modified_by, last_modified_date, status, description, organization_name, svat_no, short_code, vat_no, address_book_id) FROM stdin;
1	SYSTEM	2021-10-17 00:00:00	SYSTEM	2021-10-17 00:00:00	2	\N	Guide Lanka	\N	GUDLK	\N	1
\.


--
-- Data for Name: page; Type: TABLE DATA; Schema: tourism; Owner: mac_postgres
--

COPY tourism.page (page_id, created_by, created_date, last_modified_by, last_modified_date, status, description, icon, module_id, order_index, page_name, url_pattern) FROM stdin;
40	sachigeeth	2021-11-16 16:52:39.682	sachigeeth	2021-11-16 16:52:39.682	2	Package Page	inventory_2 	65	3	Package	package
36	sachigeeth	2021-11-13 15:23:22.495	sachigeeth	2021-11-13 15:23:22.495	2	Country Master	flag	64	1	Country	country
37	sachigeeth	2021-11-13 15:26:24.478	sachigeeth	2021-11-13 15:26:24.478	2	Location Master	my_location	64	2	Location	location
7	sachigeeth	2021-10-19 20:29:04.189	sachigeeth	2021-11-12 02:15:25.914	2	Role Config	perm_identity	1	4	Role	role
10	sachigeeth	2021-10-23 00:00:00	sachigeeth	2021-11-12 02:43:53.76	2	Organization Config	corporate_fare	1	2	Organization	organization
8	sachigeeth	2021-10-19 20:29:32.964	sachigeeth	2021-11-12 02:31:15.819	2	User Config	badge	1	5	User	user
11	sachigeeth	2021-10-23 00:00:00	sachigeeth	2021-11-12 02:43:53.76	2	Page Config	post_add	1	3	Page	page
9	sachigeeth	2021-10-23 00:00:00	sachigeeth	2021-11-12 02:43:53.76	2	Module Config	view_module	1	1	Module	module
38	sachigeeth	2021-11-13 20:32:03.065	sachigeeth	2021-11-13 20:32:03.065	2	Customer Page	support_agent	65	1	Customer	customer
39	sachigeeth	2021-11-14 14:58:31.554	sachigeeth	2021-11-14 14:58:31.554	2	Hotel Information Page	hotel_class	65	2	Hotel	hotel
41	sachigeeth	2021-11-17 19:46:58.386	sachigeeth	2021-11-20 10:11:14.169	2	\N	book	66	1	Booking	booking
\.


--
-- Data for Name: refresh_token; Type: TABLE DATA; Schema: tourism; Owner: mac_postgres
--

COPY tourism.refresh_token (refresh_token_id, expiry_date, token, user_id) FROM stdin;
1	2021-11-23 16:36:48.557	c6879d9f-01a8-4bc5-a653-74ae4621a9bb	1
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: tourism; Owner: mac_postgres
--

COPY tourism.role (role_id, created_by, created_date, last_modified_by, last_modified_date, status, role_description, role_name) FROM stdin;
20	sachigeeth	2021-11-12 19:28:19.1	sachigeeth	2021-11-12 19:28:19.1	2	User	User
1	SYSTEM	2021-10-19 00:00:00	sachigeeth	2021-11-12 18:58:36.88	2	\N	Admin
25	sachigeeth	2021-11-20 10:10:13.483	sachigeeth	2021-11-20 10:10:13.483	2	USER	USER
\.


--
-- Data for Name: room_feature; Type: TABLE DATA; Schema: tourism; Owner: mac_postgres
--

COPY tourism.room_feature (room_feature_id, created_by, created_date, last_modified_by, last_modified_date, status, feature, feature_description, feature_type_id, room_type_id) FROM stdin;
\.


--
-- Data for Name: room_type; Type: TABLE DATA; Schema: tourism; Owner: mac_postgres
--

COPY tourism.room_type (room_type_id, created_by, created_date, last_modified_by, last_modified_date, status, hotel_id, room_type, room_type_description) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: tourism; Owner: mac_postgres
--

COPY tourism."user" (user_id, created_by, created_date, last_modified_by, last_modified_date, status, email, enabled, mobile_no, organization_id, password, username) FROM stdin;
1	SYSTEM	2021-10-14 00:00:00	sachigeeth	2021-11-12 18:58:36.88	2	sachigeeth@gmail.com	t	0782430141	1	{bcrypt}$2a$10$Yv4Q5hUQWEQpnY.LZ5kZxuwiMdHTHNCiz6yXgCVk2SqK4gKwdR1zC	sachigeeth
22	sachigeeth	2021-11-20 10:15:23.337	sachigeeth	2021-11-20 10:15:23.337	2	abdulhadhi@gmail.com	t	0782430141	1	{bcrypt}$2a$10$nuGJs2UdOl1nhNP5nV39aOW47YHjfU.JknmLqQ3c6w/hSdPe/q/Cm	hadhi
\.


--
-- Name: address_book_id; Type: SEQUENCE SET; Schema: tourism; Owner: mac_postgres
--

SELECT pg_catalog.setval('tourism.address_book_id', 1, false);


--
-- Name: authority_id; Type: SEQUENCE SET; Schema: tourism; Owner: mac_postgres
--

SELECT pg_catalog.setval('tourism.authority_id', 1, false);


--
-- Name: country_id; Type: SEQUENCE SET; Schema: tourism; Owner: mac_postgres
--

SELECT pg_catalog.setval('tourism.country_id', 1, false);


--
-- Name: customer_id; Type: SEQUENCE SET; Schema: tourism; Owner: mac_postgres
--

SELECT pg_catalog.setval('tourism.customer_id', 1, false);


--
-- Name: hotel_id; Type: SEQUENCE SET; Schema: tourism; Owner: mac_postgres
--

SELECT pg_catalog.setval('tourism.hotel_id', 1, false);


--
-- Name: location_id; Type: SEQUENCE SET; Schema: tourism; Owner: mac_postgres
--

SELECT pg_catalog.setval('tourism.location_id', 1, false);


--
-- Name: module_id; Type: SEQUENCE SET; Schema: tourism; Owner: mac_postgres
--

SELECT pg_catalog.setval('tourism.module_id', 1, false);


--
-- Name: organization_id; Type: SEQUENCE SET; Schema: tourism; Owner: mac_postgres
--

SELECT pg_catalog.setval('tourism.organization_id', 1, false);


--
-- Name: page_id; Type: SEQUENCE SET; Schema: tourism; Owner: mac_postgres
--

SELECT pg_catalog.setval('tourism.page_id', 1, false);


--
-- Name: refresh_token_id; Type: SEQUENCE SET; Schema: tourism; Owner: mac_postgres
--

SELECT pg_catalog.setval('tourism.refresh_token_id', 1, true);


--
-- Name: role_id; Type: SEQUENCE SET; Schema: tourism; Owner: mac_postgres
--

SELECT pg_catalog.setval('tourism.role_id', 1, false);


--
-- Name: room_type_id; Type: SEQUENCE SET; Schema: tourism; Owner: mac_postgres
--

SELECT pg_catalog.setval('tourism.room_type_id', 1, false);


--
-- Name: user_id; Type: SEQUENCE SET; Schema: tourism; Owner: mac_postgres
--

SELECT pg_catalog.setval('tourism.user_id', 1, false);


--
-- Name: organization_modules organization_modules_pkey; Type: CONSTRAINT; Schema: public; Owner: mac_postgres
--

ALTER TABLE ONLY public.organization_modules
    ADD CONSTRAINT organization_modules_pkey PRIMARY KEY (organization_id, module_id);


--
-- Name: page_authorities page_authorities_pkey; Type: CONSTRAINT; Schema: public; Owner: mac_postgres
--

ALTER TABLE ONLY public.page_authorities
    ADD CONSTRAINT page_authorities_pkey PRIMARY KEY (page_id, authority_id);


--
-- Name: role_pages role_pages_pkey; Type: CONSTRAINT; Schema: public; Owner: mac_postgres
--

ALTER TABLE ONLY public.role_pages
    ADD CONSTRAINT role_pages_pkey PRIMARY KEY (role_id, page_id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: mac_postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: address_book address_book_pkey; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.address_book
    ADD CONSTRAINT address_book_pkey PRIMARY KEY (address_book_id);


--
-- Name: authority authority_pkey; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.authority
    ADD CONSTRAINT authority_pkey PRIMARY KEY (authority_id);


--
-- Name: country country_pkey; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (country_id);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);


--
-- Name: hotel hotel_pkey; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.hotel
    ADD CONSTRAINT hotel_pkey PRIMARY KEY (hotel_id);


--
-- Name: location location_pkey; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (location_id);


--
-- Name: module module_pkey; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.module
    ADD CONSTRAINT module_pkey PRIMARY KEY (module_id);


--
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (organization_id);


--
-- Name: page page_pkey; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.page
    ADD CONSTRAINT page_pkey PRIMARY KEY (page_id);


--
-- Name: refresh_token refresh_token_pkey; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.refresh_token
    ADD CONSTRAINT refresh_token_pkey PRIMARY KEY (refresh_token_id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_id);


--
-- Name: room_feature room_feature_pkey; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.room_feature
    ADD CONSTRAINT room_feature_pkey PRIMARY KEY (room_feature_id);


--
-- Name: room_type room_type_pkey; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.room_type
    ADD CONSTRAINT room_type_pkey PRIMARY KEY (room_type_id);


--
-- Name: role uk_iubw515ff0ugtm28p8g3myt0h; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.role
    ADD CONSTRAINT uk_iubw515ff0ugtm28p8g3myt0h UNIQUE (role_name);


--
-- Name: refresh_token uk_r4k4edos30bx9neoq81mdvwph; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.refresh_token
    ADD CONSTRAINT uk_r4k4edos30bx9neoq81mdvwph UNIQUE (token);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: page_authorities fk3vepotlarsj8asqi6sqtibwjn; Type: FK CONSTRAINT; Schema: public; Owner: mac_postgres
--

ALTER TABLE ONLY public.page_authorities
    ADD CONSTRAINT fk3vepotlarsj8asqi6sqtibwjn FOREIGN KEY (authority_id) REFERENCES tourism.authority(authority_id);


--
-- Name: user_roles fk55itppkw3i07do3h7qoclqd4k; Type: FK CONSTRAINT; Schema: public; Owner: mac_postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fk55itppkw3i07do3h7qoclqd4k FOREIGN KEY (user_id) REFERENCES tourism."user"(user_id);


--
-- Name: organization_modules fk92idpswmv9w3wugm0duaq7cu1; Type: FK CONSTRAINT; Schema: public; Owner: mac_postgres
--

ALTER TABLE ONLY public.organization_modules
    ADD CONSTRAINT fk92idpswmv9w3wugm0duaq7cu1 FOREIGN KEY (organization_id) REFERENCES tourism.organization(organization_id);


--
-- Name: role_pages fkanuyqpmi85i99w0wo0ska6lek; Type: FK CONSTRAINT; Schema: public; Owner: mac_postgres
--

ALTER TABLE ONLY public.role_pages
    ADD CONSTRAINT fkanuyqpmi85i99w0wo0ska6lek FOREIGN KEY (page_id) REFERENCES tourism.page(page_id);


--
-- Name: organization_modules fkdifj8iu3hmx4h4g06r1wcxguh; Type: FK CONSTRAINT; Schema: public; Owner: mac_postgres
--

ALTER TABLE ONLY public.organization_modules
    ADD CONSTRAINT fkdifj8iu3hmx4h4g06r1wcxguh FOREIGN KEY (module_id) REFERENCES tourism.module(module_id);


--
-- Name: page_authorities fkr832q7ei6ittr8e7irpxohiy8; Type: FK CONSTRAINT; Schema: public; Owner: mac_postgres
--

ALTER TABLE ONLY public.page_authorities
    ADD CONSTRAINT fkr832q7ei6ittr8e7irpxohiy8 FOREIGN KEY (page_id) REFERENCES tourism.page(page_id);


--
-- Name: user_roles fkrhfovtciq1l558cw6udg0h0d3; Type: FK CONSTRAINT; Schema: public; Owner: mac_postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkrhfovtciq1l558cw6udg0h0d3 FOREIGN KEY (role_id) REFERENCES tourism.role(role_id);


--
-- Name: role_pages fkrrxgld81hcth8bp6ekt7uekis; Type: FK CONSTRAINT; Schema: public; Owner: mac_postgres
--

ALTER TABLE ONLY public.role_pages
    ADD CONSTRAINT fkrrxgld81hcth8bp6ekt7uekis FOREIGN KEY (role_id) REFERENCES tourism.role(role_id);


--
-- Name: room_feature fk179cks2ffo5jxe4qjgwyumivh; Type: FK CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.room_feature
    ADD CONSTRAINT fk179cks2ffo5jxe4qjgwyumivh FOREIGN KEY (room_type_id) REFERENCES tourism.room_type(room_type_id);


--
-- Name: page fk4oaif8jsf3uf29oga817wv75h; Type: FK CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.page
    ADD CONSTRAINT fk4oaif8jsf3uf29oga817wv75h FOREIGN KEY (module_id) REFERENCES tourism.module(module_id);


--
-- Name: address_book fk7c0n0cauq81iv6kuejlyicmxd; Type: FK CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.address_book
    ADD CONSTRAINT fk7c0n0cauq81iv6kuejlyicmxd FOREIGN KEY (location_id) REFERENCES tourism.location(location_id);


--
-- Name: room_type fk8sgnny12n0v74j6u7u94w7mxp; Type: FK CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.room_type
    ADD CONSTRAINT fk8sgnny12n0v74j6u7u94w7mxp FOREIGN KEY (hotel_id) REFERENCES tourism.hotel(hotel_id);


--
-- Name: hotel fkb4h75w604laowixo2ound9h7c; Type: FK CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.hotel
    ADD CONSTRAINT fkb4h75w604laowixo2ound9h7c FOREIGN KEY (address_book_id) REFERENCES tourism.address_book(address_book_id);


--
-- Name: customer fkdkip5uestga40r2ll4nbob8dy; Type: FK CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.customer
    ADD CONSTRAINT fkdkip5uestga40r2ll4nbob8dy FOREIGN KEY (address_book_id) REFERENCES tourism.address_book(address_book_id);


--
-- Name: refresh_token fkfgk1klcib7i15utalmcqo7krt; Type: FK CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.refresh_token
    ADD CONSTRAINT fkfgk1klcib7i15utalmcqo7krt FOREIGN KEY (user_id) REFERENCES tourism."user"(user_id);


--
-- Name: user fki3ynrf4qjomj2hdjx7ssa3mlh; Type: FK CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism."user"
    ADD CONSTRAINT fki3ynrf4qjomj2hdjx7ssa3mlh FOREIGN KEY (organization_id) REFERENCES tourism.organization(organization_id);


--
-- Name: address_book fkllvnxtw12xl2jmdowsi0sy20p; Type: FK CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.address_book
    ADD CONSTRAINT fkllvnxtw12xl2jmdowsi0sy20p FOREIGN KEY (country_id) REFERENCES tourism.country(country_id);


--
-- Name: location fkn5m6ve3ryy2r25qvisdrg0aos; Type: FK CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.location
    ADD CONSTRAINT fkn5m6ve3ryy2r25qvisdrg0aos FOREIGN KEY (country_id) REFERENCES tourism.country(country_id);


--
-- Name: organization fkq2g6x6o96kf9f5asivgjmmepl; Type: FK CONSTRAINT; Schema: tourism; Owner: mac_postgres
--

ALTER TABLE ONLY tourism.organization
    ADD CONSTRAINT fkq2g6x6o96kf9f5asivgjmmepl FOREIGN KEY (address_book_id) REFERENCES tourism.address_book(address_book_id);


--
-- PostgreSQL database dump complete
--

