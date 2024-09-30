import fs from "node:fs/promises";

// localização do nosso arquivo de banco de dados está relativa ao arquivo database.js
const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    // ler o arquivo
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      //caso n exista o arquivo
      .catch(() => {
        // só criará o arquivo
        this.#persist();
      });
  }

  // deixar dados salvos em arquivo físico
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  // object.entries -> Pq estamos recebendo um objeto
  // método some -> vai pegar o objeto e transformar em um array -> ['name', 'Diego'], ['Email', 'Diego']

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update(table, id, data) {
    //buscar para saber se a info existe, se não existir vai retornar -1
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data };
      this.#persist();
    }
  }

  patch(table, id, data) {
    // Encontrar o índice da linha que desejamos atualizar
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      // Atualizar apenas as propriedades que estão sendo passadas
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex], // Mantenha os dados existentes
        ...data, // Sobrescreva com os novos dados
      };
      this.#persist();
    } else {
      throw new Error(
        `Registro com ID ${id} não encontrado na tabela ${table}.`
      );
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}
