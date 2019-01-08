const kintone = (window as any).kintone;

import { createKintoneClient } from "./kintone";
import { createGetFields } from "./getFields";

const kintoneClient = createKintoneClient(kintone);
export const getFields = createGetFields(kintoneClient, kintone.Promise);
