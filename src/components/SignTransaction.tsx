import { RequestHandlerProps, Resolver } from "./RequestHandler";

export function SignTransaction({ request }: RequestHandlerProps) {
    return (
        <div>{request.type}</div>
    )
}