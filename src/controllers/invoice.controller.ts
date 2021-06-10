import { inject, injectable } from "inversify";
import { controller, httpGet } from "inversify-express-utils";  // dependency injection container
import TYPES from "../../config/types";


@injectable()
export class InvoiceRepository{
    findAll(){
      return [1,289]
    }
}

@injectable()
export class InvoiceService {
    constructor(@inject(TYPES.InvoiceRepository) private invoiceRepo: InvoiceRepository) {}

    getInvoice() {
        return this.invoiceRepo.findAll()
    }
}


@controller('/api/invoice')
export class InvoiceControllre{
    constructor(@inject(TYPES.InvoiceService) private invoiceService: InvoiceService){}

    @httpGet('/')  
    getInvoice(){
      return this.invoiceService.getInvoice()
    }
}

/**
 * 
 * 
 * 1 loosely coupled
 * 2, scale
 * 
 * 3, unit testing
 */