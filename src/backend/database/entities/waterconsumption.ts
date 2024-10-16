import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'waterconsumptions',
})
export class WaterConsumption extends BaseEntity {
  @PrimaryGeneratedColumn() //1. ID
  user_Id: number;

  @Column({ type: 'varchar', length: 50 }) //2. First Name
  showerConsump: string;

  @Column({ type: 'varchar', length: 2 }) //3. Middle Initial
  showerConsump: string;

  @Column({ type: 'varchar', length: 50 }) //4. Last Name
  showerConsump: string;

  @Column({ type: 'varchar', length: 50 }) //5.  Username
  showerConsump: string;

  @Column({ type: 'varchar', length: 100 }) //6. Email
  showerConsump: string;

  @Column({ type: 'varchar', length: 50 }) //7. Password
  user_Password: string;
 
  @Column({ type: 'varchar', length: 100 }) //8. Region
  user_Region: string;

  @Column({ type: 'varchar', length: 100 }) //8. Region
  user_Region: string;

  @Column({ type: 'varchar', length: 100 }) //8. Region
  user_Region: string;

  @Column({ type: 'varchar', length: 100 }) //8. Region
  user_Region: string;
}