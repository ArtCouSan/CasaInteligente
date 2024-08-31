import { NgModule } from '@angular/core';
import { NbChatModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';


@NgModule({
    imports: [
        NbChatModule,
        NbThemeModule.forRoot({ name: 'default' }),
        NbLayoutModule
    ],
    exports: [
        NbChatModule,
        NbLayoutModule
    ]
})
export class NbModule { }