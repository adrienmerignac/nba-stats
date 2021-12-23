import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({

    imports: [
        MatToolbarModule,
        MatCardModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule
    ],
  })
export class MaterialModule { }
