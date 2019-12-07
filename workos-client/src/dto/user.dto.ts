import { ProfileDTO } from "./profile.dto";

export class UserDTO {
  id!: number;
  slack_id!: string;
  team_id!: string;
  name!: string;
  deleted!: boolean;
  color!: string;
  real_name!: string;
  tz!: string;
  tz_label!: string;
  tz_offset!: number;
  is_admin!: boolean;
  is_owner!: boolean;
  is_primary_owner!: boolean;
  is_restricted!: boolean;
  is_ultra_restricted!: boolean;
  is_bot!: boolean;
  is_app_user!: boolean;
  updated!: number;
  has_2fa!: boolean;
  locale!: boolean;
  profile_id!: number;
  profile!: ProfileDTO;
}
