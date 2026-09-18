import { ZodError } from "zod";
import { ErrorHandler } from "./errorHandler";

export function CustomError(err: unknown ) {
    let status = 500
    let message = "ISE"

    if(err instanceof ZodError) {
        const issues = err.issues
        const messages: string[] = []

        issues.forEach(issue => {
          const message = `${issue.path}: ${issue.message}` 
          messages.push(message)
        })

        status = 400
        message = messages.join("; ")
    } else if (err instanceof ErrorHandler) {
      status = err.status
      message = err.message
    } 

    return {status, message}
}
