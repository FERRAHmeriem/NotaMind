import { v } from "convex/values";
import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";


export const ingest = action({
  args: {
    textSplit: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx , args) => {
    await ConvexVectorStore.fromTexts(
      args.textSplit,
      args.fileId,
     new GoogleGenerativeAIEmbeddings({
        apiKey:'AIzaSyCh1_JEkRO-0GBjDr9bXOEQmihaOEONLt4',
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
     }),
      { ctx }
    );
    return "Document ingested successfully";
  },
});


export const Search = action({
  args: {
    query: v.string(),
    fileId : v.string(),
  },
 handler: async (ctx, args) => {
  const vectorStore = new ConvexVectorStore(
    new GoogleGenerativeAIEmbeddings({
      apiKey: 'AIzaSyCh1_JEkRO-0GBjDr9bXOEQmihaOEONLt4',
      model: "text-embedding-004",
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
    }),
    { ctx }
  );

  const results = await vectorStore.similaritySearch(args.query, 5); 
  const filtered = results.filter(
  (doc) => Object.values(doc.metadata).join('') === args.fileId
);

  return JSON.stringify(filtered);
}
});
