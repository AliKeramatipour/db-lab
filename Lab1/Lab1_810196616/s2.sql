CREATE TABLE Users
(
 user_id      uuid NOT NULL,
 email        char(50) NOT NULL,
 username     char(50) NOT NULL,
 name         char(50) NOT NULL,
 phone_number char(50) NOT NULL,
 CONSTRAINT PK_user PRIMARY KEY ( user_id )
);

CREATE TABLE project_type
(
 type_id int NOT NULL,
 title   char(50) NOT NULL,
 CONSTRAINT PK_project_type PRIMARY KEY ( type_id )
);

CREATE TABLE Employer
(
 Employer_ID uuid NOT NULL,
 CONSTRAINT PK_employer PRIMARY KEY ( Employer_ID ),
 CONSTRAINT FK_203 FOREIGN KEY ( Employer_ID ) REFERENCES Users ( user_id )
);

CREATE INDEX fkIdx_204 ON Employer
(
 Employer_ID
);

CREATE TABLE Freelancer
(
 Freelancer_ID uuid NOT NULL,
 resume_id     int NOT NULL,
 CONSTRAINT PK_freelancer PRIMARY KEY ( Freelancer_ID ),
 CONSTRAINT ind_120 UNIQUE ( resume_id ),
 CONSTRAINT FK_193 FOREIGN KEY ( Freelancer_ID ) REFERENCES Users ( user_id )
);

CREATE INDEX fkIdx_117 ON Freelancer
(
 resume_id
);

CREATE INDEX fkIdx_194 ON Freelancer
(
 Freelancer_ID
);

CREATE TABLE Resume
(
 resume_id     int NOT NULL,
 education     char(50) NOT NULL,
 personal_info char(50) NOT NULL,
 experience    char(50) NOT NULL,
 other_works   char(50) NOT NULL,
 skills        char(50) NOT NULL,
 pdf_file      char(50) NOT NULL,
 Freelancer_ID uuid NOT NULL,
 CONSTRAINT PK_resume PRIMARY KEY ( resume_id ),
 CONSTRAINT FK_120 FOREIGN KEY ( Freelancer_ID ) REFERENCES Freelancer ( Freelancer_ID ) ON DELETE CASCADE
);

CREATE INDEX fkIdx_121 ON Resume
(
 Freelancer_ID
);

ALTER TABLE Freelancer
ADD CONSTRAINT FK_116 FOREIGN KEY ( resume_id ) REFERENCES Resume ( resume_id );

CREATE TABLE Bank_account
(
 Sheba_num      char(50) NOT NULL,
 bank           char(50) NOT NULL,
 firstname      char(50) NOT NULL,
 lastname       char(50) NOT NULL,
 account_number char(50) NOT NULL,
 CONSTRAINT PK_bank_account PRIMARY KEY ( Sheba_num )
);

CREATE TABLE Project
(
 project_code     int NOT NULL,
 due_date         char(50) NOT NULL,
 budget           int NOT NULL,
 suggested_skills char(50) NOT NULL,
 title            char(50) NOT NULL,
 field            char(50) NOT NULL,
 creation_date    char(50) NOT NULL,
 Employer_ID      uuid NOT NULL,
 type_id          int NOT NULL,
 CONSTRAINT PK_project PRIMARY KEY ( project_code ),
 CONSTRAINT FK_156 FOREIGN KEY ( type_id ) REFERENCES project_type ( type_id ),
 CONSTRAINT FK_39 FOREIGN KEY ( Employer_ID ) REFERENCES Employer ( Employer_ID )
);

CREATE INDEX fkIdx_157 ON Project
(
 type_id
);

CREATE INDEX fkIdx_40 ON Project
(
 Employer_ID
);

CREATE TABLE Requests_for
(
 project_code   int NOT NULL,
 Freelancer_ID  uuid NOT NULL,
 date_submitted char(50) NOT NULL,
 comment        char(50) NOT NULL,
 CONSTRAINT PK_requests_for PRIMARY KEY ( project_code, Freelancer_ID ),
 CONSTRAINT FK_82 FOREIGN KEY ( Freelancer_ID ) REFERENCES Freelancer ( Freelancer_ID ),
 CONSTRAINT FK_86 FOREIGN KEY ( project_code ) REFERENCES Project ( project_code )
);

CREATE INDEX fkIdx_83 ON Requests_for
(
 Freelancer_ID
);

CREATE INDEX fkIdx_87 ON Requests_for
(
 project_code
);

CREATE TABLE uses_bank_account
(
 Sheba_num     char(50) NOT NULL,
 Freelancer_ID uuid NOT NULL,
 CONSTRAINT PK_uses_bank_account PRIMARY KEY ( Sheba_num, Freelancer_ID ),
 CONSTRAINT FK_175 FOREIGN KEY ( Freelancer_ID ) REFERENCES Freelancer ( Freelancer_ID ),
 CONSTRAINT FK_179 FOREIGN KEY ( Sheba_num ) REFERENCES Bank_account ( Sheba_num )
);

CREATE INDEX fkIdx_176 ON uses_bank_account
(
 Freelancer_ID
);

CREATE INDEX fkIdx_180 ON uses_bank_account
(
 Sheba_num
);

CREATE TABLE Support_request
(
 request_id   int NOT NULL,
 name         char(50) NOT NULL,
 title        char(50) NOT NULL,
 email        char(50) NOT NULL,
 request_type char(50) NOT NULL,
 comment      char(50) NOT NULL,
 project_code int NOT NULL,
 user_id      uuid NOT NULL,
 CONSTRAINT PK_support_request PRIMARY KEY ( request_id ),
 CONSTRAINT FK_146 FOREIGN KEY ( user_id ) REFERENCES Users ( user_id ),
 CONSTRAINT FK_156 FOREIGN KEY ( project_code ) REFERENCES Project ( project_code )
);

CREATE INDEX fkIdx_147 ON Support_request
(
 user_id
);

CREATE INDEX fkIdx_158 ON Support_request
(
 project_code
);

CREATE TABLE Chooses
(
 project_code  int NOT NULL,
 Freelancer_ID uuid NOT NULL,
 Employer_ID   uuid NOT NULL,
 comments      char(50) NOT NULL,
 CONSTRAINT PK_chooses PRIMARY KEY ( project_code, Freelancer_ID, Employer_ID ),
 CONSTRAINT FK_142 FOREIGN KEY ( Employer_ID ) REFERENCES Employer ( Employer_ID ),
 CONSTRAINT FK_148 FOREIGN KEY ( project_code, Freelancer_ID ) REFERENCES Requests_for ( project_code, Freelancer_ID )
);

CREATE INDEX fkIdx_143 ON Chooses
(
 Employer_ID
);

CREATE INDEX fkIdx_149 ON Chooses
(
 project_code,
 Freelancer_ID
);

CREATE TABLE Inquiry_request
(
 Reference_num    int NOT NULL,
 Employer_ID      uuid NOT NULL,
 date_submitted   char(50) NOT NULL,
 deposit_num      char(50) NOT NULL,
 amount           char(50) NOT NULL,
 bank_destination char(50) NOT NULL,
 CONSTRAINT PK_inquiry_request PRIMARY KEY ( Reference_num ),
 CONSTRAINT FK_24 FOREIGN KEY ( Employer_ID ) REFERENCES Employer ( Employer_ID )
);

CREATE INDEX fkIdx_25 ON Inquiry_request
(
 Employer_ID
);

CREATE TABLE Salary_requests
(
 project_code             int NOT NULL,
 Freelancer_ID            uuid NOT NULL,
 Employer_ID              uuid NOT NULL,
 comments                 char(50) NOT NULL,
 destination_bank_account char(50) NOT NULL,
 CONSTRAINT PK_request_salary PRIMARY KEY ( project_code, Freelancer_ID, Employer_ID ),
 CONSTRAINT FK_158 FOREIGN KEY ( project_code, Freelancer_ID, Employer_ID ) REFERENCES Chooses ( project_code, Freelancer_ID, Employer_ID )
);

CREATE INDEX fkIdx_159 ON Salary_requests
(
 Employer_ID,
 project_code,
 Freelancer_ID
);

