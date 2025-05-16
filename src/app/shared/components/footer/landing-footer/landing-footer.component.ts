import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from "../../../widgets/logo/logo.component";

@Component({
    selector: 'app-landing-footer',
    standalone: true,
    templateUrl: './landing-footer.component.html',
    styleUrl: './landing-footer.component.scss',
    imports: [RouterLink, LogoComponent]
})
export class LandingFooterComponent {

}
