import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reminder } from "./Reminder";

@Entity()
export class Link
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(()=> Reminder, reminder=> reminder.links)
    reminder: Reminder;
}