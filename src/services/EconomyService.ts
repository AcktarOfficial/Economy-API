import { EntityManager, MikroORM } from "@mikro-orm/core";
import { UserBalance } from "../entities/UserBalance";

export class EconomyService {
  private orm: MikroORM;
  private em: EntityManager;

  constructor(orm: MikroORM) {
    this.orm = orm;
    this.em = this.orm.em.fork();
  }

  async hasAccount(userId: string): Promise<boolean> {
    const user = await this.em.findOne(UserBalance, { userId });
    return user !== null;
  }
  
  async createNewAccount(userId: string, initialBalance: number = 0): Promise<UserBalance> {
    let user = await this.em.findOne(UserBalance, { userId });

    if (!user) {
      user = this.em.create(UserBalance, { userId, balance: initialBalance });
      this.em.persist(user);
      await this.em.flush();
    }

    return user;
  }

  async getMoney(userId: string): Promise<number> {
    const user = await this.em.findOne(UserBalance, { userId });
    return user ? user.balance : 0;
  }

  async addMoney(userId: string, amount: number): Promise<number> {
    let user = await this.em.findOne(UserBalance, { userId });

    if (!user) {
      throw new Error("This player account was not found in the database!");
   }

    user.balance += amount;
    await this.em.flush();
    return user.balance;
  }

  async reduceMoney(userId: string, amount: number): Promise<number> {
    const user = await this.em.findOne(UserBalance, { userId });

    if (!user || user.balance < amount) {
      throw new Error("You do not have enough money in your account to complete this transaction!");
    }

    user.balance -= amount;
    await this.em.flush();
    return user.balance;
  }

  async setMoney(userId: string, amount: number): Promise<number> {
    if (amount < 0) {
      throw new Error("Balance cannot be negative");
    }

    let user = await this.em.findOne(UserBalance, { userId });

    if (!user) {
      throw new Error("This player account was not found in the database!");
    } else {
      user.balance = amount;
      await this.em.flush();
    }

    return user.balance;
  }
}
