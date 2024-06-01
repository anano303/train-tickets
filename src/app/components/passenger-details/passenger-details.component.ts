import {
  Component,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { SeatsService } from '../../services/seats.service';
import { ITrains } from '../../models/train.model';
import { ISeat } from '../../models/seats.model';
import { InvoiceComponent } from '../invoice/invoice.component';

@Component({
  selector: 'app-passenger-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    ReactiveFormsModule,
    InvoiceComponent,
  ],
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss'],
})
export class PassengerDetailsComponent {
  @Input() trains: ITrains[] = [];
  @ViewChild(InvoiceComponent) invoiceComponent!: InvoiceComponent;
  selectedTrain: ITrains | null = null;
  numberOfPassengers: number = 1;

  passengerForm: FormGroup;
  showModal: boolean = false;
  showSeats: boolean = false;
  selectedPassengerIndex: number | null = null;
  seats: ISeat[] = [];
  classType: string = '';

  constructor(
    private fb: FormBuilder,
    private seatsService: SeatsService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.passengerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9 ]{9}$')]],
      passengers: this.fb.array([]),
    });
    if (isPlatformBrowser(this.platformId)) {
      const navigation = this.router.getCurrentNavigation()?.extras.state;

      if (
        navigation &&
        'train' in navigation &&
        'numberOfPassengers' in navigation
      ) {
        this.selectedTrain = navigation['train'];
        this.numberOfPassengers = navigation['numberOfPassengers'];
        this.initPassengers();
      } else {
        console.error(
          'Train or number of passengers data is missing in navigation state.'
        );
      }
    }
  }

  get passengers(): FormArray {
    return this.passengerForm.get('passengers') as FormArray;
  }

  initPassengers(): void {
    for (let i = 0; i < this.numberOfPassengers; i++) {
      this.passengers.push(this.createPassengerGroup());
    }
  }

  createPassengerGroup(): FormGroup {
    return this.fb.group({
      seat: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      privateNumber: ['', [Validators.required, Validators.minLength(9)]],
    });
  }

  chooseSeat(index: number): void {
    this.selectedPassengerIndex = index;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.showSeats = false;
  }

  selectClass(classType: string): void {
    this.classType = classType;
    this.seatsService.getSeatsForClass(classType).subscribe(
      (seats) => {
        this.seats = seats;
        this.showSeats = true;
      },
      (error) => {
        console.error('Error fetching seats:', error);
      }
    );
  }

  selectSeat(seat: ISeat): void {
    if (!seat.isOccupied && this.selectedPassengerIndex !== null) {
      this.passengers
        .at(this.selectedPassengerIndex)
        .get('seat')
        ?.setValue(seat.number);
      this.showSeats = false;
    } else {
      alert('This seat is occupied. Please choose another seat.');
    }
  }

  submitForm(): void {
    if (this.passengerForm.valid) {
      const passengers = this.passengerForm.value.passengers;
      const email = this.passengerForm.value.email;
      const phone = this.passengerForm.value.phone;
      const totalPrice = this.invoiceComponent.totalPrice;

      console.log('Passenger details submitted:', passengers);
      console.log('Contact email:', email);
      console.log('Contact phone:', phone);
      console.log('Total price:', totalPrice);

      // Navigate to the payment page
      this.router.navigate(['/payment'], { state: { totalPrice } });
    } else {
      alert('Please fill out the form completely.');
    }
  }

  bookTrain(train: ITrains): void {
    this.selectedTrain = train;
  }
}
