import { hashSync, compareSync } from "bcrypt";
import { BcryptAdapterInterface } from "./bcrypt.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptAdapter implements BcryptAdapterInterface {
    constructor() { }
    compare(value: string, hash: string): boolean {
        return false;
    }

    encryptString(value: string): string {
        return hashSync(value, 10);
    }
}