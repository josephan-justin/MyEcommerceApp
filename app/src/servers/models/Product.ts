import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import {
  Model,
  IMongoloquentSchema,
  IMongoloquentTimestamps,
} from "@mongoloquent/core";

interface IProduct extends IMongoloquentSchema, IMongoloquentTimestamps {
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
}

export default class Product extends Model<IProduct> {
  public static $schema: IProduct;
  public $collection: string = "products";
}
