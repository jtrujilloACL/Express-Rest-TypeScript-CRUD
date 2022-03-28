import { DataTypes } from "sequelize";
import db from "../db/connection";


const User = db.define('user',{
    name:{  type: DataTypes.STRING},
    mail:{  type: DataTypes.STRING},
    state:{ type: DataTypes.BOOLEAN}
});

export default User;