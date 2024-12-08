import { apiBaseServiceInstance } from '../../api'
import { APP_API_ENDPOINT } from '../../config/api'
import { METHOD_TYPE } from '../../config/method'

class TicketApiRequest {
  public GetTicket(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TICKET.GET_TICKET,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetTicketDetails({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TICKET.TICKET_DETAILS({ id }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetTicketNotPaid({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TICKET.TICKET_NOT_PAID({ id }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public DeleteTicket({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TICKET.DELETE_TICKET({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
  public UpdateStatusTicket({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TICKET.UPDATE_STATUS_TICKET({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
}

const ticketApiRequest = new TicketApiRequest()

export default ticketApiRequest
