import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Sport {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;


    @Column()
    allowedGender: 'male'|'female'|'mix';
}