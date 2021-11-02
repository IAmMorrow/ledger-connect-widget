import { RequestAccount } from "./RequestAccount";
import { SignTransaction } from "./SignTransaction";
import Transport from "@ledgerhq/hw-transport"
import { useState } from "react";

export type Resolver = {
    resolve: (result: any) => void,
    reject: (error: any) => void
}

export type WidgetRequest = {
    type: "requestAccount" | "signTransaction",
    params?: Object,
    resolver: Resolver,
}

export type RequestHandlerProps = {
    request: WidgetRequest,
};

export type DeviceConnection = {
    transport: Transport,
    type: "BLE" | "USB",
};

const requestHandlers = {
    "requestAccount": RequestAccount,
    "signTransaction": SignTransaction
}

export function RequestHandler({ request }: RequestHandlerProps) {
    const [deviceConnection, setDeviceSonnection] = useState<DeviceConnection | null>(null);

    const Handler = requestHandlers[request.type];
    return (
        <Handler request={request} />
    )
}
