import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'

class TicketApiRequest {
  public GetTicket(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TICKET.GET_TICKET,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  // public GetTotalTicket(): Promise<any> {
  //   return apiBaseServiceInstance.Http({
  //     path: APP_API_ENDPOINT.TICKET.GET_TOTAL_TICKET,
  //     config: { method: METHOD_TYPE.GET, cors: false }
  //   })
  // }

  public GetTotalTicket({
    startDate,
    endDate,
    vehicleId
  }: {
    startDate: string
    endDate: string
    vehicleId: number | string
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TICKET.GET_TOTAL_TICKET({ startDate, endDate, vehicleId }),
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
  public GetTravelCarByRequest({
    id,
    startDate,
    endDate
  }: {
    id: string | number | null
    startDate: string | number | null
    endDate: string | number | null
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TICKET.GET_TRAVEL_CAR_BY_REQUEST({ id, startDate, endDate }),
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
  public UpdateTicket({ id, body }: { id: string | number | null; body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TICKET.UPDATE_TICKET({ id }),
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
}

const ticketApiRequest = new TicketApiRequest()

export default ticketApiRequest
