/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, getCustomRepository, EntityRepository, Repository } from 'typeorm'
import { StatusTime } from './StatusTime'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id

  @Column('varchar', { unique: true })
  discord_id

  @Column('varchar', { nullable: true })
  gitlab

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

  @OneToMany(type => StatusTime, statustime => statustime.user, {cascade: true})
  statustime
}

@EntityRepository(User)
export class UserRepository extends Repository {
  async saveOrGet (user) {
    try {
      const saved = await this.save(user)
      return saved
    } catch (err) {
      const {discord_id} = user
      //await this.update({gitlab})
      const geted = await this.findOne({ discord_id })
      return geted;
    }
  }

  async updateAndGet(user){
    const {discord_id} = user;
    const geted = await this.findOne({discord_id});
    const saved = await this.save({...geted, ...user});
    return saved;
  }
}

export function UserRep () {
  return getCustomRepository(UserRepository)
}
