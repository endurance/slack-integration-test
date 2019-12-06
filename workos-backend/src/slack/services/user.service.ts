import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../db/entities/user.entity";
import { Connection, In, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { SlackClientService } from "./slack-client.service";

@Injectable()
export class UserService {
  
  constructor(
    @InjectConnection()
    private readonly _db: Connection,
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
    private readonly _slackClient: SlackClientService,
  ) {}

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
          updates.push(updateCandidate);
        } else {
          saves.push(slack);
        }
      });
      for (const u of updates) {
        await em.update(UserEntity, {slack_id: u.slack_id}, u);
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
      const object = { slack_id: x.id, real_name: x.real_name, name: x.name };
      return plainToClass(UserEntity, object);
    });
  }
}
