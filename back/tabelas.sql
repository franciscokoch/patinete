CREATE TABLE "clientes" (
    "id" serial,
    "nome" varchar(200) NOT NULL,
    "cpf" varchar(200) NOT NULL,
    "email" varchar(200) NULL,
    "telefone" varchar(200) NULL,
    "cidade" varchar(200) NULL,
    "siglaUf" varchar(200) NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "meioPagamento" (
    "id" serial,
    "nome" varchar(200) NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "patinetes" (
    "id" serial,
    "cor" varchar(200) NOT NULL,
    "marca" varchar(200) NOT NULL,
    "modelo" varchar(200) NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "alugueis" (
    "id" serial,
    "idCliente" int NOT NULL,
    "idPatinete" int NOT NULL,
    "idMeioPagamento" int NOT NULL,
    "dataAluguel" VARCHAR(200) NOT NULL,
    "horaAluguel" VARCHAR(200) NOT NULL,
    "dataDevolucao" VARCHAR(200) NULL,
    "horaDevolucao" VARCHAR(200) NULL,
    "valorTotal" DECIMAL(10,2) NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("idCliente") REFERENCES clientes ("id"),
    FOREIGN KEY ("idPatinete") REFERENCES patinetes ("id"),
    FOREIGN KEY ("idMeioPagamento") REFERENCES "meioPagamento" ("id")
);

CREATE TABLE "aluguelItem" (
    "id" serial,
    "idAluguel" int NOT NULL,
    "idPatinete" int NOT NULL,
    "quantidade" int NOT NULL,
    "valorUnitario" DECIMAL(10,2) NOT NULL,
    "valorTotal" DECIMAL(10,2) NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("idAluguel") REFERENCES alugueis ("id"),
    FOREIGN KEY ("idPatinete") REFERENCES patinetes ("id")
);

CREATE TABLE "usuarios" (
    "id" serial,
    "usuario" varchar(200) NOT NULL,
    "senha" varchar(200) NOT NULL,
    PRIMARY KEY ("id")
);