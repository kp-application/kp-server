import { Module } from "@nestjs/common";

import { EventGateway } from "src/events/event.gateway";

@Module({
    providers: [EventGateway],
    exports: [EventGateway],
})
export class EventModule {}
