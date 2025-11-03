import toJSON from "../utils/json";
import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { OrderStatus } from "@thomas-ticketx/common";

// Document interface = what exists after saving in Mongo
// An interface that describes the properties that a Order Document has
export interface OrderInterface extends Document {
    // Base order info
    expiresAt: Date; 
    status: OrderStatus;
    userId: Types.ObjectId; 
    ticket: Types.ObjectId;

    createdAt: string; 
    updatedAt: string; 
}

// Attributes interface = what you must provide to create a order
export interface OrderAttrs {
    expiresAt: Date; 
    status: OrderStatus;
    userId: Types.ObjectId; 
    ticket: Types.ObjectId;
}

// Model interface = adds a build method that uses OrderAttrs
// An interface that describes the properties that are required to create a new Order
export interface OrderModel extends Model<OrderInterface> {
    build(attrs: OrderAttrs): OrderInterface;
}

// Define the Order document Schema
const orderSchema : Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId, 
            required: true, 
            trim: true
        }, 
        expiresAt: {
            type: Schema.Types.Date, 
            required: true, 
            trim: true
        },
        status: {
            type: String,
            enum: OrderStatus, 
            default: OrderStatus.Created,
            required: true, 
            trim: true
        }, 
        ticket: {
            type: Schema.Types.ObjectId,
            ref: "Ticket",
            required: true
        }
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
toJSON(orderSchema);

// Add  custom static "build" method
orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
}

// Now when we call the Order constructor it already has typescript validation
const Order = mongoose.model<OrderInterface, OrderModel>('Order', orderSchema)

export default Order