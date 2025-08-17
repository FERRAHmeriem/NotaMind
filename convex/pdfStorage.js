import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const  addFile = mutation({
    args:{
        pdfId: v.string(),
        storageId: v.string(),
        createdBy: v.string(),
        fileName: v.string(),
        fileUrl: v.string()
    } ,
    handler: async(ctx , args) => {
             await ctx.db.insert("PdfStorage", {
                pdfId: args.pdfId,
                storageId: args.storageId,
                createdBy: args.createdBy,
                fileName: args.fileName,
                fileUrl : args.fileUrl
              });
            return 'inserting new PDF file';
        }
    })

export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const getFile = query({
  args: {
    pdfId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("PdfStorage")
      .filter((q) => q.eq(q.field("pdfId"), args.pdfId))
      .first();
  },
});


export const getUserFiles = query({
  args: {
    email : v.string(),
  }, 
  handler: async (ctx, args) => {
    const result =  await ctx.db
      .query("PdfStorage")
      .filter((q) => q.eq(q.field("createdBy"), args.email))
      .collect();
      
  return result
  },
});