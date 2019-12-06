import { Column, Entity } from "typeorm";

@Entity("slack_users")
export class UserEntity {
  @Column({primary: true, update: false, generated: "increment"})
  id: number;
  
  @Column()
  slack_id: string;
  
  @Column({nullable: true})
  name: string;
  
  @Column({nullable: true})
  real_name: string;
}
