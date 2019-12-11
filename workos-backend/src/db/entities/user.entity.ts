import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { Exclude, Expose, Type } from "class-transformer";

@Entity("slack_users")
export class UserEntity {
  @Column({primary: true, update: false, generated: "increment"})
  id: number;
  
  @Column()
  @Expose()
  slack_id: string;
  
  @Column({nullable: true})
  @Expose()
  team_id: string;
  
  @Column({nullable: true})
  @Expose()
  name: string;
  
  @Column({nullable: true})
  @Expose()
  deleted: boolean;
  
  @Column({nullable: true})
  @Expose()
  color: string;
  
  @Column({nullable: true})
  @Expose()
  real_name: string;
  
  @Column({nullable: true})
  @Expose()
  tz: string;
  
  @Column({nullable: true})
  @Expose()
  tz_label: string;
  
  @Column({nullable: true})
  @Expose()
  tz_offset: number;
  
  @Column({nullable: true})
  @Expose()
  is_admin: boolean;
  
  @Column({nullable: true})
  @Expose()
  is_owner: boolean;
  
  @Column({nullable: true})
  @Expose()
  is_primary_owner: boolean;
  
  @Column({nullable: true})
  @Expose()
  is_restricted: boolean;
  
  @Column({nullable: true})
  @Expose()
  is_ultra_restricted: boolean;
  
  @Column({nullable: true})
  @Expose()
  is_bot: boolean;
  
  @Column({nullable: true})
  @Expose()
  is_app_user: boolean;
  
  @Column({nullable: true})
  @Expose()
  updated: number;
  
  @Column({nullable: true})
  @Expose()
  has_2fa: boolean;
  
  @Column({nullable: true})
  @Expose()
  locale: boolean;
  
  @Exclude()
  @Column({nullable: false})
  profile_id: number;
  
  @Column({ nullable: true })
  @Expose()
  is_invited_user: boolean;
  
  @OneToOne(type => ProfileEntity, {cascade: ['insert', 'update'], eager: true})
  @JoinColumn({name: "profile_id"})
  @Expose()
  @Type(() => ProfileEntity)
  profile: ProfileEntity;
}
