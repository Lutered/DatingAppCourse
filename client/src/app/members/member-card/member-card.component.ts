import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Member } from '../../_models/members';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'//,
 // encapsulation: ViewEncapsulation.Emulated
})
export class MemberCardComponent {
  @Input() member: Member | undefined;
}
