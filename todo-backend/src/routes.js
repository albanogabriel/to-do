import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

//csv-transform
import formidable from "formidable";
import { createReadStream } from "node:fs";
import { parse } from "csv-parse";

// {
//   id: string
//   title: string
//   description: string
//   completed_at: string
//   created_at: string
//   updated_at: string
// }

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title) {
        return res.writeHead(400).end("Título e descrição são obrigatórios");
      }

      const task = {
        id: randomUUID(),
        title,
        description: "",
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      database.insert("tasks", task);

      // Retornar o objeto da tarefa criada com um código de status 201
      return res
        .writeHead(201, { "Content-Type": "application/json" })
        .end(JSON.stringify(task));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description, completed_at, created_at } = req.body;

      if (!id) {
        return res.writeHead(400).end("Id não existe");
      }

      database.update("tasks", id, {
        title,
        description,
        completed_at,
        created_at,
        updated_at: new Date().toISOString(),
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/toggle-completed"),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.select("tasks").find((task) => task.id === id);

      if (!task) {
        return res.writeHead(404).end("Tarefa não encontrada");
      }

      // Atualizar o campo completed_at
      database.patch("tasks", id, {
        completed_at: task.completed_at ? null : new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      // Retornar uma resposta indicando sucesso
      return res.writeHead(200).end("Status da tarefa atualizado com sucesso");
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
];
