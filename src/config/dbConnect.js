import mongoose, {mongo} from "mongoose";

async function conectaBanco() {
    mongoose.connect(process.env.db_connection);
    return mongoose.connection;
};

export default conectaBanco;
