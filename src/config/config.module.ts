import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { envsSchema } from "./envs";


@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: envsSchema,
        })
    ],
    providers: [ConfigService],
    exports: [ConfigService]
})

export class CustomConfigModule { }