import { Query } from "@tilework/opus";

export const categoriesQuery = new Query("categories", true).addFieldList(["name"]);
