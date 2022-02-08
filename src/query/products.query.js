import { Field, Query } from "@tilework/opus";

export const productsQuery = new Query("category", true)
            .addField(new Field("products", true)
                .addFieldList(["id", "brand", "name", "description", "gallery"])
                .addField(new Field("prices", true)
                    .addFieldList(["amount"])
                    .addField(new Field("currency", true)
                        .addFieldList(["label", "symbol"])
                     )

                )
            );
