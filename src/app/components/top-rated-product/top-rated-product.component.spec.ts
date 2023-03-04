import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedProductComponent } from './top-rated-product.component';

describe('TopRatedProductComponent', () => {
  let component: TopRatedProductComponent;
  let fixture: ComponentFixture<TopRatedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRatedProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRatedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
