import { Query } from "@tilework/opus";

export const productsQuery = new Query("product", true)
    .addArgument("id", "String!", "huarache-x-stussy-le")
    .addFieldList(["brand", "description", "gallery"]);
