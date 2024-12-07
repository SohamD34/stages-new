import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StagesController } from './stages.controller';
import { StagesService } from './stages.service';
import { Stage, StageSchema } from './stage.schema';  // Import the schema
import { AuthModule } from '../auth/auth.module';  // Import AuthModule
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: 'accessSecret', // Use the same secret as in AuthModule
      signOptions: { expiresIn: '1h' }, // 1 hour expiry for access token
    }),
    MongooseModule.forFeature([{ name: Stage.name, schema: StageSchema }]),  // Register the schema here
  ],
  controllers: [StagesController],
  providers: [StagesService],
  exports: [StagesService],
})
export class StagesModule {}
