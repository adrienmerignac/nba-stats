import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgChartsModule } from 'node_modules/ng2-charts';
import { OwlModule } from 'ngx-owl-carousel';

@NgModule({

    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatCarouselModule,
        MatDividerModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        NgChartsModule,
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        OwlModule
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatCarouselModule,
        MatDividerModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatIconModule,
        MatMenuModule,
        NgChartsModule,
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        OwlModule
    ],
  })
export class MaterialModule { }
