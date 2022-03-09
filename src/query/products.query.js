import { Field, Query } from "@tilework/opus";

export const productsQuery = new Query("category", true)
            .addField(new Field("products", true)
                .addFieldList(["id", "brand", "name", "description", "category", "gallery", "inStock"])
                .addField(new Field("prices", true)
                    .addFieldList(["amount"])
                    .addField(new Field("currency", true)
                        .addFieldList(["label", "symbol"])
                     )
                )
                .addField(new Field("attributes", true)
                    .addFieldList(["id", "name", "type"])
                    .addField(new Field("items", true)
                        .addFieldList(["id", "value"])
                    )
                )
            );
