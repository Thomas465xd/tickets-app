import toJSON from "../utils/json";
import mongoose, { Schema, Document, Model, Types } from "mongoose";
import Order from "./Order";
import { OrderStatus, RequestConflictError } from "@thomas-ticketx/common";

// Document interface = what exists after saving in Mongo
// An interface that describes the properties that a Ticket Document has
export interface TicketInterface extends Document {
    // Base ticket info
    title: string;
    price: number;

    // Returns a Promise that will be either true or false
    isReserved(): Promise<boolean>

    createdAt: string; 
    updatedAt: string; 
}

// Attributes interface = what you must provide to create a ticket
export interface TicketAttrs {
    title: string; 
    price: number; 
}

// Model interface = adds a build method that uses TicketAttrs
// An interface that describes the properties that are required to create a new Ticket
export interface TicketModel extends Model<TicketInterface> {
    build(attrs: TicketAttrs): TicketInterface;
}

// Define the Ticket document Schema
const ticketSchema : Schema = new Schema(
    {
        title: {
            type: String, 
            required: true, 
            trim: true, 
        }, 
        price: {
            type: Number, 
            required: true, 
            trim: true
        }, 
    }, 
    {
        timestamps: true,
        // toJSON: {
        //     transform(doc, ret) {
        //         (ret as any).id = ret._id;
        //         delete ret._id;
        //         delete ret.password;
        //         delete ret.__v;
        //     },
        // },
    }
);

// Use the toJSON function from json.ts file
toJSON(ticketSchema);

// Add  custom static "build" method
ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
}

// Add  custom static "build" method
ticketSchema.methods.isReserved = async function() {
    const order = await Order.findOne({
        ticket: this._id, // Use this._id NOT this.id
        status: {
            $in: [
                OrderStatus.Created, 
                OrderStatus.AwaitingPayment, 
                OrderStatus.Complete
            ]
        }
    })

    //? "!!" if order is null then it will be transformed 
    //? to true by the first exclamation (!) to then flip back to false 
    //? with the second exclamation (!!). A double NOT operation.
    return !!order 

    //? Example: No orders were found matching critera (orders = null)
    //? so !order = true !!order = NOT true = false, so "isReserved" will return false.
}



// Now when we call the Ticket constructor it already has typescript validation
const Ticket = mongoose.model<TicketInterface, TicketModel>('Ticket', ticketSchema)

export default Ticket