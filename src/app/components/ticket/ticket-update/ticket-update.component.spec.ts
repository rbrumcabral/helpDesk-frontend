import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketUpdateComponent } from './ticket-update.component';

describe('TicketUpdateComponent', () => {
  let component: TicketUpdateComponent;
  let fixture: ComponentFixture<TicketUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
