import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../db/entities/user.entity";
import { Connection, In, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { SlackClientService } from "./slack-client.service";
import { ProfileEntity } from "../../db/entities/profile.entity";

@Injectable()
export class UserService {
  
  constructor(
    @InjectConnection()
    private readonly _db: Connection,
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
    private readonly _slackClient: SlackClientService,
  ) {}

  public async saveUser(userData: any) {
    const slack_id = userData.id;
    userData.slack_id = slack_id;
    delete userData.id;
    console.log(slack_id);
    const dbUser = await this._userRepo.findOne({
      where: {
        slack_id
      },
    });
    return await this._db.transaction(async (em) => {
      if (dbUser) {
        await em.update(UserEntity, {slack_id}, userData);
        await em.update(ProfileEntity, {id: dbUser.profile.id}, userData.profile);
      } else {
        await em.save(UserEntity, userData);
      }
    });
  }
  
  async syncUsers() {
    const fromSlackEntities = await this._getSlackUsers();
    const slackIds = fromSlackEntities.map((x) => x.slack_id);
    const dbEntities = await this._userRepo.find({
      where: {
        slack_id: In(slackIds),
      },
    });
    return await this._db.transaction(async (em) => {
      const updates = [];
      const saves = [];
      fromSlackEntities.forEach(slack => {
        const updateCandidate = dbEntities.find((db) => slack.slack_id === db.slack_id);
        if (updateCandidate) {
          updates.push(slack);
        } else {
          saves.push(slack);
        }
      });
      for (const u of updates) {
        await em.update(UserEntity, {slack_id: u.slack_id}, u);
        await em.update(ProfileEntity, {id: u.profile.id}, u.profile);
      }
      return await em.save(UserEntity, saves);
    });
  };

  
  async getUsers() {
    return await this._userRepo.find();
  }
  
  private async _getSlackUsers() {
    const users = await this._slackClient.users.list();
    // @ts-ignore
    return users.members.map(x => {
      const object = { ...x, slack_id: x.id };
      delete object.id;
      return plainToClass(UserEntity, object);
    });
  }
}
