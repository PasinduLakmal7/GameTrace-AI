import {
    pgTable,
    serial,
    varchar,
    text,
    integer,
    real,
    timestamp,
    jsonb,
    doublePrecision,
} from "drizzle-orm/pg-core"

export const sessions = pgTable("sessions", {
    id: serial("id").primaryKey(),
    sessionId: varchar("session_id", { length: 100 }).notNull().unique(),
    projectId: varchar("project_id", { length: 100 }).notNull(),
    playerName: varchar("player_name", { length: 100 }).notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    gameVersion: varchar("game_version", { length: 50 }),
    platform: varchar("platform", { length: 100 }),

    deviceModel: text("device_model"),
    deviceName: text("device_name"),
    operatingSystem: text("operating_system"),
    processorType: text("processor_type"),
    processorCount: integer("processor_count"),
    systemMemorySize: integer("system_memory_size"),
    graphicsDeviceName: text("graphics_device_name"),
    graphicsMemorySize: integer("graphics_memory_size"),
    screenResolution: varchar("screen_resolution", { length: 50 }),

    finalScore: integer("final_score").notNull(),
    duration: real("duration").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const events = pgTable("events", {
    id: serial("id").primaryKey(),
    sessionId: varchar("session_id", { length: 100 }).notNull(),
    eventTime: real("event_time").notNull(),
    eventType: varchar("event_type", { length: 100 }).notNull(),

    x: real("x").notNull(),
    y: real("y").notNull(),
    z: real("z").notNull(),

    score: integer("score").notNull(),
    value: text("value"),
    metadata: jsonb("metadata"),

    screenshotUrl: text("screenshot_url"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const aiReports = pgTable("ai_reports", {
    id: serial("id").primaryKey(),
    sessionId: varchar("session_id", { length: 100 }).notNull(),
    summary: text("summary"),
    rootCause: text("root_cause"),
    bugReport: text("bug_report"),
    reproductionSteps: text("reproduction_steps"),
    testCase: text("test_case"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})


export const snapshots = pgTable("snapshots", {
    id: serial("id").primaryKey(),

    sessionId: varchar("session_id", { length: 100 })
        .notNull()
        .references(() => sessions.sessionId, { onDelete: "cascade" }),

    frameTime: doublePrecision("frame_time").notNull(),
    frameIndex: integer("frame_index").notNull(),

    screenshotUrl: text("screenshot_url").notNull(),

    x: doublePrecision("x").notNull(),
    y: doublePrecision("y").notNull(),
    z: doublePrecision("z").notNull(),

    score: integer("score").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
})