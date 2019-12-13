import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("NotificationInput")
export class Notification {

    @Field({ nullable: true })
    title: string;

    @Field({ nullable: true })
    message: string;

    @Field({ nullable: true })
    date: Date;
}
