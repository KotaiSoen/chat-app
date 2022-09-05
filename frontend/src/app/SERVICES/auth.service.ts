import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { User } from '../MODELS/user';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router, private chatService: ChatService) {
  }

  register(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then((result) => {
      window.alert('You have successfully registered');
      const imageUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAB5CAMAAADlJoj9AAAALVBMVEX39/fMzMzJycn6+vrPz8/z8/Pn5+fW1tbZ2dnk5OTT09Pd3d3w8PDs7Ozh4eH0NdSrAAAFQElEQVR4nO1b27LbIAw0COMb9v9/bo3tnJMECS3YTtuZ6KWdTgwLEquVoE3zta997X8yWu3575T78e1Ymjb4pe+cMTaascZ10+LntvkLwNYZg+9HF7GYV4v/MPZD2H70QUB+cgmWd2D98ClQ1PouD+cX1jiE21FRM/cOwnOgMt18716RH7ENekY13udAagZTimcHZZdbQK2ASjz2BsrcASqM1YA2UM5fi4na7hSgDdQ4XwlqOA1oAzVd5b0rtujANF5DUzTXnTMe1HAFpuk6QBFT154GhRy0jT5R5O4cJmodAMj0fg4hZr5UF3C/P3PyyOsz2G4+xNGa//ywTDqh2qUaE8366GN4+SKi04OvOsgBRMZz3/V3YdK9JlEfgqnGd0AcyVlr1D41phwTBQVRlolbHZItTsNBG7HLjgiEYTEXKHy0hlHWCEnUbQkgUhKt7dUh9BA3rgTRoiAagT3Xd8n2sOtUQoKWNwOYYHrSEhsWmIRIiKCPs42lhQG630DKdthQGkdaDBCUkEAW19wG8y4BJI64Tg8BnE40vjUq5ULD2AknXYQwLScmXkfptCHAQ7KbNlo0bYlatjWjsBRiW1wtsE0aOamblCbw2AAbV+uHVOgjrlOIVz+36TfLUQSsf/QpKP3U5Y+wGkkMTT5naOvejyNSUWS3ST+16fl4dU0yPKTmMpukKwptZ5NYo0nHlBMWKiKO2OLWuh/KTzyrnuEcsejHww7cZ4vxawgdu5GQBKmIjJE1qn46+OXsG+N4SIi+ZOJhN32LkwP1bDuk1LVIFT/zQ2ryNs4nA6JdRTJcTIBukiSY7jc55dKhtTmOQRic336dlORykB4fc0Mj1MR7Tve55PKHXLeOrYCBJhUveZDmghTdu+6Tqjukb8ayJcAfoureI1iKNECD86sFWFakD9quCoU9hKonLibI69+JKZuG1aTkSb0+Mq9QgLVk0mPmmllXPNE4ygM+zEAKXk6dCCKuyESKLpG8KTaYpdwJlE6GPzpAJpIm3VMRKxMa9HqBEShILSGK5M3pUpWIAGKlJVLAi+XNdqb4dhHSGeAHxwpTCdI2LZ9uIAqIlhAtBEncJRqcE25KkWyyWbLHiGrP9EypaYUbSdBvjPZDIBm9aZoaoCl3S0U74vKMqBQNvhaug/QP7pLaCvo4JLRJ+WJweFdBAtuvr4bIsGpIBc38JwNqAQmSTgKVV7IoVSbHGagrKyFBAs5w7A2UTFWQgLXulhYTwG13QXu5aGBpwcDJALrmjAFCbIPEZG2gcL8VEqPdga9qEKHExNSWQGlTdjHwGBcNb+ZbQLXXPGdDJRyjMoBqV7v25gxofshjA+VWyZX1YfCDLNYDwFLE/pJoA4iIjVOkdBeumTJG6HtMNkyRGqVC6lKY9LdfgspArj2zXWYRVDNpL+WkaxStUWHtVIMogmq1MOcH1iTTCqj+XR3N2Wf0UvrMUz9z/VcGKixipMulvew5213wlJUaL4ESv1kkQOaiR8hEPE/JB1nQETWJRATFXTxlKFhgy0vfabM958wEzJsjO55/5/uG6V2u5F8KJAFeKbiLMGX5N6lTTjynzU3Tl8zhPoDofZp8SnjdpmvesHP2NI267Odbz9v2qHkOWr3I+D10yGunWvv1BrDu31eeVUIEtscsiCp8dF/uC6TNDs9B2vmnA34noEedANLeEeEXJjZukr1Gs6AnWnhHT1iQ7zgY21xX1wAoMFuWraKAuPk/ScYryZIajFxdr7Rkit6WOSLY5SYoP7YURiv5mpuAIvM3pquvfe1r/7P9AeVCLmYPn2PgAAAAAElFTkSuQmCC';
      const uid = result.user!.uid!;
      const email = result.user!.email!;
      const name = email.match(/^[^@]*/)![0];
      const user = { imageUrl, uid, name };
      this.chatService.saveUser(user);
      this.router.navigate(['/login']);
    }).catch((error) => {
      window.alert(error);
    });
  }

  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/no-messages']);
    }).catch((error) => {
      window.alert(error);
    })
  }

  googleLogin() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
      console.log('you have successfully logged in');
      this.chatService.users.subscribe(users => {
        if (!users.some(user => user.uid === result.user!.uid!)) {
          const imageUrl = result.user!.photoURL!;
          const uid = result.user!.uid!;
          const name = result.user!.displayName!;
          const user = { imageUrl, uid, name };
          this.chatService.saveUser(user);
          this.router.navigate(['/no-messages']);
        } else {
          this.router.navigate(['/no-messages']);
        }
      })

    }).catch((error) => {
      window.alert(error);
    });
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
