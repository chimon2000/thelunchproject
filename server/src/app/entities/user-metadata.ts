import { User } from './index'
import { OneToOne, JoinColumn, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserMetadata {
    @PrimaryGeneratedColumn('uuid') id: string

    @Column() firstName: string
    @Column() lastName: string

    @Column('json') additional

    @OneToOne(() => User, user => user.metadata)
    @JoinColumn()
    user: User
}
