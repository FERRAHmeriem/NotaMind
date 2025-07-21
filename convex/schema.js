import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// @snippet start schema
export default defineSchema({
    users: defineTable({
        userName: v.string(),
        email: v.string(),
        imgUrl: v.string(),
  }),
  PdfStorage: defineTable({
        pdfId: v.string(),
        storageId: v.string(),
        createdBy: v.string(),
        fileName: v.string(),
        fileUrl: v.string()
  }),
   documents: defineTable({
    embedding: v.array(v.number()),
    text: v.string(),
    metadata: v.any(),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 768,
  }),
});