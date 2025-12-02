require('dotenv').config();
const { createClient } = require('@libsql/client');

async function setupDatabase() {
  const client = createClient({
    url: process.env.DATABASE_URL
  });

  try {
    // Check if tables exist
    const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table'");
    console.log('Connected to SQLite Cloud database');
    console.log('Existing tables:', tables.rows.map(row => row.name));

    // Create tables if they don't exist
    const createTableQueries = [
      `CREATE TABLE IF NOT EXISTS "Cargo" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "tracking_number" TEXT NOT NULL UNIQUE,
        "cargo_type" TEXT NOT NULL,
        "origin" TEXT NOT NULL,
        "destination" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'Pending',
        "last_location" TEXT,
        "estimated_delivery" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "current_carrier" TEXT,
        "weight" TEXT,
        "dimensions" TEXT,
        "contents_description" TEXT,
        "value" TEXT,
        "insurance" TEXT,
        "barcode" TEXT,
        "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE IF NOT EXISTS "Aircargo" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "tracking_number" TEXT NOT NULL UNIQUE,
        "cargo_type" TEXT NOT NULL,
        "origin" TEXT NOT NULL,
        "destination" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'Pending',
        "last_location" TEXT,
        "estimated_delivery" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "current_carrier" TEXT,
        "weight" TEXT,
        "dimensions" TEXT,
        "contents_description" TEXT,
        "value" TEXT,
        "insurance" TEXT,
        "sender_name" TEXT,
        "sender_contact" TEXT,
        "receiver_name" TEXT,
        "receiver_contact" TEXT,
        "flight_number" TEXT,
        "airway_bill_number" TEXT,
        "departure_date" DATETIME,
        "arrival_date" DATETIME,
        "barcode" TEXT,
        "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE IF NOT EXISTS "Parcel" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "tracking_number" TEXT NOT NULL UNIQUE,
        "sender_name" TEXT NOT NULL,
        "sender_email" TEXT,
        "sender_phone" TEXT,
        "sender_address" TEXT NOT NULL,
        "recipient_name" TEXT NOT NULL,
        "recipient_email" TEXT,
        "recipient_phone" TEXT,
        "recipient_address" TEXT NOT NULL,
        "weight" REAL NOT NULL,
        "service_type" TEXT,
        "status" TEXT NOT NULL DEFAULT 'In Transit',
        "shipping_cost" REAL,
        "estimated_delivery_date" DATETIME,
        "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE IF NOT EXISTS "User" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "user_id" TEXT NOT NULL UNIQUE,
        "email" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "active" BOOLEAN NOT NULL DEFAULT true,
        "confirmed_at" DATETIME,
        "current_login_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "current_login_ip" TEXT,
        "login_count" INTEGER NOT NULL DEFAULT 0,
        "DateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`
    ];

    for (const query of createTableQueries) {
      await client.execute(query);
      console.log('Table created/verified');
    }

    console.log('SQLite Cloud database setup completed successfully!');
  } catch (error) {
    console.error('Error connecting to SQLite Cloud database:', error);
  } finally {
    client.close();
  }
}

setupDatabase();