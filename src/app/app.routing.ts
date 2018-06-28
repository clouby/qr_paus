import { Routes, RouterModule } from "@angular/router";
import { QuestionListComponent } from "./components/question/question-list/question-list.component";
import { SignInComponent } from "./components/auth/signin/signin.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { QUESTION_ROUTES } from "./components/question/question.routing";
import { ZONES_ROUTES } from "./components/zones/zones.routing";

const routes: Routes = [
    { path: '', redirectTo: '/zones', pathMatch: 'full' },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'questions', children: QUESTION_ROUTES },
    { path: 'zones', children: ZONES_ROUTES }
];


export const Routing = RouterModule.forRoot(routes);
