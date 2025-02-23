CREATE TABLE "c2Posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "c2Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "c2Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "c2Posts" ADD CONSTRAINT "c2Posts_user_id_c2Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."c2Users"("id") ON DELETE cascade ON UPDATE no action;