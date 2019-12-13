import { Notification } from "../entities/Notification";
import { Resolver, Query, Mutation, Arg, PubSub, Publisher, Subscription, Root } from "type-graphql";

const NOTIFICATION_SUB = 'NOTIFICATION_SUB';

@Resolver(of => Notification)
export class NotificationResolver {

    // GraphQL needs at least one query
    @Query(returns => String)
    serverStatus(): Promise<String> {
        return Promise.resolve('ok');
    }

    @Mutation(returns => Boolean)
    async createNotification(@PubSub(NOTIFICATION_SUB) publish: Publisher<Notification>, @Arg("title", { nullable: true }) title?: string, @Arg("message", { nullable: true }) message?: string): Promise<boolean> {
        await publish({ title, message, date: new Date() });
        return true;
    }

    @Subscription({ topics: NOTIFICATION_SUB })
    subscribeToNotifications(@Root() { title, message, date }: Notification): Notification {
        return { title, message, date };
    }
}
