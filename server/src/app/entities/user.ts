import { UserMetadata } from './user-metadata'
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Base from './base'

@Entity()
export class User extends Base {
    @PrimaryGeneratedColumn('uuid') id: string
    @Column() email: string
    @Column() password: string
    @CreateDateColumn() created
    @UpdateDateColumn() updated

    @OneToOne(() => UserMetadata, metadata => metadata.user, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    metadata: UserMetadata

    toJSON() {
        return this.omit('password')
    }
}
