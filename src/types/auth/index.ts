export type TFetchConfig = {
  method?: string
  body?: any
  token?: string
}

export type TLoginAuth = {
  username: string
  password: string
}
export type TRegisterAuth = {
  username: string
  password: string
  passwordConfirm?: string
}

export type TUser = {
  address: string | null
  avatar: string
  banned_at: string | null
  birthday: string
  display_name: string
  email: string
  email_verified_at: string
  first_change_password_at: string
  first_updated_at: string
  fullname: string
  gender: number
  id: string
  id_address: string
  id_date: string
  id_no: string
  phone: string
  upload_file_at: string
  username: string
  username_updated_at: string
}
