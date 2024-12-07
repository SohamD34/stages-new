import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like, LikeSchema } from './likes.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { StagesModule } from 'src/stages/stages.module';
import { Stage, StageSchema } from 'src/stages/stage.schema'; // Import Stage schema

@Module({
  imports: [
    AuthModule,
    StagesModule,
    JwtModule.register({
      secret: 'accessSecret', // Use the same secret as in AuthModule
      signOptions: { expiresIn: '1h' }, // 1 hour expiry for access token
    }),
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: Stage.name, schema: StageSchema }, // Register Stage schema
    ]),
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}