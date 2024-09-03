import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketReadComponent } from './ticket-read.component';

describe('TicketReadComponent', () => {
  let component: TicketReadComponent;
  let fixture: ComponentFixture<TicketReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
