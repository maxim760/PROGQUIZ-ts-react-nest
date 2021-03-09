require('dotenv').config();
import { Strategy } from 'passport-vkontakte';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VkontakteStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.VK_ID,
      clientSecret: process.env.VK_KEY,
      callbackURL: process.env.VK_CALLBACK_URL,
    });
  }

  async validate(payload: any) {
    return payload
  }
}
