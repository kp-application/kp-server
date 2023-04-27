-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('local', 'kakao', 'naver');

-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('online', 'offline');

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "image_url" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ,
    "couple_room_id" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_profile_meta" (
    "age" INTEGER NOT NULL,
    "gender" VARCHAR(2) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "provider" "Provider" NOT NULL DEFAULT 'local',
    "refresh_token" VARCHAR(255),
    "user_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "user_couple_meta" (
    "is_couple" BOOLEAN NOT NULL DEFAULT false,
    "sended_code" VARCHAR(255),
    "received_code" VARCHAR(255),
    "user_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "couple_room" (
    "couple_room_id" SERIAL NOT NULL,
    "title" VARCHAR(20) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "status" "RoomStatus" NOT NULL DEFAULT 'offline',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "couple_room_pkey" PRIMARY KEY ("couple_room_id")
);

-- CreateTable
CREATE TABLE "couple_room_chat" (
    "couple_room_chat_id" SERIAL NOT NULL,
    "content" VARCHAR(255),
    "image_url" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "couple_room_id" INTEGER NOT NULL,

    CONSTRAINT "couple_room_chat_pkey" PRIMARY KEY ("couple_room_chat_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_couple_room_id_key" ON "user"("couple_room_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_meta_user_id_key" ON "user_profile_meta"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_couple_meta_user_id_key" ON "user_couple_meta"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "couple_room_chat_userId_key" ON "couple_room_chat"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "couple_room_chat_couple_room_id_key" ON "couple_room_chat"("couple_room_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_couple_room_id_fkey" FOREIGN KEY ("couple_room_id") REFERENCES "couple_room"("couple_room_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile_meta" ADD CONSTRAINT "user_profile_meta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_couple_meta" ADD CONSTRAINT "user_couple_meta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "couple_room_chat" ADD CONSTRAINT "couple_room_chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "couple_room_chat" ADD CONSTRAINT "couple_room_chat_couple_room_id_fkey" FOREIGN KEY ("couple_room_id") REFERENCES "couple_room"("couple_room_id") ON DELETE CASCADE ON UPDATE CASCADE;
