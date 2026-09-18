import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import {
  Model,
  IMongoloquentSchema,
  IMongoloquentTimestamps,
} from "@mongoloquent/core";
import { ObjectId } from "mongodb";

interface IWishlist extends IMongoloquentSchema, IMongoloquentTimestamps {
  userId: ObjectId
  productId: ObjectId
}

export default class Wishlist extends Model<IWishlist> {
  public static $schema: IWishlist;
  public $collection: string = "wishlists";
}
