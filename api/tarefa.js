import { headerJson, instance, xParseSessionTokenKey } from "./config";

export async function getTarefas(sessionToken) {
  console.log("getTarefas");
  const { data } = await instance.get("/classes/Tarefa", {
    headers: { [xParseSessionTokenKey]: sessionToken },
  });
  return data?.results;
}

export async function updateTarefa({ tarefa, sessionToken }) {
  const headers = { ...headerJson, [xParseSessionTokenKey]: sessionToken };
  const { data } = await instance.put(
    `/classes/Tarefa/${tarefa.objectId}`,
    { descricao: tarefa.descricao, concluida: tarefa.concluida },
    { headers }
  );
  return data;
}

export async function addTarefa({ descricao, sessionToken }) {
  const headers = { ...headerJson, [xParseSessionTokenKey]: sessionToken };
  const { data } = await instance.post(
    `/classes/Tarefa`,
    { descricao },
    { headers }
  );
  return data;
}

export async function deleteTarefa({ tarefa, sessionToken }) {
  const { data } = await instance.delete(`/classes/Tarefa/${tarefa.objectId}`, {
    headers: { [xParseSessionTokenKey]: sessionToken },
  });
  return data;
}
