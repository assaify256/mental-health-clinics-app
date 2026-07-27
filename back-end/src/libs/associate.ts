import Appointment from "../models/appointment.model.ts";
import Client from "../models/client.model.ts";
import User from "../models/user.model.ts";

const associate = (cb: () => void) => {
    User.hasMany(Client);
    Client.belongsTo(User);
    Client.hasMany(Appointment, { foreignKey: "clientId"});
    Appointment.hasOne(Client);
    cb();
};

export default associate;
