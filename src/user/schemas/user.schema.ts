import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})
export class User {
    @Prop()
    fullname : string;
    @Prop()
    email : string;
    @Prop()
    address : string;
    @Prop()
    phoneNumber : number;
}

export const UserSchema = SchemaFactory.createForClass(User);