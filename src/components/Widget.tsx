import { RPC } from "@mixer/postmessage-rpc";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { InfiniteLoader } from "@ledgerhq/react-ui";
import { RequestHandler, WidgetRequest } from "./RequestHandler";

const WidgetContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export function Widget() {
    const [isReady, setReady] = useState(false);
    const [request, setRequest] = useState<WidgetRequest | null>(null);

    useEffect(() => {
        const rpc = new RPC({
            target: window.opener || window.parent,
            serviceId: "ledger-widget"
        })

        rpc.expose("requestAccount", () => {
            console.log("requestAccount")
            return new Promise((resolve, reject) => {
                setRequest({
                    type: "requestAccount",
                    resolver: {
                        resolve,
                        reject
                    }
                });
            })
        })

        rpc.expose("signTransaction", (params) => {
            return new Promise((resolve, reject) => {
                setRequest({
                    type: "signTransaction",
                    resolver: {
                        resolve,
                        reject
                    }
                });
            })
        })

        rpc.call("ready", {}).then(() => setReady(true));
        return () => {
            rpc
        }
    })

    return (
        <WidgetContainer>
            {isReady && request ? <RequestHandler request={request} /> : <InfiniteLoader />}
        </WidgetContainer>
    )
}