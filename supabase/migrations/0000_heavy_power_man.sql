CREATE TABLE "c2Posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" varchar(200) NOT NULL,
	"image_url" text DEFAULT 'https://picsum.photos/300/200' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
