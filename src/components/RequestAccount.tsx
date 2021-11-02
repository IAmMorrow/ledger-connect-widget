import { RequestHandlerProps, Resolver } from "./RequestHandler";

export function RequestAccount({ request }: RequestHandlerProps) {
    return (
        <div>{request.type}</div>
    )
}