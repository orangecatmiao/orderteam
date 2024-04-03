import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsOnTypePipe, NoSecondPipe, NoTimePipe, GenderPipe, WeekPipe, ShowWeekPipe, LannamePipe } from './pipe1';


@NgModule({
  declarations: [ IsOnTypePipe, NoSecondPipe, NoTimePipe, GenderPipe,  WeekPipe, ShowWeekPipe,LannamePipe],
  imports: [
    CommonModule
  ],
  exports:      [ 
    IsOnTypePipe, NoSecondPipe, NoTimePipe, GenderPipe,WeekPipe, ShowWeekPipe,LannamePipe
  
  ],
})
export class PipeModule { }
