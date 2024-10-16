import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() //1. ID
  user_Id: number;

  @Column({ type: 'varchar', length: 50 }) //2. First Name
  user_FirstName: string;

  @Column({ type: 'varchar', length: 2 }) //3. Middle Initial
  user_MiddleName: string;

  @Column({ type: 'varchar', length: 50 }) //4. Last Name
  user_LastName: string;

  @Column({ type: 'varchar', length: 50 }) //5.  Username
  user_Username: string;

  @Column({ type: 'varchar', length: 11 }) //6. Age
  user_Age: string;

  @Column({ type: 'varchar', length: 100 }) //7. Email
  user_Email: string;

  @Column({ type: 'varchar', length: 50 }) //8. Password
  user_Password: string;
 
  @Column({ type: 'varchar', length: 100 }) //9. Region
  user_Region: string;

}