import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('slack_profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ nullable: true})
  title: string;
  
  @Column({ nullable: true})
  phone: string;
  
  @Column({ nullable: true})
  skype: string;
  
  @Column({ nullable: true})
  real_name: string;
  
  @Column({ nullable: true})
  real_name_normalized: string;
  
  @Column({ nullable: true})
  display_name: string;
  
  @Column({ nullable: true})
  display_name_normalized: string;
  
  @Column({ nullable: true})
  fields: string;
  
  @Column({ nullable: true})
  status_text: string;
  
  @Column({ nullable: true})
  status_emoji: string;
  
  @Column({ nullable: true})
  status_expiration: number;
  
  @Column({ nullable: true})
  avatar_hash: string;
  
  @Column({ nullable: true})
  always_active: boolean;
  
  @Column({ nullable: true})
  first_name: string;
  
  @Column({ nullable: true})
  last_name: string;
  
  @Column({ nullable: true })
  image_original: string;
  
  @Column({ nullable: true })
  bot_id: string;
  
  @Column({ nullable: true })
  is_custom_image: boolean;
  
  @Column({ nullable: true})
  image_24: string;
  
  @Column({ nullable: true})
  image_32: string;
  
  @Column({ nullable: true})
  image_48: string;
  
  @Column({ nullable: true})
  image_72: string;
  
  @Column({ nullable: true})
  image_192: string;
  
  @Column({ nullable: true})
  image_512: string;
  
  @Column({ nullable: true})
  image_1024: string;
  
  @Column({ nullable: true})
  status_text_canonical: string;
  
  @Column({ nullable: true})
  team: string;
  
  @Column({ nullable: true })
  api_app_id: string;
  
}
