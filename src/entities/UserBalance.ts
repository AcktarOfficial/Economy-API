import { Entity, PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

@Entity()
export class UserBalance {
  @PrimaryKey()
  _id!: ObjectId;  // Works for MongoDB

  @SerializedPrimaryKey()
  id!: string;

  @Property({ unique: true })
  userId!: string;

  @Property({ default: 0 })
  balance!: number;
}
