import { mutation } from "./_generated/server";
import { v } from "convex/values";
export const  createUser = mutation({
    args:{
        email: v.string(),
        userName: v.string(),
        imageUrl: v.string(),
    } ,
    handler: async(ctx , args) => {
        //if user exists , return it
        const user = await ctx.db.query("users")
        .filter((q) => q.eq(q.field("email"), args.email))
        .collect();
        // if user does not exist, create it and return it
        if(user?.length === 0){
             await ctx.db.insert("users", {
                userName: args.userName,
                email: args.email,
                imgUrl: args.imageUrl,
            });
            return 'inserting new user';
        }
        return 'user already exists';
    },
})