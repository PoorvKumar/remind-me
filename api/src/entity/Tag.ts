import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Reminder } from "./Reminder";

@Entity()
export class Tag
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(()=> Reminder, reminder=>reminder.tags)
    reminders: Reminder[];
}