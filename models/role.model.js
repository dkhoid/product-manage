const mongoose  =require("mongoose")

const roleSchema = new mongoose.Schema(
{
        title: String,
        description: String,
        permisions:{
            type:Array,
            default:[]
        },
        deleted:{
            type:Boolean,
            default:false
        }
    },
    {timestamps:true}
)

const Role = mongoose.model("Role",roleSchema,"role");
module.exports = Role;