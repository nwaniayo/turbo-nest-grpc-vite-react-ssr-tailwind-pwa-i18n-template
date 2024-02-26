import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  primaryEmailAddress: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName?: string | undefined;

  @Column()
  lastName: string;

  @Column()
  passwordHash: string;

  @Column()
  backupEmailAddress: string;

  @Column("json", { nullable: true })
  phone: object | null;

  @Column({ default: false })
  isPrimaryEmailAddressVerified: boolean;

  @Column({ default: false })
  isBackupEmailAddressVerified: boolean;
}