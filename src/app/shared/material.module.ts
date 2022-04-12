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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgChartsModule } from 'node_modules/ng2-charts';
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
        MatButtonToggleModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSlideToggleModule
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
        MatButtonToggleModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSlideToggleModule
    ],
  })
export class MaterialModule { }
