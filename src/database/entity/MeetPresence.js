import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, getCustomRepository, EntityRepository, Repository, Unique } from 'typeorm'
import { User } from './User'

@Entity()
@Unique(['meet', 'user'])
export class MeetPresence {
  @PrimaryGeneratedColumn()
  id

  @Column('varchar')
  meet

  @CreateDateColumn()
  createdDate

  @UpdateDateColumn()
  updatedDate

  @ManyToOne(type => User, user => user.meetsPresence)
  user
}

@EntityRepository(MeetPresence)
export class MeetPresenceRepository extends Repository {

}

export function MeetPresenceRep () {
  return getCustomRepository(MeetPresenceRepository)
}
