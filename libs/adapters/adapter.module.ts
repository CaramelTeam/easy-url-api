import { Module } from "@nestjs/common";
import { AdaptersKey } from "./keys.adapters";
import { BcryptAdapter } from "./bcrypt/bcrypt.adapter";

@Module({
    controllers: [],
    providers: [
        {
            provide: AdaptersKey.BCRYPT_KEY,
            useClass: BcryptAdapter
        }
    ],
    exports: [
        AdaptersKey.BCRYPT_KEY
    ]

})
export class AdapterModule { }