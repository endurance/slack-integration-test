export interface TeamDTO {
  id: string;
  name: string;
  domain: string;
  email_domain: string;
  icon: Icon;
  enterprise_id: string;
  enterprise_name: string;
}

export interface Icon {
  image_34: string;
  image_44: string;
  image_68: string;
  image_88: string;
  image_102: string;
  image_132: string;
  image_default: boolean;
}
