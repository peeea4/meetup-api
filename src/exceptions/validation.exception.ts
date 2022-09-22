import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidationException extends HttpException {
    constructor(private info: string | Record<string, any>) {
        super(info, HttpStatus.BAD_REQUEST);
    }
}
