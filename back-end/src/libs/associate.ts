
import Client from "../models/client.model.ts";
import User from "../models/user.model.ts";

const associate = () => {
    User.hasMany(Client);
    Client.belongsTo(User);
};

export default associate;
