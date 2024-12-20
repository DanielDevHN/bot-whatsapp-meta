import { Db } from "mongodb";
import { Flow } from "../types/flow.type";

export const loadFlowsFromDB = async (db: Db): Promise<Flow[]> => {
  const flowsCollection = db.collection<Flow>("flows");
  return await flowsCollection.find().toArray();
};
