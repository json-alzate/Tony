import { Injectable } from '@angular/core';

import { Plant } from '@models/plant.model';


import { FirestoreService } from '@services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(
    private firestoreService: FirestoreService
  ) { }

  // Guarda una nueva planta en la base de datos
  savePlant(plant: Plant) {
    return this.firestoreService.addOnePlant(plant);
  }


}
