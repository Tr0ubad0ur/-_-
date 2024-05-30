-- SQLBook: Code
PGDMP                       |            reg    16.3    16.3 -    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    reg    DATABASE     w   CREATE DATABASE reg WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE reg;
                postgres    false            �            1259    16423    catalog    TABLE     �   CREATE TABLE public.catalog (
    id_cat integer NOT NULL,
    song text NOT NULL,
    price numeric(10,2) NOT NULL,
    disk text NOT NULL,
    id_store integer NOT NULL
);
    DROP TABLE public.catalog;
       public         heap    postgres    false            �            1259    16422    catalog_id_cat_seq    SEQUENCE     �   CREATE SEQUENCE public.catalog_id_cat_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.catalog_id_cat_seq;
       public          postgres    false    220            �           0    0    catalog_id_cat_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.catalog_id_cat_seq OWNED BY public.catalog.id_cat;
          public          postgres    false    219            �            1259    16453    catalog_id_store_seq    SEQUENCE     �   CREATE SEQUENCE public.catalog_id_store_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.catalog_id_store_seq;
       public          postgres    false    220            �           0    0    catalog_id_store_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.catalog_id_store_seq OWNED BY public.catalog.id_store;
          public          postgres    false    224            �            1259    16414    records    TABLE       CREATE TABLE public.records (
    id_records integer NOT NULL,
    name_records text NOT NULL,
    genre text NOT NULL,
    singer text NOT NULL,
    year_records integer NOT NULL,
    company text NOT NULL,
    type_records text NOT NULL,
    id_cat integer NOT NULL
);
    DROP TABLE public.records;
       public         heap    postgres    false            �            1259    16440    records_id_cat_seq    SEQUENCE     �   CREATE SEQUENCE public.records_id_cat_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.records_id_cat_seq;
       public          postgres    false    218            �           0    0    records_id_cat_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.records_id_cat_seq OWNED BY public.records.id_cat;
          public          postgres    false    223            �            1259    16413    records_id_records_seq    SEQUENCE     �   CREATE SEQUENCE public.records_id_records_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.records_id_records_seq;
       public          postgres    false    218            �           0    0    records_id_records_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.records_id_records_seq OWNED BY public.records.id_records;
          public          postgres    false    217            �            1259    16399    reg    TABLE        CREATE TABLE public.reg (
    id integer NOT NULL,
    email text NOT NULL,
    pass text NOT NULL,
    login text NOT NULL
);
    DROP TABLE public.reg;
       public         heap    postgres    false            �            1259    16398 
   reg_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reg_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.reg_id_seq;
       public          postgres    false    216            �           0    0 
   reg_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.reg_id_seq OWNED BY public.reg.id;
          public          postgres    false    215            �            1259    16432    store    TABLE     �   CREATE TABLE public.store (
    id_store integer NOT NULL,
    list text NOT NULL,
    price numeric(10,2) NOT NULL,
    quantity integer NOT NULL,
    have integer NOT NULL
);
    DROP TABLE public.store;
       public         heap    postgres    false            �            1259    16431    store_id_store_seq    SEQUENCE     �   CREATE SEQUENCE public.store_id_store_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.store_id_store_seq;
       public          postgres    false    222            �           0    0    store_id_store_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.store_id_store_seq OWNED BY public.store.id_store;
          public          postgres    false    221            .           2604    16426    catalog id_cat    DEFAULT     p   ALTER TABLE ONLY public.catalog ALTER COLUMN id_cat SET DEFAULT nextval('public.catalog_id_cat_seq'::regclass);
 =   ALTER TABLE public.catalog ALTER COLUMN id_cat DROP DEFAULT;
       public          postgres    false    219    220    220            /           2604    16454    catalog id_store    DEFAULT     t   ALTER TABLE ONLY public.catalog ALTER COLUMN id_store SET DEFAULT nextval('public.catalog_id_store_seq'::regclass);
 ?   ALTER TABLE public.catalog ALTER COLUMN id_store DROP DEFAULT;
       public          postgres    false    224    220            ,           2604    16417    records id_records    DEFAULT     x   ALTER TABLE ONLY public.records ALTER COLUMN id_records SET DEFAULT nextval('public.records_id_records_seq'::regclass);
 A   ALTER TABLE public.records ALTER COLUMN id_records DROP DEFAULT;
       public          postgres    false    217    218    218            -           2604    16441    records id_cat    DEFAULT     p   ALTER TABLE ONLY public.records ALTER COLUMN id_cat SET DEFAULT nextval('public.records_id_cat_seq'::regclass);
 =   ALTER TABLE public.records ALTER COLUMN id_cat DROP DEFAULT;
       public          postgres    false    223    218            +           2604    16402    reg id    DEFAULT     `   ALTER TABLE ONLY public.reg ALTER COLUMN id SET DEFAULT nextval('public.reg_id_seq'::regclass);
 5   ALTER TABLE public.reg ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            0           2604    16435    store id_store    DEFAULT     p   ALTER TABLE ONLY public.store ALTER COLUMN id_store SET DEFAULT nextval('public.store_id_store_seq'::regclass);
 =   ALTER TABLE public.store ALTER COLUMN id_store DROP DEFAULT;
       public          postgres    false    222    221    222            �          0    16423    catalog 
   TABLE DATA           F   COPY public.catalog (id_cat, song, price, disk, id_store) FROM stdin;
    public          postgres    false    220   �0       �          0    16414    records 
   TABLE DATA           w   COPY public.records (id_records, name_records, genre, singer, year_records, company, type_records, id_cat) FROM stdin;
    public          postgres    false    218   �0       �          0    16399    reg 
   TABLE DATA           5   COPY public.reg (id, email, pass, login) FROM stdin;
    public          postgres    false    216   �1       �          0    16432    store 
   TABLE DATA           F   COPY public.store (id_store, list, price, quantity, have) FROM stdin;
    public          postgres    false    222   2       �           0    0    catalog_id_cat_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.catalog_id_cat_seq', 8, true);
          public          postgres    false    219            �           0    0    catalog_id_store_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.catalog_id_store_seq', 3, true);
          public          postgres    false    224            �           0    0    records_id_cat_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.records_id_cat_seq', 3, true);
          public          postgres    false    223            �           0    0    records_id_records_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.records_id_records_seq', 13, true);
          public          postgres    false    217            �           0    0 
   reg_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.reg_id_seq', 3, true);
          public          postgres    false    215            �           0    0    store_id_store_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.store_id_store_seq', 3, true);
          public          postgres    false    221            <           2606    16430    catalog catalog_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.catalog
    ADD CONSTRAINT catalog_pkey PRIMARY KEY (id_cat);
 >   ALTER TABLE ONLY public.catalog DROP CONSTRAINT catalog_pkey;
       public            postgres    false    220            :           2606    16421    records records_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.records
    ADD CONSTRAINT records_pkey PRIMARY KEY (id_records);
 >   ALTER TABLE ONLY public.records DROP CONSTRAINT records_pkey;
       public            postgres    false    218            2           2606    16408    reg reg_email_key 
   CONSTRAINT     M   ALTER TABLE ONLY public.reg
    ADD CONSTRAINT reg_email_key UNIQUE (email);
 ;   ALTER TABLE ONLY public.reg DROP CONSTRAINT reg_email_key;
       public            postgres    false    216            4           2606    16412    reg reg_login_key 
   CONSTRAINT     M   ALTER TABLE ONLY public.reg
    ADD CONSTRAINT reg_login_key UNIQUE (login);
 ;   ALTER TABLE ONLY public.reg DROP CONSTRAINT reg_login_key;
       public            postgres    false    216            6           2606    16410    reg reg_pass_key 
   CONSTRAINT     K   ALTER TABLE ONLY public.reg
    ADD CONSTRAINT reg_pass_key UNIQUE (pass);
 :   ALTER TABLE ONLY public.reg DROP CONSTRAINT reg_pass_key;
       public            postgres    false    216            8           2606    16406    reg reg_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.reg
    ADD CONSTRAINT reg_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.reg DROP CONSTRAINT reg_pkey;
       public            postgres    false    216            >           2606    16439    store store_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.store
    ADD CONSTRAINT store_pkey PRIMARY KEY (id_store);
 :   ALTER TABLE ONLY public.store DROP CONSTRAINT store_pkey;
       public            postgres    false    222            @           2606    16461    catalog catalog_id_store_fkey 
   FK CONSTRAINT     �   ALTER TABLE ONLY public.catalog
    ADD CONSTRAINT catalog_id_store_fkey FOREIGN KEY (id_store) REFERENCES public.store(id_store);
 G   ALTER TABLE ONLY public.catalog DROP CONSTRAINT catalog_id_store_fkey;
       public          postgres    false    222    4670    220            ?           2606    16448    records records_id_cat_fkey 
   FK CONSTRAINT        ALTER TABLE ONLY public.records
    ADD CONSTRAINT records_id_cat_fkey FOREIGN KEY (id_cat) REFERENCES public.catalog(id_cat);
 E   ALTER TABLE ONLY public.records DROP CONSTRAINT records_id_cat_fkey;
       public          postgres    false    220    4668    218            �   Q   x�3���KW0�Գ��t�I*�r�L!�F�q#N#.3��1�9BܘӘ�"n�i�7�c7�4E��͉���� =��      �   �   x�E���0 D�ӯ���r��h4�%^jm�
�r��"��{�2;�ų+)é�D¼h�q𪬅��<ƚ0gF]�gmr��hb�?{C�M_`C�q��VK-����;�h[e�0w�|$�������SOҒ� ֹ���O�7;��¡�o��F�d�ܥ�M?�XB�|�D�      �   Y   x�m�A
� @���a�t�@4Lґ&��W����@�X(O|�\7�E2T�z�L���8@r�I�zĮ��m G���UJ�7a�3!�
��1�      �   A   x�3���KW0�Q �&���z����@�e�4�J�qZ���rF9#��)P$i�i����� �[�     