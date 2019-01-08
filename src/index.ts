import { createKintoneClient, KintoneObject } from "./kintone";
import { createGetFields } from "./getFields";

function kintoneApi() {
  return Promise.resolve();
}
kintoneApi.url = (url: string) => url;

// dummy kintone object
export const dummyKintone: KintoneObject = {
  api: kintoneApi,
  app: {
    getId() {
      return 1;
    }
  }
};

const kintoneClient = createKintoneClient(dummyKintone);

export const getFields = createGetFields(kintoneClient, Promise);
