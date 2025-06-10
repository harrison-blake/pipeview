class Admin::DashboardController < Admin::BaseController
  def index 
    @appointments = Appointment.order(preferred_time: :asc)
  end

  def show
    @appointment = Appointment.find(params[:id])
  end
end
