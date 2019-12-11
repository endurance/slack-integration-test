import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";

@Entity('slack_profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;
  
  @Column({ nullable: true})
  @Expose()
  title: string;
  
  @Column({ nullable: true})
  @Expose()
  phone: string;
  
  @Column({ nullable: true})
  @Expose()
  skype: string;
  
  @Column({ nullable: true})
  @Expose()
  real_name: string;
  
  @Column({ nullable: true})
  @Expose()
  real_name_normalized: string;
  
  @Column({ nullable: true})
  @Expose()
  display_name: string;
  
  @Column({ nullable: true})
  @Expose()
  display_name_normalized: string;
  
  @Column({ nullable: true})
  @Expose()
  fields: string;
  
  @Column({ nullable: true})
  @Expose()
  status_text: string;
  
  @Column({ nullable: true})
  @Expose()
  status_emoji: string;
  
  @Column({ nullable: true})
  @Expose()
  status_expiration: number;
  
  @Column({ nullable: true})
  @Expose()
  avatar_hash: string;
  
  @Column({ nullable: true})
  @Expose()
  always_active: boolean;
  
  @Column({ nullable: true})
  @Expose()
  first_name: string;
  
  @Column({ nullable: true})
  @Expose()
  last_name: string;
  
  @Column({ nullable: true })
  @Expose()
  image_original: string;
  
  @Column({ nullable: true })
  @Expose()
  bot_id: string;
  
  @Column({ nullable: true })
  @Expose()
  is_custom_image: boolean;
  
  @Column({ nullable: true})
  @Expose()
  image_24: string;
  
  @Column({ nullable: true})
  @Expose()
  image_32: string;
  
  @Column({ nullable: true})
  @Expose()
  image_48: string;
  
  @Column({ nullable: true})
  @Expose()
  image_72: string;
  
  @Column({ nullable: true})
  @Expose()
  image_192: string;
  
  @Column({ nullable: true})
  @Expose()
  image_512: string;
  
  @Column({ nullable: true})
  @Expose()
  image_1024: string;
  
  @Column({ nullable: true})
  @Expose()
  status_text_canonical: string;
  
  @Column({ nullable: true})
  @Expose()
  team: string;
  
  @Column({ nullable: true })
  @Expose()
  api_app_id: string;
}
