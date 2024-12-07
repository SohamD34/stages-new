import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StagesModule } from './stages/stages.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
// import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { RepostsModule } from './reposts/reposts.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),  // If you are using environment variables
    MongooseModule.forRoot('mongodb+srv://SohamD:Soham34@cluster0.wl8as.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),  // MongoDB connection URI
    StagesModule, 
    CommentsModule, LikesModule, RepostsModule, NotificationsModule,
  ],
})
export class AppModule {}
