import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsDown, ChevronsLeft, ChevronsRight, Dot, LucideAngularModule, MessageCircle, Paperclip, Search, Smile } from 'lucide-angular';
import { Plus, Pencil, Trash, X, Send, Loader } from 'lucide-angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiErrorInterceptor } from './core/interceptors/api-error.interceptos';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([apiErrorInterceptor])
    ),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      closeButton: true,
      preventDuplicates: true,
    }),
    importProvidersFrom(
      LucideAngularModule.pick({
        Plus,
        Pencil,
        Trash,
        MessageCircle,
        Paperclip,
        Smile,
        X,
        Send,
        Loader,
        Search,
        ChevronRight,
        ChevronsRight,
        ChevronLeft,
        ChevronsLeft
      })
    ),
  ]
};
