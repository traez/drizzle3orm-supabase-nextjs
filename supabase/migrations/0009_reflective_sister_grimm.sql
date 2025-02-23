CREATE TABLE "c2Notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(30) NOT NULL,
	"text" varchar(250) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
