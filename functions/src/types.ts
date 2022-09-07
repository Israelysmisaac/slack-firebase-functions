export interface Request {
    type: string,
    challenge: string,
    event: Record<string, string | Record<string, string>>,
    payload: string,
}
