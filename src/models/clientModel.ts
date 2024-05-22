import mongoose from "mongoose";
import { userSchema } from "./userModel";


const clientSchema = userSchema.clone();

clientSchema.add({
    appointment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
})

const ClientModel = mongoose.model("Client", clientSchema);
export default ClientModel;