import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../db/entities/user.entity";
import { Connection, EntityManager, In, Repository } from "typeorm";
import { Injectable, Logger } from "@nestjs/common";
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
    private readonly _logger: Logger,
  ) {}
  
  public async getUsers() {
    return await this._userRepo.find();
  }
  
  public async saveUser(userData: any) {
    const slack_id = userData.id;
    userData.slack_id = slack_id;
    delete userData.id;
    this._logger.log(`Working with Slack ID ${slack_id}`);
    const dbUser = await this._userRepo.findOne({
      where: {
        slack_id
      },
    });
    await this._db.transaction(async (em) => {
      if (dbUser) {
        this._logger.log(`Updating Slack ID ${slack_id}`);
        userData.profile.id = dbUser.profile.id;
        await this._updateUser(em,[userData]);
      } else {
        this._logger.log(`Saving for Slack ID ${slack_id}`);
        await em.save(UserEntity, userData);
      }
    });
    return await this._userRepo.findOne({
      where: {
        slack_id
      },
    });
  }
  
  public async syncUsers() {
    const fromSlackEntities = await this._getSlackUsers();
    const slackIds = fromSlackEntities.map((x) => x.slack_id);
    const dbEntities = await this._userRepo.find({
      where: {
        slack_id: In(slackIds),
      },
    });
    const updates = [];
    const saves = [];
    fromSlackEntities.forEach(slack => {
      const updateCandidate = dbEntities.find((db) => slack.slack_id === db.slack_id);
      if (updateCandidate) {
        slack.profile.id = updateCandidate.profile_id;
        updates.push(slack);
      } else {
        saves.push(slack);
      }
    });
    return await this._db.transaction(async (em) => {
      await this._updateUser(em, updates);
      return await em.save(UserEntity, saves);
    });
  };
  
  private async _updateUser(em: EntityManager, entities: UserEntity[]) {
    for (const u of entities) {
      await em.update(UserEntity, {slack_id: u.slack_id}, u);
      await em.update(ProfileEntity, {id: u.profile.id}, u.profile);
    }
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
