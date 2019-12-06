import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { ProfileEntity } from "./profile.entity";

@Entity("slack_users")
export class UserEntity {
  @Column({primary: true, update: false, generated: "increment"})
  id: number;
  
  @Column()
  slack_id: string;
  
  @Column({ nullable: true})
  team_id: string;
  
  @Column({ nullable: true})
  name: string;
  
  @Column({ nullable: true})
  deleted: boolean;
  
  @Column({ nullable: true})
  color: string;
  
  @Column({ nullable: true})
  real_name: string;
  
  @Column({ nullable: true})
  tz: string;
  
  @Column({ nullable: true})
  tz_label: string;
  
  @Column({ nullable: true})
  tz_offset: number;
  
  @Column({ nullable: true})
  is_admin: boolean;
  
  @Column({ nullable: true})
  is_owner: boolean;
  
  @Column({ nullable: true})
  is_primary_owner: boolean;
  
  @Column({ nullable: true})
  is_restricted: boolean;
  
  @Column({ nullable: true})
  is_ultra_restricted: boolean;
  
  @Column({ nullable: true})
  is_bot: boolean;
  
  @Column({ nullable: true})
  is_app_user: boolean;
  
  @Column({ nullable: true})
  updated: number;
  
  @Column({ nullable: true})
  has_2fa: boolean;
  
  @OneToOne(type => ProfileEntity, {cascade: true, eager: true})
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;
}
