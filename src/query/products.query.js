import { Field, Query } from "@tilework/opus";

export const productsQuery = new Query("category", true)
            .addField(new Field("products", true)
                .addFieldList(["id", "brand", "name", "description", "gallery"])
            );
