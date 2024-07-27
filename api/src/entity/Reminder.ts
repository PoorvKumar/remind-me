import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Tag } from "./Tag";

@Entity()
export class Reminder
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column("simple-array")
    links: string[];

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

    @ManyToMany(()=> Tag, tag=> tag.reminders)
    tags: Tag[];

    @Column({ nullable: true })
    recurrence: string;
}
