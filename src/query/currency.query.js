import { Query } from "@tilework/opus";

export const currenciesQuery = new Query("currencies", true).addFieldList(["label", "symbol"]);