import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";
import { CustomConfigModule } from "@config/config.module";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [CustomConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('MONGO_URI'),
                dbName: configService.get('MONGO_DB_NAME'),
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {
    static forFeature(models: ModelDefinition[]) {
        return MongooseModule.forFeature(models);
    }
}