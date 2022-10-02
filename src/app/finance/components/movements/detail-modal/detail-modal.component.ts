import { Component, Input, OnInit } from '@angular/core';
import { MovementEntity } from 'src/app/finance/models/movement';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  @Input() movement: MovementEntity = new MovementEntity();
  constructor() { }

  ngOnInit(): void {
  }

}
