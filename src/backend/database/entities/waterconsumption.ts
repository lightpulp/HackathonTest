import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'waterconsumptions',
})
export class WaterConsumption extends BaseEntity {
  @PrimaryGeneratedColumn() //1. ID
  user_Id: number;

  @Column({ type: 'varchar', length: 5, nullable: true }) //2. Shower  
  showerConsump: string;

  @Column({ type: 'varchar', length: 5, nullable: true }) //3. Brushing Teeth 
  brushConsump: string;

  @Column({ type: 'varchar', length: 5, nullable: true }) //4. Hand Washing  
  washhandConsump: string;

  @Column({ type: 'varchar', length: 5 }) //5.  Drinking 
  drinkingConsump: string;

  @Column({ type: 'varchar', length: 5, nullable: true }) //6. Laundry  
  laundryConsump: string;

  @Column({ type: 'varchar', length: 5, nullable: true }) //7. Washing Dishes  
  dishwashingConsump: string;
 
  @Column({ type: 'varchar', length: 5, nullable: true }) //8. Flushing 
  flushingConsump: string;

  @Column({ type: 'varchar', length: 5, nullable: true }) //9. Food & Drink preparation 
  foodprepConsump: string;

  @Column({ type: 'varchar', length: 5, nullable: true }) //10. other 
  otherConsump: string;

}