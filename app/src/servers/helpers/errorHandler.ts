
export class ErrorHandler extends Error {
  public status: number = 500

  constructor(message: string, status: number)  {
    super(message)
    this.status = status
  }
}

export class NotFoundError extends ErrorHandler {
  constructor(message: string)  {
    super(message, 404)
  }
}

export class BadRequestError extends ErrorHandler {
  constructor(message: string)  {
    super(message, 400)
  }
}

export class UnauthorizedError extends ErrorHandler {
  constructor(message: string)  {
    super(message, 401)
  }
}

export class ForbiddenError extends ErrorHandler {
  constructor(message: string)  {
    super(message, 403)
  }
}
