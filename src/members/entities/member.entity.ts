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
    
    @Column({ type: 'date' })
    birthDate: string;
    
    @Column({ type: 'date' })
    subscriptionDate: string;

    @ManyToOne(()=> Member, (member) => member.familyMembers, {nullable: true})
    @JoinColumn({name: 'mainMemberId'})
    mainMember?: Member;

    @OneToMany(()=> Member, (member) => member.mainMember)
    familyMembers?: Member[];
}
