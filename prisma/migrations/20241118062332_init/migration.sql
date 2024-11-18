-- CreateTable
CREATE TABLE "grade" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "grade_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guest" (
    "id" INTEGER NOT NULL,
    "expires_at" DATE NOT NULL,

    CONSTRAINT "guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historicproject" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,
    "laboratory_id" INTEGER NOT NULL,
    "historicprojecttype_id" INTEGER NOT NULL,
    "historicprojectstatus_id" INTEGER NOT NULL,

    CONSTRAINT "historicproject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historicprojectscholar" (
    "historicproject_id" INTEGER NOT NULL,
    "historicscholar_id" INTEGER NOT NULL,

    CONSTRAINT "historicprojectscholar_pkey" PRIMARY KEY ("historicproject_id","historicscholar_id")
);

-- CreateTable
CREATE TABLE "historicprojectstatus" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "historicprojectstatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historicprojecttype" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "historicprojecttype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historicscholar" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "dni" VARCHAR(25),
    "file" VARCHAR(25),
    "phone" VARCHAR(25),
    "careerlevel" INTEGER,
    "historicusercareer_id" INTEGER NOT NULL,
    "historicscholarshiptype_id" INTEGER NOT NULL,
    "email" VARCHAR(255),

    CONSTRAINT "historicscholar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historicscholarshiptype" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "historicscholarshiptype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historicusercareer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "historicusercareer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laboratory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "lab_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "sender_id" INTEGER,
    "receiver_id" INTEGER,
    "timestamp" TIMESTAMP(6) NOT NULL,
    "is_read" BOOLEAN DEFAULT false,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observation" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "task_id" INTEGER,
    "project_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" INTEGER,

    CONSTRAINT "observation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observation_read" (
    "id" SERIAL NOT NULL,
    "observation_id" INTEGER NOT NULL,
    "scholar_id" INTEGER NOT NULL,
    "is_read" BOOLEAN DEFAULT false,

    CONSTRAINT "observation_read_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(6),
    "finished_at" TIMESTAMP(6),
    "laboratory_id" INTEGER NOT NULL,
    "projecttype_id" INTEGER NOT NULL,
    "projectstatus_id" INTEGER NOT NULL,
    "grade_id" INTEGER,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectgrade" (
    "date" DATE NOT NULL DEFAULT CURRENT_DATE,
    "grade_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "projectgrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectscholar" (
    "project_id" INTEGER NOT NULL,
    "scholar_id" INTEGER NOT NULL,

    CONSTRAINT "projectscholar_pkey" PRIMARY KEY ("project_id","scholar_id")
);

-- CreateTable
CREATE TABLE "projectstatus" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "projectstatus_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projecttype" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "projecttype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recoverytoken" (
    "email" VARCHAR(100) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expires_at" DATE NOT NULL,

    CONSTRAINT "recoverytoken_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "scholar" (
    "id" INTEGER NOT NULL,
    "file" VARCHAR(25) NOT NULL,
    "phone" VARCHAR(25),
    "address" VARCHAR(100),
    "careerlevel" INTEGER,
    "usercareer_id" INTEGER NOT NULL,
    "scholarshiptype_id" INTEGER NOT NULL,
    "dni" VARCHAR(25) NOT NULL,

    CONSTRAINT "scholar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scholarshiptype" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "scholarchiptype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supply" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "laboratory_id" INTEGER,
    "supplystatus_id" INTEGER,
    "supplytype_id" INTEGER,
    "name" VARCHAR(50),
    "year" INTEGER,

    CONSTRAINT "supply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplystatus" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "supplystatus_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplytype" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "supplytype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "project_id" INTEGER NOT NULL,
    "taskstatus_id" INTEGER,
    "name" VARCHAR(50),
    "start_date" TIMESTAMP(6),
    "end_date" TIMESTAMP(6),

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taskstatus" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "taskstatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "usertype_id" INTEGER NOT NULL,
    "userstatus_id" INTEGER NOT NULL,
    "laboratory_id" INTEGER,
    "emailverified" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dropped_at" TIMESTAMP(6),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usercareer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "usercareer_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userstatus" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "userstatus_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usertype" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "usertype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtoken" (
    "email" VARCHAR(100) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expires_at" DATE NOT NULL,

    CONSTRAINT "verificationtoken_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE INDEX "idx_receiver_id" ON "message"("receiver_id");

-- CreateIndex
CREATE INDEX "idx_sender_id" ON "message"("sender_id");

-- CreateIndex
CREATE UNIQUE INDEX "scholar_file_key" ON "scholar"("file");

-- CreateIndex
CREATE UNIQUE INDEX "scholar_dni_key" ON "scholar"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "guest" ADD CONSTRAINT "guest_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historicproject" ADD CONSTRAINT "historicproject_historicprojectstatus_id_fkey" FOREIGN KEY ("historicprojectstatus_id") REFERENCES "historicprojectstatus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historicproject" ADD CONSTRAINT "historicproject_historicprojecttype_id_fkey" FOREIGN KEY ("historicprojecttype_id") REFERENCES "historicprojecttype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historicproject" ADD CONSTRAINT "historicproject_laboratory_id_fkey" FOREIGN KEY ("laboratory_id") REFERENCES "laboratory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historicprojectscholar" ADD CONSTRAINT "historicprojectscholar_historicproject_id_fkey" FOREIGN KEY ("historicproject_id") REFERENCES "historicproject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historicprojectscholar" ADD CONSTRAINT "historicprojectscholar_historicscholar_id_fkey" FOREIGN KEY ("historicscholar_id") REFERENCES "historicscholar"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historicscholar" ADD CONSTRAINT "historicscholar_historicscholarshiptype_id_fkey" FOREIGN KEY ("historicscholarshiptype_id") REFERENCES "historicscholarshiptype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historicscholar" ADD CONSTRAINT "historicscholar_historicusercareer_id_fkey" FOREIGN KEY ("historicusercareer_id") REFERENCES "historicusercareer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "observation" ADD CONSTRAINT "observation_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "observation" ADD CONSTRAINT "observation_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "observation" ADD CONSTRAINT "observation_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "observation_read" ADD CONSTRAINT "observation_read_observation_id_fkey" FOREIGN KEY ("observation_id") REFERENCES "observation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "observation_read" ADD CONSTRAINT "observation_read_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "scholar"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_laboratory_id_fkey" FOREIGN KEY ("laboratory_id") REFERENCES "laboratory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_projectstatus_id_fkey" FOREIGN KEY ("projectstatus_id") REFERENCES "projectstatus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_projecttype_id_fkey" FOREIGN KEY ("projecttype_id") REFERENCES "projecttype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projectgrade" ADD CONSTRAINT "projectgrade_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projectgrade" ADD CONSTRAINT "projectgrade_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projectscholar" ADD CONSTRAINT "projectscholar_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projectscholar" ADD CONSTRAINT "projectscholar_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "scholar"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recoverytoken" ADD CONSTRAINT "verificationtoken_email_fkey" FOREIGN KEY ("email") REFERENCES "user"("email") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "scholar" ADD CONSTRAINT "scholar_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "scholar" ADD CONSTRAINT "scholar_scholarshiptype_id_fkey" FOREIGN KEY ("scholarshiptype_id") REFERENCES "scholarshiptype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "scholar" ADD CONSTRAINT "scholar_usercareer_id_fkey" FOREIGN KEY ("usercareer_id") REFERENCES "usercareer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "supply" ADD CONSTRAINT "supply_laboratory_id_fkey" FOREIGN KEY ("laboratory_id") REFERENCES "laboratory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "supply" ADD CONSTRAINT "supply_supplystatus_id_fkey" FOREIGN KEY ("supplystatus_id") REFERENCES "supplystatus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "supply" ADD CONSTRAINT "supply_supplytype_id_fkey" FOREIGN KEY ("supplytype_id") REFERENCES "supplytype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_taskstatus_id_fkey" FOREIGN KEY ("taskstatus_id") REFERENCES "taskstatus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_laboratory_id_fkey" FOREIGN KEY ("laboratory_id") REFERENCES "laboratory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_userstatus_id_fkey" FOREIGN KEY ("userstatus_id") REFERENCES "userstatus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_usertype_id_fkey" FOREIGN KEY ("usertype_id") REFERENCES "usertype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "verificationtoken" ADD CONSTRAINT "verificationtoken_email_fkey" FOREIGN KEY ("email") REFERENCES "user"("email") ON DELETE NO ACTION ON UPDATE NO ACTION;
