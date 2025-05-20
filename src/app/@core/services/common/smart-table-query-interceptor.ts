import { DatePipe } from "@angular/common";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class SmartTableQueryInterceptor implements HttpInterceptor
{
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler)
  {
    let qryReqParams = req.params;

    const sortFieldName = req.params.get('sortFieldName');
    const sortDirection = req.params.get('sortDirection')

    if (sortFieldName?.length > 0 && sortDirection?.length > 0) {
      qryReqParams = qryReqParams.delete('sortFieldName');
      qryReqParams = qryReqParams.delete('sortDirection');
      qryReqParams = qryReqParams.append('sort', `${sortFieldName}:${sortDirection.toLowerCase()}`);
    }

    qryReqParams?.keys()?.filter(k => k.includes('filters')).forEach(key => {
      let val = qryReqParams.get(key);

      if (!isNaN(Date.parse(val))) {
        qryReqParams = qryReqParams.delete(key);
        qryReqParams = qryReqParams.append(key = key.replace('[$containsi]', '') , val);
      }

      if (key.includes('.')) {
        qryReqParams = qryReqParams.delete(key);
        qryReqParams = qryReqParams.append(key.replace('.', ']['), val);
      }
    });

    const qryReq = req.clone({
      params: qryReqParams,
    });

    return next.handle(qryReq);
  }
}
