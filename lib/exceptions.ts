class UnauthorizedException extends Error {
    public statusCode = 401;
    
    constructor(message: string) {
      super(message);
      this.name = "UnauthorizedException";
    }
}

class ForbiddenException extends Error {
    public statusCode = 403;

    constructor(message: string) {
      super(message);
      this.name = "ForbiddenException";
    }
}

export {
    UnauthorizedException,
    ForbiddenException
}