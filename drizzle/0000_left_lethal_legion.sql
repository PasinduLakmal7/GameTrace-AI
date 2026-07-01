CREATE TABLE "ai_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" varchar(100) NOT NULL,
	"summary" text,
	"root_cause" text,
	"bug_report" text,
	"reproduction_steps" text,
	"test_case" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" varchar(100) NOT NULL,
	"event_time" real NOT NULL,
	"event_type" varchar(100) NOT NULL,
	"x" real NOT NULL,
	"y" real NOT NULL,
	"z" real NOT NULL,
	"score" integer NOT NULL,
	"screenshotUrl": text("screenshot_url"),
	"value" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" varchar(100) NOT NULL,
	"project_id" varchar(100) NOT NULL,
	"player_name" varchar(100) NOT NULL,
	"status" varchar(50) NOT NULL,
	"game_version" varchar(50),
	"platform" varchar(100),
	"device_model" text,
	"device_name" text,
	"operating_system" text,
	"processor_type" text,
	"processor_count" integer,
	"system_memory_size" integer,
	"graphics_device_name" text,
	"graphics_memory_size" integer,
	"screen_resolution" varchar(50),
	"final_score" integer NOT NULL,
	"duration" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_session_id_unique" UNIQUE("session_id")
);
