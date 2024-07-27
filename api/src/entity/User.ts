import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reminder } from "./Reminder";

@Entity()
export class User
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    profilePicture: string;

    @OneToMany(()=> Reminder, reminder=> reminder.user)
    reminders: Reminder[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}