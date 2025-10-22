import toJSON from "../utils/json";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

// Document interface = what exists after saving in Mongo
// An interface that describes the properties that a Ticket Document has
export interface TicketInterface extends Document {
    // Base ticket info
    title: string;
    description: string; 
    date: string;
    price: number;
    userId: Types.ObjectId; 

    createdAt: string; 
    updatedAt: string; 
}

// Attributes interface = what you must provide to create a ticket
export interface TicketAttrs {
    title: string; 
    description: string; 
    date: string;
    price: number; 
    userId: Types.ObjectId;
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
        description: {
            type: String, 
            required: true, 
            trim: true
        },
        date: {
            type: String, 
            required: true, 
            trim: true
        },
        price: {
            type: Number, 
            required: true, 
            trim: true
        }, 
        userId: {
            type: Schema.Types.ObjectId, 
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

// Now when we call the Ticket constructor it already has typescript validation
const Ticket = mongoose.model<TicketInterface, TicketModel>('Ticket', ticketSchema)

export default Ticket