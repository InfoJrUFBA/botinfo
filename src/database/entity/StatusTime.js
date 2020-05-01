import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, getCustomRepository, EntityRepository, Repository } from 'typeorm'
import { User } from './User'

@Entity()
export class StatusTime {
  @PrimaryGeneratedColumn()
  id

  @Column('timestamp')
  start

  @Column('timestamp', { nullable: true })
  end

  @Column('varchar')
  status

  @CreateDateColumn()
  createdDate

  @UpdateDateColumn()
  updatedDate

  @ManyToOne(type => User, user => user.statustime)
  user
}

@EntityRepository(StatusTime)
export class StatusTimeRepository extends Repository {

}

export function StatusTimeRep () {
  return getCustomRepository(StatusTimeRepository)
}
