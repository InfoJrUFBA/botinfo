/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, getCustomRepository, EntityRepository, Repository } from 'typeorm'
import { StatusTime } from './StatusTime'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id

  @Column('varchar', { unique: true })
  discord_id

  @Column('varchar')
  name

  @Column('varchar', { nullable: true })
  bio

  @Column('varchar', { nullable: true })
  curso

  @CreateDateColumn()
  createdDate

  @UpdateDateColumn()
  updatedDate

  @OneToMany(type => StatusTime, statustime => statustime.user)
  statustime
}

@EntityRepository(User)
export class UserRepository extends Repository {
  async saveOrGet (user) {
    try {
      const saved = await this.save(user)
      return saved
    } catch (err) {
      const { discord_id } = user
      // await this.update({ discord_id }, rest)
      const geted = await this.findOne({ discord_id })
      return geted
    }
  }
}

export function UserRep () {
  return getCustomRepository(UserRepository)
}
