CREATE TABLE "c2Profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"first" varchar(30) NOT NULL,
	"last" varchar(30) NOT NULL,
	"username" varchar(30) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
DROP TABLE "c2Posts" CASCADE;