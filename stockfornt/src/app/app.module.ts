import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockModule } from './stock/stock.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StockModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot(),
		environment.production ? [] : AkitaNgDevtools.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
