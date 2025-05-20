import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate} from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { NbToastrService } from '@nebular/theme';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil, map } from 'rxjs/operators';
import { UserStore } from '../@core/stores/user.store';
import { InitUserService } from '../@theme/services/init-user.service';
import { ROLES } from './roles';

@Injectable()
export class AuthGuard implements CanActivate {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: NbAuthService,
    private router: Router,
    private userStore: UserStore,
    // private userInit: InitUserService,
    private roleProvider: NbRoleProvider,
    private toastrService: NbToastrService
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }


          this.roleProvider.getRole().pipe(map(role => {
            const roles = role instanceof Array ? role : [role];
            let isAuth =  roles.some(x => ROLES.ADMIN);
              // (x && x.toLowerCase() === ROLES.CHANGE_FORM_REQUEST_SUBMITTER ||
              // x && x.toLowerCase() ===  ROLES.ADMIN ||
              // x && x.toLowerCase() ===  ROLES.CHANGE_FORM_REQUEST_REVIEWER ||
              // x && x.toLowerCase() ===  ROLES.ATTENDANCE_SHEET_MANAGER));

              if (!isAuth) this.router.navigate(['auth/login']);
              return isAuth;
          }));

         this.userStore.onUserStateChange().pipe(
            takeUntil(this.destroy$),
          )
          .subscribe((user) => {
            if (user?.password_expired){
              this.router.navigate(['auth/change-password']);
              this.toastrService.show(
                ``,
                `Change password to proceed`,
                {
                  duration: 6000,
                  status: 'info',
                  icon: 'lock-outline',
                }
              )
            }
          })

      }),
    );
  }
}
