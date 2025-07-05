import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, } from 'typeorm';

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column()
    gender: 'male' | 'female';
    
    @Column({ type: 'date'})
    birthDate: string;
    
    // Column to store the date when the member subscribed to the club
    @Column({ type: 'date', nullable: true })
    subscriptionDate: string;

    @ManyToOne(()=> Member, (member) => member.familyMembers, {nullable: true, onDelete: 'SET NULL'})
    @JoinColumn({name: 'mainMemberId'})
    mainMember?: Member;

    @OneToMany(()=> Member, (member) => member.mainMember, {nullable:true ,cascade: true})
    familyMembers?: Member[];
}
