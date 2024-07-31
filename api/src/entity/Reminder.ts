import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Tag } from "./Tag";
import { Link } from "./Link";

@Entity()
export class Reminder
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: "timestamp" })
    dueDate: Date;

    @Column({
        type: "enum",
        enum: ["pending", "completed", "overdue"],
        default: "pending"
    })
    status: string;

    @ManyToOne(()=> User, user=> user.reminders)
    user: User;

    @OneToMany(()=> Link, link=> link.reminder)
    links: Link[];

    @ManyToMany(()=> Tag, tag=> tag.reminders)
    @JoinTable()
    tags: Tag[];

    @Column({ nullable: true })
    recurrence: string;
}
