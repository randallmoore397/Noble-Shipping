-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "confirmed_at" DATETIME,
    "current_login_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "current_login_ip" TEXT,
    "login_count" INTEGER NOT NULL DEFAULT 0,
    "DateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "staffs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profile_pic" TEXT NOT NULL DEFAULT 'default.png',
    "first_name" TEXT,
    "middle_name" TEXT,
    "last_name" TEXT,
    "position" TEXT,
    "gender" TEXT,
    "telephone_phone" TEXT,
    "mobile" TEXT,
    "user_attribute" TEXT NOT NULL DEFAULT '',
    "address" TEXT,
    "address_two" TEXT,
    "datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    CONSTRAINT "staffs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cargo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tracking_number" TEXT NOT NULL,
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
);

-- CreateTable
CREATE TABLE "CargoStatusHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cargo_id" INTEGER NOT NULL,
    "current_carrier" TEXT,
    "status" TEXT NOT NULL,
    "location" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CargoStatusHistory_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Aircargo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tracking_number" TEXT NOT NULL,
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
);

-- CreateTable
CREATE TABLE "AircargoStatusHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "aircargo_id" INTEGER NOT NULL,
    "current_carrier" TEXT,
    "status" TEXT NOT NULL,
    "location" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AircargoStatusHistory_aircargo_id_fkey" FOREIGN KEY ("aircargo_id") REFERENCES "Aircargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Parcel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tracking_number" TEXT NOT NULL,
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
);

-- CreateTable
CREATE TABLE "ParcelStatusHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parcel_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "location" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ParcelStatusHistory_parcel_id_fkey" FOREIGN KEY ("parcel_id") REFERENCES "Parcel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RequestQuote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "service" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "from_country" TEXT NOT NULL,
    "to_country" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "GetInTouch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "message" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_tracking_number_key" ON "Cargo"("tracking_number");

-- CreateIndex
CREATE UNIQUE INDEX "Aircargo_tracking_number_key" ON "Aircargo"("tracking_number");

-- CreateIndex
CREATE UNIQUE INDEX "Parcel_tracking_number_key" ON "Parcel"("tracking_number");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");
