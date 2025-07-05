import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique} from 'typeorm';
import { Member } from 'src/members/entities/member.entity';
import { Sport } from 'src/sports/entities/sport.entity';

@Entity()
@Unique(['member','sport'])
export class Subscription {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: 'group'|'private';

    @ManyToOne(()=> Member, {eager: true})
    member: Member;

    @ManyToOne(()=> Sport, {eager: true, onDelete: 'CASCADE'})
    sport: Sport;

}