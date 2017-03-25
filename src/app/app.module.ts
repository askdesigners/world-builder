import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MapcellComponent } from './mapcell/mapcell.component';

import { SetupService } from './service-setup/setup.service';
import { DatalayerService } from './datalayer/datalayer.service';
import { DescriptionsViewComponent } from './descriptions-view/descriptions-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MapcellComponent,
    DescriptionsViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: DescriptionsViewComponent
      },
      {
        path: 'map',
        component: DescriptionsViewComponent
      }
    ])
  ],
  providers: [
    SetupService,
    DatalayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
