// Function to handle HTTP request errors

import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const ErrorResponseInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) =>  next(req).pipe(catchError( handleErrorResponse));

/**
 * Handles errors in HTTP requests, providing a detailed error message.
 *
 * @param error - HttpErrorResponse object containing the status and error message.
 * @returns Observable that emits the error message for subscriber handling.
 */
function handleErrorResponse(error: HttpErrorResponse): ReturnType<typeof throwError> {
  // Construct error message with status code and error message
  const errorResponse = `Error code: ${error.status}, message: ${error.message}`;

  // Emit the error message as an Observable for subscriber handling
  return throwError(() => errorResponse);
}
