import {integer, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar} from "drizzle-orm/pg-core";


export const teamRoleEnum = pgEnum("role", ["admin", "member", "observer"]);

export const users = pgTable(
    "user",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        first_name: varchar("first_name", {length: 255}).notNull(),
        last_name: varchar("last_name", {length: 255}).notNull(),
        email: varchar("email").notNull(),
        password_hash: varchar("password_hash", {length: 255}).notNull(),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
    },
    (users) => {
        return {
            uniqueIdx: uniqueIndex("unique_idx").on(users.email),
        }
    }
);

export const sessions = pgTable(
    "session",
    {
        id: text("id").primaryKey(),
        userId: text("user_id")
            .notNull()
            .references(() => users.id),
        expiresAt: timestamp("expires_at").notNull(),
    }
);

export const teams = pgTable(
    "team",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        name: varchar("name").notNull(), // Team name
        description: varchar("description"), // Optional description of the team
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
    }
);

// Many-to-many relationship between users and teams, with the team role
export const teamMembers = pgTable(
    "team_members",
    {
        userId: text("user_id")
            .notNull()
            .references(() => users.id),
        teamId: text("team_id")
            .notNull()
            .references(() => teams.id),
        role: teamRoleEnum("role").notNull(), // Role of the user in the team
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
    }
);

export const projects = pgTable(
    "project",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        name: varchar("name").notNull(), // Project name
        description: varchar("description"), // Optional description
        teamId: text("team_id")
            .references(() => teams.id), // Project can belong to a team
        createdBy: text("created_by")
            .references(() => users.id), // The user who created the project
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
    }
);

export const testPlans = pgTable(
    "test_plan",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        name: varchar("name").notNull(), // Name of the test plan
        description: varchar("description"), // Optional description of the test plan
        git_link: varchar("git_link").notNull(), // JMeter XML or any form of test plan content
        projectId: text("project_id")
            .references(() => projects.id), // Test plan belongs to a project
        createdBy: text("created_by")
            .references(() => users.id), // User who created the test plan
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
    }
);