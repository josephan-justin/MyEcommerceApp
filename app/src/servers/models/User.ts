import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import {
  Model,
  IMongoloquentSchema,
  IMongoloquentTimestamps,
} from "@mongoloquent/core";
import * as z from "zod";

interface IUser extends IMongoloquentSchema, IMongoloquentTimestamps {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const userSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(5).max(15)
})

export default class User extends Model<IUser> {
  public static $schema: IUser;
  public $collection: string = "users";
}
