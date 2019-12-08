import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { UserEntity } from "../../../db/entities/user.entity";
import { LoggerModule } from "../../../logger/logger.module";
import { SlackClientService } from "../slack-client-service/slack-client.service";
import { instance, mock } from "ts-mockito";
import { ProfileEntity } from "../../../db/entities/profile.entity";
import { setupTestDatabase, TestPackage } from "../../../db/test-utils/setupTestDatabase";

describe("UserService Integration Tests", () => {
  let pkg: TestPackage;
  let instanceUnderTest: UserService;
  
  beforeEach(async () => {
    pkg = await setupTestDatabase({
      imports: [
        TypeOrmModule.forFeature([UserEntity]),
        LoggerModule,
      ],
      providers: [{
        provide: SlackClientService,
        useValue: instance(mock(SlackClientService)),
      },
        UserService,
      ],
    });
    instanceUnderTest = pkg.module.get<UserService>(UserService);
  });
  
  afterEach(async () => {
    await pkg.connection.close();
  });
  
  it("should be defined", () => {
    expect(instanceUnderTest).toBeDefined();
  });
  
  describe("User methods", () => {
    beforeEach(async () => {
      // arrange - setup db to save a user
      const {connection} = pkg;
      const user = new UserEntity();
      const profile = new ProfileEntity();
      profile.first_name = "endurance";
      user.real_name = "endurance";
      user.slack_id = "SLACK";
      user.profile = profile;
      const manager = connection.createEntityManager();
      await manager.save(UserEntity, user);
    });
    
    it("should be able to get User", async () => {
      // now get the user
      const users = await instanceUnderTest.getUsers();
      // ensure its there
      expect(users[0].slack_id).toBe("SLACK");
    });
    
    it("should get user by slackId", async () => {
      // now get the user
      const user = await instanceUnderTest.findOneUserBySlackId("SLACK");
      // ensure its there
      expect(user.real_name).toBe("endurance");
    });
    
    it("should save an existing user,and result in an update", async () => {
      const user = await instanceUnderTest.findOneUserBySlackId("SLACK");
      user.profile.always_active = true;
      // @ts-ignore
      user.id = "SLACK";
      const u = await instanceUnderTest.saveRawUser(user);
      const em = await pkg.connection.createEntityManager();
      const totalUsers = await em.count(UserEntity);
      const totalProfiles = await em.count(ProfileEntity);
      // ensure profile updated
      expect(u.profile.always_active).toBe(true);
      // ensure no new insert occurred.
      expect(totalUsers).toBe(1);
      expect(totalProfiles).toBe(1);
    });
  });
});
